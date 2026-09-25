import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Poll, Channel } from '../types';
import { MOCK_USERS, MOCK_BADGES } from '../data';
import { Send, Users, Sparkles, AlertCircle, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

interface ChatProps {
  channel: Channel;
  chatHistory: ChatMessage[];
  onSendMessage: (msgText: string) => void;
}

export default function Chat({
  channel,
  chatHistory,
  onSendMessage
}: ChatProps) {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'users'>('chat');
  
  // Custom interactive poll
  const [poll, setPoll] = useState<Poll | null>(null);
  const [userVotedIdx, setUserVotedIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Create a new customized poll whenever channel changes to keep chat interactive
  useEffect(() => {
    setUserVotedIdx(null);
    const mockPolls: Record<string, Poll> = {
      'ch-gaming': {
        id: 'p1',
        question: 'Should we go for the Speedrun Glitch Route or Glitchless today?',
        options: [
          { text: 'Glitch Route (HYPE)', votes: 142 },
          { text: 'Glitchless (Standard Clean)', votes: 89 }
        ],
        active: true,
        totalVotes: 231
      },
      'ch-coding': {
        id: 'p2',
        question: 'Which backend framework should we build on the next stream?',
        options: [
          { text: 'Express + Bun (High Perf)', votes: 67 },
          { text: 'Fastify + Node CJS (Classic)', votes: 55 }
        ],
        active: true,
        totalVotes: 122
      },
      'ch-music': {
        id: 'p3',
        question: 'What ambient sound aesthetic should I load next?',
        options: [
          { text: 'Deep Synth Techno', votes: 188 },
          { text: 'Cozy Rain Lofi Lounge', votes: 195 }
        ],
        active: true,
        totalVotes: 383
      },
      'ch-creative': {
        id: 'p4',
        question: 'What color palette should we merge into the next Swirl Canvas?',
        options: [
          { text: 'Cyan & Violet Cyberpunk', votes: 41 },
          { text: 'Golden Amber Sandstorm', votes: 38 }
        ],
        active: true,
        totalVotes: 79
      },
      'ch-chatting': {
        id: 'p5',
        question: 'Are React 19 Server Actions more useful than traditional REST?',
        options: [
          { text: 'Yes, saves api boilerplate', votes: 110 },
          { text: 'No, REST offers generic routing', votes: 94 }
        ],
        active: true,
        totalVotes: 204
      }
    };

    const currentPoll = mockPolls[channel.id];
    if (currentPoll) {
      setPoll(currentPoll);
    } else {
      // Default poll for custom channels/user camera streams
      setPoll({
        id: 'p-custom',
        question: 'Are you enjoying this interactive stream platform?',
        options: [
          { text: 'YES! Outstanding features 🔥', votes: 12 },
          { text: 'It is amazing, love webcam!', votes: 8 }
        ],
        active: true,
        totalVotes: 20
      });
    }

    // Auto-simulate subsequent chat poll voting increments
    const voteTimer = setInterval(() => {
      setPoll(prev => {
        if (!prev) return null;
        const randomIdx = Math.floor(Math.random() * prev.options.length);
        const updatedOptions = [...prev.options];
        updatedOptions[randomIdx] = {
          ...updatedOptions[randomIdx],
          votes: updatedOptions[randomIdx].votes + 1
        };
        return {
          ...prev,
          options: updatedOptions,
          totalVotes: prev.totalVotes + 1
        };
      });
    }, 4500);

    return () => clearInterval(voteTimer);
  }, [channel.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleVote = (idx: number) => {
    if (userVotedIdx !== null || !poll) return;
    setUserVotedIdx(idx);
    setPoll(prev => {
      if (!prev) return null;
      const updatedOptions = [...prev.options];
      updatedOptions[idx] = {
        ...updatedOptions[idx],
        votes: updatedOptions[idx].votes + 1
      };
      return {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1
      };
    });
  };

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <div id="chat-sidebar-root" className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col h-full flex-shrink-0">
      
      {/* 1. Chat Header Tabs */}
      <div id="chat-tabs-header" className="flex border-b border-neutral-800 bg-neutral-950/20">
        <button
          id="btn-tab-chat"
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${activeTab === 'chat' ? 'text-purple-400 border-b-2 border-purple-500 bg-neutral-900/50' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Sparkles className="h-3.5 w-3.5" /> LIVE CHAT
        </button>
        <button
          id="btn-tab-users"
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${activeTab === 'users' ? 'text-purple-400 border-b-2 border-purple-500 bg-neutral-900/50' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Users className="h-3.5 w-3.5" /> VIEWERS ({channel.viewers.toLocaleString()})
        </button>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Active Poll Card */}
          {poll?.active && (
            <div id="chat-poll-card" className="m-3 p-3 bg-neutral-950/80 border border-purple-900/60 rounded-lg shadow-md shrink-0">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                <BarChart2 className="h-3.5 w-3.5" /> Channel Poll
              </div>
              <h4 className="text-xs font-medium text-neutral-200 mb-2">{poll.question}</h4>
              <div className="space-y-1.5">
                {poll.options.map((opt, idx) => {
                  const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                  const chosen = userVotedIdx === idx;
                  
                  return (
                    <button
                      id={`poll-opt-${idx}`}
                      key={opt.text}
                      disabled={userVotedIdx !== null}
                      onClick={() => handleVote(idx)}
                      className={`w-full text-left relative overflow-hidden p-2 rounded text-xs transition-all border ${userVotedIdx !== null ? 'cursor-default border-neutral-800' : 'border-neutral-800 hover:border-purple-800 bg-neutral-900 cursor-pointer'}`}
                    >
                      {/* background fill progress bar */}
                      <div 
                        className={`absolute left-0 top-0 bottom-0 transition-all duration-500 ${chosen ? 'bg-purple-600/30' : 'bg-neutral-800/50'}`}
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative flex justify-between items-center z-10">
                        <span className={`truncate font-medium ${chosen ? 'text-purple-400 font-semibold' : 'text-neutral-300'}`}>
                          {opt.text}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                          {percentage}% ({opt.votes})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-neutral-500 mt-2 text-right">Total Votes: {poll.totalVotes}</p>
            </div>
          )}

          {/* Chat scrolling feed */}
          <div 
            id="chat-messages-container" 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent bg-neutral-950/10"
          >
            {chatHistory.length === 0 ? (
              <p className="text-center text-xs text-neutral-500 py-4 italic">Welcome to the stream chat! Be respectful.</p>
            ) : (
              chatHistory.map((msg, index) => (
                <div id={`chat-msg-${msg.id || index}`} key={msg.id || index} className="text-xs leading-relaxed break-words hover:bg-neutral-850/40 p-1 rounded transition-colors">
                  <div className="flex items-start gap-1.5">
                    {/* User badging */}
                    <div className="flex items-center gap-0.5 mt-0.5 shrink-0 select-none">
                      {msg.isMod && (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 text-[9px] px-1 rounded font-bold" title="Channel Moderator">
                          ⚔️
                        </span>
                      )}
                      {msg.isSubscriber && (
                        <span className="bg-purple-500/20 text-purple-400 border border-purple-500/35 text-[9px] px-1 rounded font-bold" title="Stream Subscriber">
                          ⭐
                        </span>
                      )}
                      {msg.isVIP && (
                        <span className="bg-pink-500/20 text-pink-400 border border-pink-500/35 text-[9px] px-1 rounded font-bold" title="VIP Status">
                          💎
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Name & Text */}
                      <span 
                        className="font-bold hover:underline cursor-pointer mr-2.5" 
                        style={{ color: msg.userColor }}
                      >
                        {msg.user}
                      </span>
                      <span className="text-neutral-300 font-medium selection:bg-purple-500 selection:text-white">
                        {msg.message}
                      </span>
                    </div>

                    <span className="text-[9px] text-neutral-600 font-mono self-center shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Emote inserts panel */}
          <div id="chat-emoji-inserters" className="px-3 py-1.5 border-t border-neutral-800 bg-neutral-950/20 flex gap-1.5 justify-around select-none">
            {['👋', 'Pog', 'Kappa', 'LUL', 'EZ', 'Hype'].map(em => (
              <button
                id={`insert-em-${em}`}
                key={em}
                onClick={() => insertEmoji(em === 'Pog' || em === 'Kappa' || em === 'LUL' || em === 'EZ' ? ` ${em} ` : em)}
                className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {em}
              </button>
            ))}
          </div>

          {/* Form submit input */}
          <form id="chat-submit-form" onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 bg-neutral-900 shrink-0">
            <div className="flex gap-2">
              <input
                id="chat-text-input"
                type="text"
                maxLength={150}
                placeholder={channel.hostCam ? "Moderate live chat..." : "Send a message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-neutral-950 text-neutral-100 text-xs px-3 py-2.5 rounded-lg border border-neutral-850 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-neutral-500"
              />
              <button
                id="btn-send-message"
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer"
                title="Send Chat Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Disclaimer of platform rules */}
            <div className="flex items-center gap-1 text-[9px] text-neutral-500 mt-2 justify-center">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              <span>Automated streamer moderations active</span>
            </div>
          </form>
        </>
      ) : (
        /* Viewers list view tab */
        <div id="chat-userlist-container" className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Stream Creator (1)</p>
            <div className="flex items-center gap-2 p-1">
              <img src={channel.avatar} alt={channel.name} referrerPolicy="no-referrer" className="w-5 h-5 rounded-full object-cover" />
              <span className="text-xs font-bold text-neutral-100">{channel.name}</span>
              <span className="bg-red-500/20 text-red-400 text-[8px] font-mono font-bold px-1 rounded uppercase">Host</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Moderators ({MOCK_USERS.filter(u => u.isMod).length})</p>
            {MOCK_USERS.filter(u => u.isMod).map((usr, i) => (
              <div key={i} className="flex items-center gap-2 p-1">
                <span className="text-xs">⚔️</span>
                <span className="text-xs font-medium" style={{ color: usr.color }}>{usr.name}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">VIPs & Subscribers</p>
            {MOCK_USERS.filter(u => !u.isMod).map((usr, i) => (
              <div key={i} className="flex items-center gap-2 p-0.5">
                <span className="text-xs">{usr.isVIP ? '💎' : '⭐'}</span>
                <span className="text-xs font-medium" style={{ color: usr.color }}>{usr.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
