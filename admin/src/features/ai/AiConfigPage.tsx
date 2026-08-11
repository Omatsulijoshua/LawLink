import React, { useState } from 'react';
import { Bot, Sliders, Save, CheckCircle2, RefreshCw, Scale } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

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

  const { showToast } = useToast();

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
          {isMatchingOnly ? 'Lawyer Matching Engine Weights' : 'AI Legal Intake & Statutory Prompt Configuration'}
        </h2>
        <p className="text-xs text-gray-400">
          {isMatchingOnly ? 'Adjust weighted scoring factors for recommending verified lawyers to intake clients.' : 'Monitor LawLink AI model confidence, legal citation rules, and classification prompts.'}
        </p>
      </div>

      {isMatchingOnly ? (
        <form onSubmit={handleSaveWeights} className="bg-[#111827] border border-gray-800 p-6 rounded-xl space-y-6 max-w-2xl">
          <h3 className="font-serif font-semibold text-white text-base">Weighted Matching Scoring Factors (Total: 100%)</h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Practice Specialization Alignment</span>
                <span className="text-amber-400">{weights.practiceArea}%</span>
              </div>
              <input type="range" min="0" max="50" value={weights.practiceArea} onChange={(e) => setWeights({ ...weights, practiceArea: Number(e.target.value) })} className="w-fullaccent-amber-500" />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Geographic Location & State Proximity</span>
                <span className="text-amber-400">{weights.location}%</span>
              </div>
              <input type="range" min="0" max="40" value={weights.location} onChange={(e) => setWeights({ ...weights, location: Number(e.target.value) })} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Emergency On-Call Availability</span>
                <span className="text-amber-400">{weights.availability}%</span>
              </div>
              <input type="range" min="0" max="30" value={weights.availability} onChange={(e) => setWeights({ ...weights, availability: Number(e.target.value) })} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 font-semibold mb-1">
                <span>Years of Experience & Bar Seniority</span>
                <span className="text-amber-400">{weights.experience}%</span>
              </div>
              <input type="range" min="0" max="30" value={weights.experience} onChange={(e) => setWeights({ ...weights, experience: Number(e.target.value) })} className="w-full" />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-900/30">
            <Save size={16} />
            <span>Update Production Matching Weights</span>
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Classification Model</span>
            <h4 className="text-lg font-bold text-white mt-1">Gemini 2.5 Flash</h4>
            <span className="text-[11px] text-emerald-400 font-medium block mt-2">✓ 99.4% Intake Success</span>
          </div>

          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Average Latency</span>
            <h4 className="text-lg font-bold text-amber-400 mt-1">1.25s / Request</h4>
            <span className="text-[11px] text-gray-400 font-medium block mt-2">Streaming Response Active</span>
          </div>

          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Grounding Corpus</span>
            <h4 className="text-lg font-bold text-white mt-1">1999 Const + CAMA 2020</h4>
            <span className="text-[11px] text-blue-400 font-medium block mt-2">Statutory Citation Enforced</span>
          </div>
        </div>
      )}
    </div>
  );
};
