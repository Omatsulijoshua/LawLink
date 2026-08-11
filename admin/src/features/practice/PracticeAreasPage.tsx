import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2, CheckCircle2, ChevronRight, Scale } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

interface PracticeArea {
  id: string;
  name: string;
  subcategories: string[];
  lawyerCount: number;
  status: 'ACTIVE' | 'DISABLED';
}

const INITIAL_PRACTICE_AREAS: PracticeArea[] = [
  { id: 'pa-1', name: 'Property & Land Law', subcategories: ['Land Disputes', 'Tenancy', 'Eviction', 'Property Purchase', 'Title Documentation'], lawyerCount: 420, status: 'ACTIVE' },
  { id: 'pa-2', name: 'Corporate & Commercial Law', subcategories: ['CAC Compliance', 'Contracts', 'Mergers', 'Tax Advisory'], lawyerCount: 315, status: 'ACTIVE' },
  { id: 'pa-3', name: 'Criminal Defense Law', subcategories: ['Police Bail', 'High Court Trial', 'EFCC Defense', 'Fundamental Rights'], lawyerCount: 280, status: 'ACTIVE' },
  { id: 'pa-4', name: 'Family & Matrimonial Law', subcategories: ['Divorce Proceedings', 'Child Custody', 'Inheritance', 'Wills'], lawyerCount: 190, status: 'ACTIVE' },
  { id: 'pa-5', name: 'Employment & Labour Law', subcategories: ['Wrongful Termination', 'Salary Dispute', 'Trade Union'], lawyerCount: 140, status: 'ACTIVE' }
];

export const PracticeAreasPage: React.FC = () => {
  const [areas, setAreas] = useState<PracticeArea[]>(INITIAL_PRACTICE_AREAS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSubcats, setNewSubcats] = useState('');
  const { showToast } = useToast();

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newArea: PracticeArea = {
      id: 'pa-' + Date.now(),
      name: newName,
      subcategories: newSubcats.split(',').map(s => s.trim()).filter(Boolean),
      lawyerCount: 0,
      status: 'ACTIVE'
    };

    setAreas([...areas, newArea]);
    showToast(`Added new legal practice area: ${newName}`, 'success');
    setIsAddModalOpen(false);
    setNewName('');
    setNewSubcats('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Layers className="text-amber-500" size={24} />
            Legal Practice Areas & Subcategories
          </h2>
          <p className="text-xs text-gray-400">Configure lawyer specialization taxonomies and AI intake classification branches.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-900/30"
        >
          <Plus size={16} />
          <span>Add Practice Area</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {areas.map((area) => (
          <div key={area.id} className="bg-[#111827] border border-gray-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-base">{area.name}</h3>
              <span className="text-[11px] bg-blue-950 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded font-mono">
                {area.lawyerCount} Lawyers
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {area.subcategories.map((sub, idx) => (
                <span key={idx} className="bg-[#0b0f19] border border-gray-700/80 text-gray-300 text-xs px-2.5 py-1 rounded-lg">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Legal Practice Taxonomy">
          <form onSubmit={handleAddArea} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Practice Area Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Intellectual Property & Tech Law"
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Subcategories (comma separated)</label>
              <textarea
                rows={3}
                value={newSubcats}
                onChange={(e) => setNewSubcats(e.target.value)}
                placeholder="e.g. Trademark Registration, Copyright Infringement, Patent Filing"
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">Create Category</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
