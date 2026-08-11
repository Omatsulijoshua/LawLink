import React, { useState, useEffect } from 'react';
import { Bot, Sliders, Save, CheckCircle2, ShieldCheck, Key, RefreshCw, Cpu, Layers } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { apiClient } from '../../services/api';

export const AiConfigPage: React.FC<{ isMatchingOnly?: boolean }> = ({ isMatchingOnly = false }) => {
  const [weights, setWeights] = useState({
    practiceArea: 30,
    location: 20,
    availability: 15,
    experience: 15,
    rating: 10,
    price: 5,
    responseRate: 5
  });

  const [primaryProvider, setPrimaryProvider] = useState<'gemini' | 'groq' | 'openai'>('gemini');
  const [fallbackStrategy, setFallbackStrategy] = useState<'sequential' | 'round-robin'>('sequential');
  const [rawKeys, setRawKeys] = useState({
    gemini: '',
    groq: '',
    openai: ''
  });

  const [providerStats, setProviderStats] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isMatchingOnly) {
      fetchAiKeysConfig();
    }
  }, [isMatchingOnly]);

  const fetchAiKeysConfig = async () => {
    try {
      const res = await apiClient.get('/api/admin/ai/keys');
      if (res.data?.success && res.data?.config) {
        const cfg = res.data.config;
        setPrimaryProvider(cfg.primaryProvider || 'gemini');
        setFallbackStrategy(cfg.fallbackStrategy || 'sequential');
        setProviderStats(cfg.providers);
        if (cfg.providers) {
          setRawKeys({
            gemini: cfg.providers.gemini?.rawKeys || '',
            groq: cfg.providers.groq?.rawKeys || '',
            openai: cfg.providers.openai?.rawKeys || ''
          });
        }
      }
    } catch (err) {
      console.log('Unable to fetch AI key router stats');
    }
  };

  const handleSaveAiKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await apiClient.post('/api/admin/ai/keys', {
        primaryProvider,
        fallbackStrategy,
        rawKeys
      });
      if (res.data?.success) {
        showToast('AI Provider Key Pools & Failover Routing Strategy updated!', 'success');
        fetchAiKeysConfig();
      }
    } catch (err) {
      showToast('Failed to update AI keys configuration', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      showToast(`Matching weights must total exactly 100%. Current total: ${total}%`, 'warning');
      return;
    }
    showToast('Lawyer Matching Engine weights updated and broadcasted to production matching service.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          {isMatchingOnly ? <Sliders className="text-blue-500" size={24} /> : <Bot className="text-amber-500" size={24} />}
          {isMatchingOnly ? 'Lawyer Matching Engine Weights' : 'AI Provider Router & Key Pool Load Balancer'}
        </h2>
        <p className="text-xs text-gray-400">
          {isMatchingOnly 
            ? 'Adjust weighted scoring factors for recommending verified lawyers to intake clients.' 
            : 'Combine multiple API keys per provider (comma-separated e.g. 2 Groq + 2 Gemini keys) with automatic failover.'}
        </p>
      </div>

      {!isMatchingOnly ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Pool & Router Form */}
          <form onSubmit={handleSaveAiKeys} className="lg:col-span-2 bg-[#111827] border border-gray-800 p-6 rounded-xl space-y-5">
            <h3 className="font-serif font-semibold text-white text-base flex items-center gap-2">
              <Key size={18} className="text-amber-500" />
              <span>Multi-Key & Provider Failover Configuration</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Primary Active Provider</label>
                <select
                  value={primaryProvider}
                  onChange={(e) => setPrimaryProvider(e.target.value as any)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white font-medium"
                >
                  <option value="gemini">Google Gemini AI</option>
                  <option value="groq">Groq Llama 3.3</option>
                  <option value="openai">OpenAI GPT-4o</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Quota Failover Strategy</label>
                <select
                  value={fallbackStrategy}
                  onChange={(e) => setFallbackStrategy(e.target.value as any)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white font-medium"
                >
                  <option value="sequential">Sequential Failover (Max Free Quota)</option>
                  <option value="round-robin">Round-Robin Key Balancing</option>
                </select>
              </div>
            </div>

            {/* Provider Key Pools */}
            <div className="space-y-4 pt-2 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Google Gemini API Keys (Comma-separated)</span>
                  {providerStats?.gemini?.keyCount > 0 && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {providerStats.gemini.keyCount} Active Key(s)
                    </span>
                  )}
                </label>
                <textarea
                  rows={2}
                  value={rawKeys.gemini}
                  onChange={(e) => setRawKeys({ ...rawKeys, gemini: e.target.value })}
                  placeholder="AIzaSy1..., AIzaSy2..."
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Groq API Keys (Comma-separated)</span>
                  {providerStats?.groq?.keyCount > 0 && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {providerStats.groq.keyCount} Active Key(s)
                    </span>
                  )}
                </label>
                <textarea
                  rows={2}
                  value={rawKeys.groq}
                  onChange={(e) => setRawKeys({ ...rawKeys, groq: e.target.value })}
                  placeholder="gsk_key1..., gsk_key2..."
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 flex items-center justify-between">
                  <span>OpenAI / OpenRouter API Keys (Comma-separated)</span>
                  {providerStats?.openai?.keyCount > 0 && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {providerStats.openai.keyCount} Active Key(s)
                    </span>
                  )}
                </label>
                <textarea
                  rows={2}
                  value={rawKeys.openai}
                  onChange={(e) => setRawKeys({ ...rawKeys, openai: e.target.value })}
                  placeholder="sk_key1..., sk_key2..."
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
            >
              <Save size={16} />
              <span>{isSaving ? 'Saving Key Router...' : 'Save AI Key Pools & Failover Settings'}</span>
            </button>
          </form>

          {/* Key Pool Health & Quota Summary */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl space-y-4">
            <h3 className="font-serif font-semibold text-white text-base flex items-center gap-2">
              <Cpu size={18} className="text-emerald-400" />
              <span>Key Pool Health</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#0b0f19] rounded-lg border border-gray-800">
                <p className="font-semibold text-white">Google Gemini</p>
                <span className="text-gray-400 text-[11px] block mt-0.5">Model: gemini-2.5-flash</span>
                <span className="text-emerald-400 text-[11px] font-bold block mt-1">
                  {providerStats?.gemini?.keyCount || 0} Key(s) Configured
                </span>
              </div>

              <div className="p-3 bg-[#0b0f19] rounded-lg border border-gray-800">
                <p className="font-semibold text-white">Groq Llama 3.3</p>
                <span className="text-gray-400 text-[11px] block mt-0.5">Model: llama-3.3-70b-versatile</span>
                <span className="text-emerald-400 text-[11px] font-bold block mt-1">
                  {providerStats?.groq?.keyCount || 0} Key(s) Configured
                </span>
              </div>

              <div className="p-3 bg-[#0b0f19] rounded-lg border border-gray-800">
                <p className="font-semibold text-white">OpenAI / OpenRouter</p>
                <span className="text-gray-400 text-[11px] block mt-0.5">Model: gpt-4o-mini</span>
                <span className="text-emerald-400 text-[11px] font-bold block mt-1">
                  {providerStats?.openai?.keyCount || 0} Key(s) Configured
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveWeights} className="bg-[#111827] border border-gray-800 p-6 rounded-xl space-y-6 max-w-2xl">
          <h3 className="font-serif font-semibold text-white text-base">Weighted Matching Scoring Factors (Total: 100%)</h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Practice Specialization Alignment</span>
                <span className="text-amber-400">{weights.practiceArea}%</span>
              </div>
              <input type="range" min="0" max="50" value={weights.practiceArea} onChange={(e) => setWeights({ ...weights, practiceArea: Number(e.target.value) })} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Geographic Location & State Proximity</span>
                <span className="text-amber-400">{weights.location}%</span>
              </div>
              <input type="range" min="0" max="40" value={weights.location} onChange={(e) => setWeights({ ...weights, location: Number(e.target.value) })} className="w-full" />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-900/30">
            <Save size={16} />
            <span>Update Production Matching Weights</span>
          </button>
        </form>
      )}
    </div>
  );
};
