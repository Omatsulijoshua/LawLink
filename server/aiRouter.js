// AI Provider Routing & Multi-Key Failover Load Balancer
// Maximizes free-tier AI API quotas across multiple comma-separated keys and multiple providers (Gemini, Groq, OpenAI).

let aiConfig = {
  primaryProvider: 'gemini',
  fallbackStrategy: 'sequential', // 'sequential' or 'round-robin'
  providers: {
    gemini: {
      keys: (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean),
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      currentIndex: 0,
      cooldowns: {}
    },
    groq: {
      keys: (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean),
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      currentIndex: 0,
      cooldowns: {}
    },
    openai: {
      keys: (process.env.OPENAI_API_KEYS || process.env.OPENAI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      currentIndex: 0,
      cooldowns: {}
    }
  }
};

export function getAiConfig() {
  return {
    primaryProvider: aiConfig.primaryProvider,
    fallbackStrategy: aiConfig.fallbackStrategy,
    providers: Object.keys(aiConfig.providers).reduce((acc, name) => {
      const p = aiConfig.providers[name];
      acc[name] = {
        keyCount: p.keys.length,
        maskedKeys: p.keys.map(k => k.length > 8 ? `${k.slice(0, 4)}...${k.slice(-4)}` : '***'),
        model: p.model,
        rawKeys: p.keys.join(', ')
      };
      return acc;
    }, {})
  };
}

export function updateAiKeys(payload) {
  if (payload.primaryProvider && aiConfig.providers[payload.primaryProvider]) {
    aiConfig.primaryProvider = payload.primaryProvider;
  }
  if (payload.fallbackStrategy) {
    aiConfig.fallbackStrategy = payload.fallbackStrategy;
  }

  ['gemini', 'groq', 'openai'].forEach(pName => {
    if (payload.rawKeys && typeof payload.rawKeys[pName] === 'string') {
      const parsedKeys = payload.rawKeys[pName]
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);
      aiConfig.providers[pName].keys = parsedKeys;
      aiConfig.providers[pName].currentIndex = 0;
    }
  });

  return getAiConfig();
}

export function getNextActiveKey(providerName) {
  const provider = aiConfig.providers[providerName];
  if (!provider || provider.keys.length === 0) return null;

  const now = Date.now();
  // Filter out keys in 60s cooldown
  const availableIndices = provider.keys.map((_, i) => i).filter(i => {
    const cool = provider.cooldowns[i];
    return !cool || now > cool;
  });

  if (availableIndices.length === 0) {
    // Reset cooldowns if all are cooling down to avoid total lock
    provider.cooldowns = {};
    return { key: provider.keys[0], index: 0 };
  }

  let chosenIndex = availableIndices[0];
  if (aiConfig.fallbackStrategy === 'round-robin') {
    chosenIndex = availableIndices[provider.currentIndex % availableIndices.length];
    provider.currentIndex = (provider.currentIndex + 1) % provider.keys.length;
  }

  return { key: provider.keys[chosenIndex], index: chosenIndex };
}

export function markKeyCooldown(providerName, keyIndex, cooldownMs = 60000) {
  const provider = aiConfig.providers[providerName];
  if (provider) {
    provider.cooldowns[keyIndex] = Date.now() + cooldownMs;
  }
}
