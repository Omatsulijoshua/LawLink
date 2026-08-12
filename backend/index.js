/* global process */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchLegalDatabase } from '../src/utils/legalSearch.js';
import { getAiConfig, updateAiKeys, getNextActiveKey, markKeyCooldown } from './aiRouter.js';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve paths for local file persistence
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');

// Middleware
app.use(cors()); // Allow all origins for Render/Vercel deployment
app.use(express.json());

// In-memory analytics database state
let analyticsData = {
  visits: [],
  registrations: [],
  questions: [],
  articles: []
};

function createAnalyticsId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function cleanString(value, maxLength = 240) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeEmail(value) {
  return cleanString(value, 180).toLowerCase();
}

function normalizeUserPayload(user = {}) {
  const safeUser = user && typeof user === 'object' ? user : {};
  return {
    id: cleanString(safeUser.id || safeUser.userId, 120),
    email: normalizeEmail(safeUser.email),
    name: cleanString(safeUser.name || safeUser.displayName, 120)
  };
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '';
}

function normalizeAnalyticsCategory(category) {
  const value = cleanString(category, 120).toLowerCase();

  if (!value) return '';
  if (/succession|inheritance|estate|probate|intestate|customary/.test(value)) return 'Succession & Inheritance';
  if (/family|matrimonial|marriage|divorce|custody|maintenance/.test(value)) return 'Family Law';
  if (/land|property|occupancy|lease|tenan|rent|house/.test(value)) return 'Land & Property';
  if (/criminal|penal|crime|offence|offense/.test(value)) return 'Criminal Law';
  if (/right|constitution|liberty|detention|police|bail|fair hearing/.test(value)) return 'Fundamental Rights';
  if (/traffic|road|vehicle|tow|towing|accident|collision/.test(value)) return 'Road Traffic';
  if (/animal|cruelty|dog|pet|livestock/.test(value)) return 'Animal Cruelty';
  if (/election|electoral|bvas|inec/.test(value)) return 'Elections';

  return category || 'General Nigerian Law';
}

function categorizeQuestion(text, localMatch = {}) {
  const sourceCategory = (localMatch.sources || [])
    .map(source => normalizeAnalyticsCategory(source.category || source.act || source.title))
    .find(Boolean);

  if (sourceCategory) return sourceCategory;

  const value = cleanString(text, 1200).toLowerCase();

  if (/succession|inherit|estate|probate|intestate|will|first son|eldest|family property|share property|father died|dad died/.test(value)) {
    return 'Succession & Inheritance';
  }
  if (/marry|marriage|divorce|custody|maintenance|wife|husband|spouse|child support|forced marriage|remarry/.test(value)) {
    return 'Family Law';
  }
  if (/land|property|house|tenant|landlord|rent|lease|certificate of occupancy|c of o|governor revoke|adverse possession|squat|living there/.test(value)) {
    return 'Land & Property';
  }
  if (/car|vehicle|road|traffic|tow|towed|towing|accident|collision|jammed|hit from|lastma|vio|parking/.test(value)) {
    return 'Road Traffic';
  }
  if (/dog|animal|pet|chicken|livestock|cruelty|poison/.test(value)) {
    return 'Animal Cruelty';
  }
  if (/election|electoral|bvas|inec|vote|polling|candidate/.test(value)) {
    return 'Elections';
  }
  if (/arrest|police|bail|detention|liberty|fundamental right|human right|torture|fair hearing/.test(value)) {
    return 'Fundamental Rights';
  }
  if (/steal|theft|murder|kill|assault|fraud|criminal|crime|offence|offense|punishment/.test(value)) {
    return 'Criminal Law';
  }

  return 'General Nigerian Law';
}

function ensureAnalyticsShape() {
  analyticsData.visits = Array.isArray(analyticsData.visits) ? analyticsData.visits : [];
  analyticsData.registrations = Array.isArray(analyticsData.registrations) ? analyticsData.registrations : [];
  analyticsData.questions = Array.isArray(analyticsData.questions) ? analyticsData.questions : [];
  analyticsData.articles = Array.isArray(analyticsData.articles) ? analyticsData.articles : [];

  analyticsData.registrations = analyticsData.registrations.map(reg => {
    const timestamp = Number(reg.timestamp || reg.firstSeen || reg.lastSeen || Date.now());
    return {
      ...reg,
      email: normalizeEmail(reg.email),
      userId: cleanString(reg.userId || reg.id, 120),
      name: cleanString(reg.name, 120),
      timestamp,
      firstSeen: Number(reg.firstSeen || timestamp),
      lastSeen: Number(reg.lastSeen || timestamp),
      visitCount: Number(reg.visitCount || 0),
      questionCount: Number(reg.questionCount || 0),
      categoryCounts: reg.categoryCounts && typeof reg.categoryCounts === 'object' ? reg.categoryCounts : {},
      searchHistory: Array.isArray(reg.searchHistory) ? reg.searchHistory.slice(0, 25) : []
    };
  }).filter(reg => reg.email);

  analyticsData.questions = analyticsData.questions.map(question => ({
    ...question,
    id: question.id || createAnalyticsId('q'),
    text: cleanString(question.text, 1200),
    timestamp: Number(question.timestamp || Date.now()),
    category: question.category || categorizeQuestion(question.text),
    email: normalizeEmail(question.email),
    userId: cleanString(question.userId, 120),
    userName: cleanString(question.userName, 120),
    chatId: cleanString(question.chatId, 120),
    sessionId: cleanString(question.sessionId, 120),
    sourceCategories: Array.isArray(question.sourceCategories) ? question.sourceCategories : []
  })).filter(question => question.text);

  rebuildRegistrationSearchStats();
}

function upsertRegistration(user, updates = {}) {
  const normalized = normalizeUserPayload(user);
  if (!normalized.email) return null;

  let existing = analyticsData.registrations.find(reg => reg.email === normalized.email);
  const now = Date.now();

  if (!existing) {
    existing = {
      email: normalized.email,
      userId: normalized.id,
      name: normalized.name,
      timestamp: now,
      firstSeen: now,
      lastSeen: now,
      subscribed: true,
      visitCount: 0,
      questionCount: 0,
      categoryCounts: {},
      searchHistory: []
    };
    analyticsData.registrations.push(existing);
  }

  existing.userId = normalized.id || existing.userId || '';
  existing.name = normalized.name || existing.name || '';
  existing.timestamp = now;
  existing.lastSeen = now;
  existing.firstSeen = existing.firstSeen || now;
  existing.visitCount = Number(existing.visitCount || 0);
  existing.questionCount = Number(existing.questionCount || 0);
  existing.categoryCounts = existing.categoryCounts && typeof existing.categoryCounts === 'object'
    ? existing.categoryCounts
    : {};
  existing.searchHistory = Array.isArray(existing.searchHistory) ? existing.searchHistory : [];

  if (typeof updates.subscribed === 'boolean') {
    existing.subscribed = updates.subscribed;
  }
  if (updates.incrementVisit) {
    existing.visitCount += 1;
  }

  return existing;
}

function updateRegisteredSearchStats(questionRecord) {
  if (!questionRecord.email) return;

  const reg = upsertRegistration({
    email: questionRecord.email,
    id: questionRecord.userId,
    name: questionRecord.userName
  });

  if (!reg) return;

  reg.questionCount = Number(reg.questionCount || 0) + 1;
  reg.lastQuestion = questionRecord.text;
  reg.lastQuestionAt = questionRecord.timestamp;
  reg.categoryCounts[questionRecord.category] = Number(reg.categoryCounts[questionRecord.category] || 0) + 1;
  reg.searchHistory = [
    {
      text: questionRecord.text,
      category: questionRecord.category,
      timestamp: questionRecord.timestamp,
      chatId: questionRecord.chatId,
      sessionId: questionRecord.sessionId
    },
    ...reg.searchHistory
  ].slice(0, 25);
}

function rebuildRegistrationSearchStats() {
  const byEmail = new Map();

  for (const reg of analyticsData.registrations) {
    reg.questionCount = 0;
    reg.categoryCounts = {};
    reg.searchHistory = [];
    delete reg.lastQuestion;
    delete reg.lastQuestionAt;
    byEmail.set(reg.email, reg);
  }

  const questions = [...analyticsData.questions]
    .filter(question => question.email)
    .sort((a, b) => b.timestamp - a.timestamp);

  for (const question of questions) {
    const email = normalizeEmail(question.email);
    if (!email) continue;

    let reg = byEmail.get(email);
    if (!reg) {
      reg = {
        email,
        userId: cleanString(question.userId, 120),
        name: cleanString(question.userName, 120),
        timestamp: question.timestamp,
        firstSeen: question.timestamp,
        lastSeen: question.timestamp,
        subscribed: true,
        visitCount: 0,
        questionCount: 0,
        categoryCounts: {},
        searchHistory: []
      };
      analyticsData.registrations.push(reg);
      byEmail.set(email, reg);
    }

    reg.userId = cleanString(question.userId, 120) || reg.userId || '';
    reg.name = cleanString(question.userName, 120) || reg.name || '';
    reg.questionCount += 1;
    reg.categoryCounts[question.category] = Number(reg.categoryCounts[question.category] || 0) + 1;
    reg.lastSeen = Math.max(Number(reg.lastSeen || 0), Number(question.timestamp || 0));
    reg.timestamp = Math.max(Number(reg.timestamp || 0), Number(question.timestamp || 0));

    if (!reg.lastQuestionAt || question.timestamp > reg.lastQuestionAt) {
      reg.lastQuestion = question.text;
      reg.lastQuestionAt = question.timestamp;
    }

    if (reg.searchHistory.length < 25) {
      reg.searchHistory.push({
        text: question.text,
        category: question.category,
        timestamp: question.timestamp,
        chatId: question.chatId,
        sessionId: question.sessionId
      });
    }
  }
}

function buildSearchGroups(questions) {
  const groups = new Map();

  for (const question of questions) {
    const category = question.category || categorizeQuestion(question.text);
    if (!groups.has(category)) {
      groups.set(category, {
        category,
        count: 0,
        latestAt: 0,
        latestQuestions: []
      });
    }

    const group = groups.get(category);
    group.count += 1;
    group.latestAt = Math.max(group.latestAt, Number(question.timestamp || 0));

    if (group.latestQuestions.length < 5) {
      group.latestQuestions.push({
        text: question.text,
        timestamp: question.timestamp,
        email: question.email || ''
      });
    }
  }

  return [...groups.values()].sort((a, b) => b.count - a.count || b.latestAt - a.latestAt);
}

function seedAnalytics() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  analyticsData.articles.push({
    id: 'art_seed_1',
    title: 'Governor’s Power to Revoke Certificate of Occupancy',
    subtitle: 'An analysis of Section 28 Land Use Act revocation criteria and compensation rights.',
    thumbnail: 'property', 
    content: `Under Section 28 of the Land Use Act of 1978, the Governor of a State in Nigeria holds the power to revoke a Right of Occupancy (C of O) for 'overriding public interest'.`,
    audience: 'all',
    timestamp: now - 5 * oneDay
  });
}

function loadAnalytics() {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8');
      analyticsData = JSON.parse(raw);
      ensureAnalyticsShape();
    } else {
      seedAnalytics();
      ensureAnalyticsShape();
      saveAnalytics();
    }
  } catch (err) {
    console.error('❌ Failed to load/seed analytics:', err.message);
  }
}

function saveAnalytics() {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analyticsData, null, 2), 'utf8');
  } catch (err) {
    console.error('❌ Failed to save analytics database:', err.message);
  }
}

loadAnalytics();

app.get('/', (req, res) => {
  res.send('LawLink AI Backend API is running successfully.');
});

// AI Key Management endpoints for Admin Dashboard
app.get('/api/admin/ai/keys', (req, res) => {
  return res.json({ success: true, config: getAiConfig() });
});

app.post('/api/admin/ai/keys', (req, res) => {
  const updated = updateAiKeys(req.body);
  return res.json({ success: true, config: updated });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password, role = 'CLIENT', barNumber, practiceArea, cacNumber, firmAddress, associateCount } = req.body || {};
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const userRole = (role || 'CLIENT').toUpperCase();
  const isBusiness = userRole === 'LAW_FIRM_ADMIN' || userRole === 'LAWYER';

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim(),
    email: cleanEmail,
    phone: (phone || '').trim(),
    role: userRole,
    barNumber,
    practiceArea,
    cacNumber,
    firmAddress,
    associateCount,
    verificationStatus: isBusiness ? 'PENDING' : 'VERIFIED',
    createdAt: Date.now()
  };

  analyticsData.users = analyticsData.users || [];
  analyticsData.users.push(newUser);
  saveAnalytics();
  return res.json({ success: true, token: `jwt_mock_${Date.now()}`, user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (email === 'lawlinkllp01@gmail.com' && password === 'Admin@123') {
    return res.json({
      success: true,
      token: `jwt_admin_${Date.now()}`,
      user: { id: 'admin_1', name: 'LawLink Super Admin', email, role: 'SUPER_ADMIN' }
    });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.listen(PORT, () => {
  console.log(`🚀 LawLink AI Backend Server running at http://localhost:${PORT}`);
});
