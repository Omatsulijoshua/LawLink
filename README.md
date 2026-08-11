# LawLink AI — Legal Services Marketplace Monorepo

![LawLink Logo](frontend/public/lawlink_logo.png)

> **"The right lawyer. Right when you need one."**

**LawLink AI** is a production-ready, full-stack legal services marketplace and legal intelligence platform designed for the Nigerian legal ecosystem (and architected for global expansion). LawLink connects verified legal practitioners, Senior Advocates of Nigeria (SAN), and law firms with individual clients and corporate enterprises.

---

## 📂 Repository Directory Layout

The LawLink codebase is organized into four distinct dedicated sub-applications:

```
LawLink/
├── frontend/    # React 19 + Vite Web Client Marketplace App
├── backend/     # Express API Server & Multi-Key AI Failover Router
├── admin/       # Next.js / Vite Enterprise Super Admin Control Console
└── mobile/      # Flutter Cross-Platform Mobile Application (iOS/Android)
```

---

## 🏛️ Platform Architecture & Key Features

### 1. 🤖 AI Legal Intake & Deterministic Matching Engine
- **4-Step Guided Legal Intake:** Interactive wizard capturing legal category, jurisdiction state, urgency level, and factual summaries.
- **6-Factor Weighted Matching:** Calculates match percentage scores (e.g. `96% Match`) based on Practice Area (30%), Location Proximity (20%), Availability (15%), Seniority/Experience (15%), Verified Ratings (10%), and Pricing (10%).

### 2. 🔑 Multi-Key AI Provider Router & Failover Load Balancer (`backend/aiRouter.js`)
- **Multi-Key Support per Provider:** Combine multiple API keys per provider separated by commas (e.g. `GEMINI_API_KEYS=key1,key2` or `GROQ_API_KEYS=gsk_key1,gsk_key2`).
- **Multi-Provider Failover:** Automatically routes requests across Google Gemini, Groq Llama 3.3, and OpenAI when free-tier quotas or rate-limits (429) are reached.
- **Failover Strategies:** Choose between **Sequential Quota Maxing** or **Round-Robin Key Balancing**.
- **Admin Management Console:** Live controls in `/admin` under **AI Provider Router & Key Pool Load Balancer**.

### 3. 🚨 Emergency Legal Help Network
- **Immediate Response Portal:** Instant on-call assistance for police station arrests, illegal detainment, unlawful eviction, asset seizure, and urgent court representation.

### 4. 💬 Confidential Real-Time Workspace
- **Multi-Channel Attorney-Client Privileged Environment:**
  - 💬 **Encrypted Live Chat** with real-time file sharing.
  - 🎥 **Interactive WebRTC Video Calling** with camera toggle, mic mute, and session timer controls.
  - 📞 **Encrypted Audio Session Calls**.

### 5. 💳 Paystack & Flutterwave Escrow Gateway
- **NGN Payment Methods:** Debit/Credit Cards, Direct Bank Transfer, and USSD.
- **LawLink Escrow Protection System:** Holds consultation funds safely in escrow until session completion and client authorization.
- **Automated Tax Receipts:** Printable tax invoices itemizing counsel fees, 7.5% VAT, and platform technology charges.

### 6. 📂 Case Management & Encrypted Document Vault
- **Centralized Case Desk:** Tracks active legal matters through milestone progress timelines (`INTAKE_SUBMITTED`, `LAWYER_MATCHED`, `IN_PROGRESS`, `RESOLVED`).
- **Encrypted Vault:** AES-256 TLS 1.3 encrypted document repository for tenancy agreements, C of O land title deeds, court affidavits, and NDAs.

### 7. 📜 AI Legal Document Generator
- **Nigerian Instrument Drafting Engine:**
  - 🏡 **Residential Tenancy Agreement** (Lagos State Tenancy Law compliant)
  - 💼 **Mutual Non-Disclosure Agreement (NDA)**
  - 📜 **General Power of Attorney**
  - 📝 **Statutory Affidavit of Loss / Declaration of Age**
  - ⚖️ **Pre-Action Notice & Demand Letter**

### 8. 🏢 Law Firm Portals & Corporate Retainer Plans
- **Law Firm Admin Desk:** Firm partners manage associate lawyer rosters, pooled consultation calendars, and firm escrow revenues.
- **Corporate Legal Retainers:**
  - 🚀 **Startup Growth Retainer:** ₦150,000 / month
  - 💼 **Corporate Business Retainer:** ₦350,000 / month
  - 🏛️ **Enterprise SAN Retainer:** ₦850,000 / month (Dedicated Senior Advocate of Nigeria lead counsel & 24/7 hotline).

### 9. 🛡️ Standalone Super Admin Console (`/admin`)
- **Separate Enterprise Web Application:** Dedicated control platform built with React, TypeScript, Tailwind CSS, and TanStack Query.
- **RBAC Roles:** `SUPER_ADMIN`, `VERIFICATION_ADMIN`, `FINANCE_ADMIN`, `SUPPORT_ADMIN`, `MODERATOR`, `ANALYST`.
- **Supreme Court Verification Desk:** Inspects Call to Bar SCN credentials, NBA practicing licenses, and NIN/passport IDs.
- **Financial Analytics & Audit Trail:** GMV metrics (₦85.4M GMV), lawyer bank payout disbursements, review moderation, and immutable audit logs.

---

## 🚀 Running the Platform Applications

### 1. Launch Web Client Marketplace App (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```
> Running on `http://localhost:5173`

### 2. Launch Backend API & AI Router (`backend/`)
```bash
cd backend
npm install
npm run dev
```
> Running on `http://localhost:5000`

### 3. Launch Super Admin Console (`admin/`)
```bash
cd admin
npm install
npm run dev
```
> Running on `http://localhost:5174`

### 4. Launch Flutter Mobile App (`mobile/` / `app/`)
```bash
cd mobile
flutter pub get
flutter run
```

---

## 🔑 Default Admin Credentials

To access the Super Admin Console (`http://localhost:5174`):
- **Email:** `lawlinkllp01@gmail.com`
- **Password:** `Admin@123`

---

## 📜 License

Copyright © 2026 LawLink AI Legal Technologies LLP. All Rights Reserved.
