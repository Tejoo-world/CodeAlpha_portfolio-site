import React from 'react';
import { X, MessageSquare, Trash2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactMessage } from '../types';

interface MessagesDrawerProps {
  messages: ContactMessage[];
  onClose: () => void;
  onClearMessage: (id: string) => void;
}

export default function MessagesDrawer({ messages, onClose, onClearMessage }: MessagesDrawerProps) {
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
          className="w-screen max-w-md bg-[#050C1E] text-slate-200 flex flex-col shadow-2xl h-full border-l border-[#1e293b]"
        >
          {/* Header Panel */}
          <div className="px-5 py-5 border-b border-[#1e293b] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-mono uppercase text-purple-400 flex items-center gap-1.5">
                Contact Messages Ledger
              </h2>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.1em] mt-0.5">
                Review connection requests log recorded locally.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-none transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages lists scroll frame */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12 p-3">
                <div className="w-12 h-12 rounded-none border border-[#1e293b] flex items-center justify-center text-purple-400 mb-4 bg-[#091124] shadow-[0_0_8px_rgba(168,85,247,0.2)]">
                  <MessageSquare size={16} />
                </div>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">No archived records found</h3>
                <p className="text-[10px] text-slate-400 max-w-xs mt-2 leading-relaxed font-sans">
                  Try submitting the contact connection form on your portfolio to see it log here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 bg-[#091124] border border-[#1e293b]/60 rounded-none relative space-y-2.5 hover:border-purple-500/40 transition-colors group">
                    {/* Delete Trigger */}
                    <button
                      onClick={() => onClearMessage(msg.id)}
                      className="absolute top-3.5 right-3.5 text-slate-400 hover:text-purple-400 p-1 rounded-none transition-colors cursor-pointer"
                      title="Delete message log"
                    >
                      <Trash2 size={13} />
                    </button>

                    {/* Metadata */}
                    <div className="space-y-1 pr-6 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold uppercase tracking-wide">
                        <span>{msg.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-light-purple font-medium">
                        <a href={`mailto:${msg.email}`} className="text-purple-300 hover:underline">{msg.email}</a>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-[#030712] border border-[#1e293b] p-3 rounded-none whitespace-pre-wrap leading-relaxed select-text font-sans">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-1 text-[9px] text-slate-450 font-bold font-mono justify-end uppercase">
                      <Calendar size={10} />
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Panel with close toggle */}
          <div className="px-5 py-4 border-t border-[#1e293b] bg-[#030712] text-center">
            <button
              onClick={onClose}
              className="w-full bg-purple-500 hover:bg-purple-400 border border-purple-400 text-black text-[10px] font-bold uppercase tracking-wider py-3 rounded-none cursor-pointer hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all"
            >
              Close Ledger
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
