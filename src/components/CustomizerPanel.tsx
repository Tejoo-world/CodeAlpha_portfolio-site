import React from 'react';
import { X, Save, RotateCcw, Plus, Trash2, ArrowLeftRight, HelpCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData, Skill, Qualification, WorkItem } from '../types';

interface CustomizerPanelProps {
  portfolioData: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function CustomizerPanel({ portfolioData, onSave, onClose, onReset }: CustomizerPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'general' | 'skills' | 'education' | 'experience'>('general');
  const [localData, setLocalData] = React.useState<PortfolioData>(() => JSON.parse(JSON.stringify(portfolioData)));

  // Sync state if portfolioData changes externally (e.g., on reset)
  React.useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(portfolioData)));
  }, [portfolioData]);

  const handleGeneralChange = (key: keyof PortfolioData, value: any) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePersonalDetailChange = (index: number, value: string) => {
    setLocalData((prev) => {
      const copy = [...prev.personalDetails];
      copy[index] = { ...copy[index], value };
      return { ...prev, personalDetails: copy };
    });
  };

  // Skill management
  const handleUpdateSkill = (index: number, key: keyof Skill, value: any) => {
    setLocalData((prev) => {
      const copy = [...prev.skills];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, skills: copy };
    });
  };

  const handleAddSkill = () => {
    setLocalData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: 'New Skill', level: 80, category: 'frontend' }],
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setLocalData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index),
    }));
  };

  // Qualification management
  const handleUpdateQualification = (index: number, key: keyof Qualification, value: any) => {
    setLocalData((prev) => {
      const copy = [...prev.qualifications];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, qualifications: copy };
    });
  };

  const handleAddQualification = () => {
    setLocalData((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        {
          id: Math.random().toString(36).substring(7),
          year: '2024 - Present',
          degree: 'Advanced Certificate',
          institution: 'Tech Academy',
          description: 'Descriptive elements about the studies completed.',
        },
      ],
    }));
  };

  const handleRemoveQualification = (index: number) => {
    setLocalData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, idx) => idx !== index),
    }));
  };

  // Work item management
  const handleUpdateWork = (index: number, key: keyof WorkItem, value: any) => {
    setLocalData((prev) => {
      const copy = [...prev.work];
      if (key === 'tags') {
        const tagArray = value.split(',').map((t: string) => t.trim());
        copy[index] = { ...copy[index], [key]: tagArray };
      } else {
        copy[index] = { ...copy[index], [key]: value };
      }
      return { ...prev, work: copy };
    });
  };

  const handleAddWork = () => {
    setLocalData((prev) => ({
      ...prev,
      work: [
        ...prev.work,
        {
          id: Math.random().toString(36).substring(7),
          title: 'Software Developer',
          company: 'Tech Corp',
          period: '2024 - Present',
          description: 'Short task and responsibility summary.',
          tags: ['React', 'TypeScript', 'Node.js'],
          type: 'experience',
        },
      ],
    }));
  };

  const handleRemoveWork = (index: number) => {
    setLocalData((prev) => ({
      ...prev,
      work: prev.work.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-screen max-w-lg bg-[#1A1A1A] text-[#F5F2EF] flex flex-col shadow-2xl h-full border-l border-[#1A1A1A]"
        >
          {/* Header Panel */}
          <div className="px-5 py-5 border-b border-[#333] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-serif italic text-white flex items-center gap-1.5">
                Customize Portfolio
              </h2>
              <p className="text-[10px] text-[#999] font-mono uppercase tracking-[0.1em] mt-0.5">
                Update credentials to dynamically rebuild your display.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#999] hover:text-white hover:bg-[#333] p-1.5 rounded-none transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sub Navigation tabs */}
          <div className="px-4 py-2 bg-[#1A1A1A] border-b border-[#333] flex items-center justify-between gap-1">
            <div className="flex gap-1 overflow-x-auto">
              {(['general', 'skills', 'education', 'experience'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-[10px] uppercase font-mono tracking-[0.1em] font-bold rounded-none whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-[#1A1A1A]'
                      : 'text-[#999] hover:text-white hover:bg-[#333]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onReset}
              className="text-[#999] hover:text-white text-[9px] uppercase tracking-wider font-mono flex items-center gap-1 hover:underline font-bold cursor-pointer"
              title="Reset configuration template data"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            <form id="portfolio-customizer-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* TAB 1: General Info */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Full Name</label>
                      <input
                        type="text"
                        value={localData.name}
                        onChange={(e) => handleGeneralChange('name', e.target.value)}
                        className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Contact Email</label>
                      <input
                        type="email"
                        value={localData.email}
                        onChange={(e) => handleGeneralChange('email', e.target.value)}
                        className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Professional Role</label>
                    <input
                      type="text"
                      value={localData.role}
                      onChange={(e) => handleGeneralChange('role', e.target.value)}
                      className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Landing Tagline</label>
                    <input
                      type="text"
                      value={localData.tagline}
                      onChange={(e) => handleGeneralChange('tagline', e.target.value)}
                      className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Biography / Introduction Text</label>
                    <textarea
                      rows={5}
                      value={localData.bio}
                      onChange={(e) => handleGeneralChange('bio', e.target.value)}
                      className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-1 font-mono">Avatar Graphic URL</label>
                    <input
                      type="text"
                      value={localData.avatarUrl}
                      onChange={(e) => handleGeneralChange('avatarUrl', e.target.value)}
                      className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none font-mono"
                    />
                  </div>

                  {/* Personal Grid Details */}
                  <div className="pt-4 border-t border-[#333]">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-3 font-mono">Core Coordinates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {localData.personalDetails.map((detail, idx) => (
                        <div key={detail.label}>
                          <label className="block text-[9px] font-bold uppercase text-[#999] mb-1 font-mono">
                            {detail.label}
                          </label>
                          <input
                            type="text"
                            value={detail.value}
                            onChange={(e) => handlePersonalDetailChange(idx, e.target.value)}
                            className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Skills */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white font-mono">Configure Skill Matrix</h3>
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="inline-flex items-center gap-1 bg-white hover:bg-[#F5F2EF] text-[#1A1A1A] rounded-none px-2.5 py-1 text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer"
                    >
                      <Plus size={11} /> Add Skill
                    </button>
                  </div>

                  <div className="space-y-3">
                    {localData.skills.map((skill, index) => (
                      <div key={index} className="bg-[#151515] p-3 rounded-none border border-[#333] flex flex-col md:flex-row gap-3 items-stretch justify-between relative group">
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="absolute top-2.5 right-2.5 text-zinc-500 hover:text-white p-0.5 rounded-none cursor-pointer"
                          title="Remove skill"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 pr-6">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Skill Name</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Skill Category</label>
                            <select
                              value={skill.category}
                              onChange={(e) => handleUpdateSkill(index, 'category', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                            >
                              <option value="frontend">Frontend & Design</option>
                              <option value="backend">Backend & Architecture</option>
                              <option value="design">UI/UX Mechanics</option>
                              <option value="personal">Personal Soft competency</option>
                            </select>
                          </div>
                        </div>

                        {skill.category !== 'personal' && (
                          <div className="flex flex-col justify-end w-full md:w-32">
                            <div className="flex justify-between text-[9px] font-bold font-mono text-zinc-400 mb-0.5">
                              <span>Fluency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="5"
                              value={skill.level}
                              onChange={(e) => handleUpdateSkill(index, 'level', parseInt(e.target.value))}
                              className="w-full accent-white bg-[#262626] h-1.5 rounded-none appearance-none cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Academic timeline */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white font-mono">Academic Qualifications</h3>
                    <button
                      type="button"
                      onClick={handleAddQualification}
                      className="inline-flex items-center gap-1 bg-white hover:bg-[#F5F2EF] text-[#1A1A1A] rounded-none px-2.5 py-1 text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer"
                    >
                      <Plus size={11} /> Add Record
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localData.qualifications.map((item, index) => (
                      <div key={item.id} className="bg-[#151515] p-4 border border-[#333] rounded-none relative space-y-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveQualification(index)}
                          className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-white cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="grid grid-cols-2 gap-3 pr-6">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Time Period</label>
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) => handleUpdateQualification(index, 'year', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Institution</label>
                            <input
                              type="text"
                              value={item.institution}
                              onChange={(e) => handleUpdateQualification(index, 'institution', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Degree Conferred</label>
                          <input
                            type="text"
                            value={item.degree}
                            onChange={(e) => handleUpdateQualification(index, 'degree', e.target.value)}
                            className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Studies Summary / Capstone</label>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => handleUpdateQualification(index, 'description', e.target.value)}
                            className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Work and Projects */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white font-mono">Register Showcases</h3>
                    <button
                      type="button"
                      onClick={handleAddWork}
                      className="inline-flex items-center gap-1 bg-white hover:bg-[#F5F2EF] text-[#1A1A1A] rounded-none px-2.5 py-1 text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer"
                    >
                      <Plus size={11} /> Add Record
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localData.work.map((item, index) => (
                      <div key={item.id} className="bg-[#151515] p-4 border border-[#333] rounded-none relative space-y-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveWork(index)}
                          className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-white cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="grid grid-cols-2 gap-3 pr-6">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Classification Type</label>
                            <select
                              value={item.type}
                              onChange={(e) => handleUpdateWork(index, 'type', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                            >
                              <option value="experience">Industry Experience</option>
                              <option value="project">Creative Showcase Project</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Active Period</label>
                            <input
                              type="text"
                              value={item.period}
                              onChange={(e) => handleUpdateWork(index, 'period', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Role / Position</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateWork(index, 'title', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Company / Lab</label>
                            <input
                              type="text"
                              value={item.company}
                              onChange={(e) => handleUpdateWork(index, 'company', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Summary Description</label>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => handleUpdateWork(index, 'description', e.target.value)}
                            className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2.5 py-1.5 focus:border-white outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Tags (comma-separated)</label>
                            <input
                              type="text"
                              value={item.tags.join(', ')}
                              onChange={(e) => handleUpdateWork(index, 'tags', e.target.value)}
                              className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                              placeholder="React, AWS, TypeScript"
                            />
                          </div>
                          {item.type === 'project' && (
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5 font-mono">Live Build Link URL</label>
                              <input
                                type="text"
                                value={item.link || ''}
                                onChange={(e) => handleUpdateWork(index, 'link', e.target.value)}
                                className="w-full bg-[#262626] border border-[#444] text-xs text-white rounded-none px-2 py-1 focus:border-white outline-none font-mono"
                                placeholder="https://projects.example.com"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer Save Changes Panel */}
          <div className="px-5 py-4 border-t border-[#333] bg-[#111] flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#444] text-[#CCC] hover:text-white hover:bg-[#222] text-[10px] font-bold uppercase tracking-wider rounded-none py-3 cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="portfolio-customizer-form"
              className="flex-1 bg-white hover:bg-[#F5F2EF] text-[#1A1A1A] font-bold rounded-none py-3 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all border border-white"
            >
              <Save size={13} />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
