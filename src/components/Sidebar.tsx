import React, { useState } from 'react';
import { Channel } from '../types';
import { Search, Heart, Tv, UserCheck, Flame, Radio, Zap } from 'lucide-react';

interface SidebarProps {
  channels: Channel[];
  activeChannel: Channel;
  onSelectChannel: (channel: Channel) => void;
  followedChIds: string[];
}

export default function Sidebar({
  channels,
  activeChannel,
  onSelectChannel,
  followedChIds
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const followedChannels = channels.filter(ch => followedChIds.includes(ch.id));
  const recommendedChannels = channels.filter(ch => !followedChIds.includes(ch.id));

  const filterStreamers = (list: Channel[]) => {
    return list.filter(ch => 
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <aside id="sidebar-container" className="w-64 max-lg:w-20 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full flex-shrink-0 transition-all duration-300">
      {/* Search Input for Channel List */}
      <div id="sidebar-search-wrapper" className="p-4 border-b border-neutral-800 max-lg:hidden">
        <div id="sidebar-search-box" className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
          <input
            id="sidebar-search-input"
            type="text"
            placeholder="Search streamers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-800 text-sm text-neutral-200 pl-9 pr-4 py-2 rounded-lg border border-neutral-700 focus:outline-none focus:border-purple-500 transition-colors placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Navigation Guide Info / Top Categories shortcut */}
      <div id="sidebar-navigation-intro" className="px-4 pt-3 pb-1 max-lg:hidden">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
          <Zap className="h-3 w-3 text-purple-400" /> Guide
        </span>
      </div>

      {/* Scrollable Channels sections */}
      <div id="sidebar-scrollable-area" className="flex-1 overflow-y-auto space-y-4 py-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        
        {/* Followed Channels Section */}
        <div id="followed-channels-sec" className="space-y-1">
          <div id="followed-section-header" className="px-4 py-1 flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-wider max-lg:justify-center">
            <span className="flex items-center gap-1.5 max-lg:hidden">
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> Followed Channels
            </span>
            <Heart className="h-4.5 w-4.5 text-red-500 lg:hidden" />
            <span id="followed-count" className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded-full text-[10px] max-lg:hidden font-mono">
              {followedChannels.length}
            </span>
          </div>

          {followedChannels.length === 0 ? (
            <p id="no-follows-text" className="text-xs text-neutral-500 px-4 py-2 italic max-lg:hidden">
              No followed streamers yet. Help them rise!
            </p>
          ) : (
            filterStreamers(followedChannels).map(ch => {
              const isActive = ch.id === activeChannel.id;
              return (
                <button
                  id={`btn-follow-${ch.id}`}
                  key={ch.id}
                  onClick={() => onSelectChannel(ch)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left transition-all hover:bg-neutral-800/60 ${isActive ? 'bg-neutral-800 border-l-2 border-purple-500' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        id={`avatar-follow-${ch.id}`}
                        src={ch.avatar}
                        alt={ch.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-600/50"
                      />
                      {ch.isLive && (
                        <span id={`dot-follow-live-${ch.id}`} className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-neutral-900 animate-pulse"></span>
                      )}
                    </div>
                    <div className="max-lg:hidden overflow-hidden">
                      <h4 className="text-sm font-medium text-neutral-200 truncate">{ch.name}</h4>
                      <p className="text-xs text-neutral-400 truncate">{ch.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono font-medium max-lg:hidden">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {formatViewers(ch.viewers)}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Recommended Channels Section */}
        <div id="recommended-channels-sec" className="space-y-1">
          <div id="recommended-section-header" className="px-4 py-1 flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-wider max-lg:justify-center">
            <span className="flex items-center gap-1.5 max-lg:hidden">
              <Flame className="h-3.5 w-3.5 text-orange-400" /> Recommended Channels
            </span>
            <Radio className="h-4.5 w-4.5 text-neutral-400 lg:hidden" />
          </div>

          {filterStreamers(recommendedChannels).map(ch => {
            const isActive = ch.id === activeChannel.id;
            return (
              <button
                id={`btn-recommend-${ch.id}`}
                key={ch.id}
                onClick={() => onSelectChannel(ch)}
                className={`w-full flex items-center justify-between px-4 py-2 text-left transition-all hover:bg-neutral-800/60 ${isActive ? 'bg-neutral-800 border-l-2 border-purple-500' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      id={`avatar-recommend-${ch.id}`}
                      src={ch.avatar}
                      alt={ch.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                    />
                    {ch.isLive && (
                      <span id={`dot-rec-live-${ch.id}`} className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-neutral-900 animate-pulse"></span>
                    )}
                  </div>
                  <div className="max-lg:hidden overflow-hidden">
                    <h4 className="text-sm font-medium text-neutral-200 truncate">{ch.name}</h4>
                    <p className="text-xs text-neutral-400 truncate">{ch.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono font-medium max-lg:hidden">
                  <span className="w-1.5 h-1.5 bg-red-500/80 rounded-full"></span>
                  {formatViewers(ch.viewers)}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Sidebar Footer badge */}
      <div id="sidebar-footer" className="p-4 border-t border-neutral-800 text-center max-lg:hidden bg-neutral-950/40">
        <p className="text-[10px] text-neutral-500 tracking-wider">
          PLATFORM PORT: <span className="font-mono text-purple-400 font-bold">3000</span>
        </p>
      </div>
    </aside>
  );
}
