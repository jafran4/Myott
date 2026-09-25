import React, { useState } from 'react';
import { 
  Tv, Film, RefreshCw, Maximize2, 
  ArrowLeft, Clapperboard, Sparkles, ChevronUp, ChevronDown
} from 'lucide-react';

type StreamMode = 'livetv' | 'movies';

interface StreamOption {
  id: StreamMode;
  name: string;
  tagline: string;
  url: string;
  domain: string;
  badge: string;
  badgeColor: string;
  bgGradient: string;
  image: string;
  description: string;
}

const STREAM_OPTIONS: Record<StreamMode, StreamOption> = {
  livetv: {
    id: 'livetv',
    name: 'Live TV',
    tagline: 'Broadcasts & Live Sports Channels',
    url: 'https://famelack.com/tv/bd/J7BmdiABqVkDMa',
    domain: 'famelack.com/tv',
    badge: 'LIVE 24/7',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    bgGradient: 'from-red-950/40 via-neutral-900/60 to-neutral-950',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    description: 'High-definition live television, regional Bangladesh feeds, national sports arena broadcasts, and real-time continuous programming.'
  },
  movies: {
    id: 'movies',
    name: 'Movies & Series',
    tagline: 'Blockbuster Cinema & TV Shows',
    url: 'https://msitmovie.blogspot.com/',
    domain: 'msitmovie.blogspot.com',
    badge: 'HD CINEMA',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    bgGradient: 'from-purple-950/40 via-neutral-900/60 to-neutral-950',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    description: 'Unlimited movies, high-definition theater releases, popular binge-worthy series, and cinema entertainment on MSIT Movie.'
  }
};

export default function App() {
  const [viewMode, setViewMode] = useState<'selection' | 'stream'>('selection');
  const [selectedStream, setSelectedStream] = useState<StreamMode>('movies');
  const [iframeKey, setIframeKey] = useState(0);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const activeConfig = STREAM_OPTIONS[selectedStream];

  const handleSelectOption = (mode: StreamMode) => {
    setSelectedStream(mode);
    setViewMode('stream');
    setIframeKey(k => k + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div id="app-viewport-wrapper" className="w-full h-[100dvh] bg-neutral-950 text-neutral-100 overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* 1. SELECTION PORTAL: Shown when user enters the website */}
      {viewMode === 'selection' && (
        <div 
          id="entry-selection-portal"
          className="absolute inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-12 overflow-y-auto scrollbar-thin pt-[max(3.5rem,env(safe-area-inset-top,3.5rem))] pb-[max(2rem,env(safe-area-inset-bottom,2rem))]"
        >
          {/* Ambient background light gradients */}
          <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-6 sm:space-y-10 my-auto py-2 sm:py-6">
            
            {/* Header intro - safely positioned down below mobile notch */}
            <div className="space-y-2 sm:space-y-3 px-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] sm:text-xs font-medium text-neutral-400 shadow-md">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
                <span>StreamPulse Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                Select What to Watch
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed">
                Choose between our 24/7 Live Television stream or explore our Movies & Series cinema entertainment.
              </p>
            </div>

            {/* The TWO Primary Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md sm:max-w-4xl px-1">
              
              {/* Option 1: Live TV */}
              <button
                id="btn-select-live-tv"
                onClick={() => handleSelectOption('livetv')}
                className="group relative flex flex-col text-left rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-red-500/60 p-5 sm:p-7 md:p-8 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer overflow-hidden touch-manipulation min-h-[190px] sm:min-h-[220px]"
              >
                {/* Background image overlay with gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${STREAM_OPTIONS.livetv.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent" />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-4 sm:space-y-6">
                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg shrink-0">
                      <Tv className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping" />
                      LIVE TV
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      Live TV
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {STREAM_OPTIONS.livetv.description}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-neutral-300 border-t border-neutral-800/80">
                    <span className="font-mono text-[11px] text-neutral-500">{STREAM_OPTIONS.livetv.domain}</span>
                    <span className="inline-flex items-center gap-1 text-red-400 font-bold group-hover:translate-x-1 transition-transform">
                      Watch Live TV →
                    </span>
                  </div>
                </div>
              </button>

              {/* Option 2: Movies & Series */}
              <button
                id="btn-select-movies-series"
                onClick={() => handleSelectOption('movies')}
                className="group relative flex flex-col text-left rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-purple-500/60 p-5 sm:p-7 md:p-8 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden touch-manipulation min-h-[190px] sm:min-h-[220px]"
              >
                {/* Background image overlay with gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${STREAM_OPTIONS.movies.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent" />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-4 sm:space-y-6">
                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg shrink-0">
                      <Film className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      <Clapperboard className="h-3 w-3" />
                      CINEMA HD
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      Movies & Series
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {STREAM_OPTIONS.movies.description}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-neutral-300 border-t border-neutral-800/80">
                    <span className="font-mono text-[11px] text-neutral-500">{STREAM_OPTIONS.movies.domain}</span>
                    <span className="inline-flex items-center gap-1 text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                      Watch Movies & Series →
                    </span>
                  </div>
                </div>
              </button>

            </div>

            <p className="text-[11px] sm:text-xs text-neutral-500 font-mono px-4">
              Tap anytime to switch between Live TV and Movies & Series.
            </p>
          </div>
        </div>
      )}

      {/* 2. BODY LAYOUT (Stream Stage and Down/Bottom Responsive Toolbar) */}
      <div id="body-layout-container" className="w-full h-full flex-1 flex flex-col relative overflow-hidden">
        
        {/* Main Stage hosting the stream player (takes 100% full viewport) */}
        <main id="main-stream-stage" className="w-full h-full flex-1 flex flex-col relative overflow-hidden">
          <div className="w-full h-full flex-1 relative">
            <div id="video-player-root" className="w-full h-full relative bg-black">
              <div className="w-full h-full relative">
                <iframe
                  key={`${activeConfig.url}-${iframeKey}`}
                  id="website-stream-player"
                  src={activeConfig.url}
                  title={`${activeConfig.name} Stream`}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0 block bg-black"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Down Header / Bottom Navigation Bar for Mobile (and top bar for desktop) */}
        {viewMode === 'stream' && (
          <>
            <header 
              id="stream-header-toolbar"
              className={`absolute sm:top-0 bottom-0 inset-x-0 z-30 min-h-[52px] sm:min-h-[56px] bg-neutral-950/95 sm:bg-gradient-to-b sm:from-neutral-950/95 sm:via-neutral-950/70 sm:to-transparent backdrop-blur-xl px-2.5 sm:px-6 py-2 sm:py-0 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] sm:pb-0 flex items-center justify-between border-t sm:border-t-0 sm:border-b border-neutral-800/80 sm:border-neutral-800/40 shadow-2xl transition-transform duration-300 ${
                isToolbarVisible ? 'translate-y-0' : 'translate-y-full sm:-translate-y-full'
              }`}
            >
              {/* Left: Back to Options */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="btn-back-to-options"
                  onClick={() => setViewMode('selection')}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors cursor-pointer shadow-md min-h-[38px] touch-manipulation"
                  title="Back to option selector"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Options</span>
                </button>
              </div>

              {/* Center: Segmented Two-Option Switcher Tabs */}
              <div id="quick-option-tabs" className="flex items-center bg-neutral-900/95 p-1 rounded-xl border border-neutral-800 shadow-xl max-w-[280px] sm:max-w-none">
                <button
                  id="tab-switch-livetv"
                  onClick={() => {
                    setSelectedStream('livetv');
                    setIframeKey(k => k + 1);
                  }}
                  className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[34px] touch-manipulation ${
                    selectedStream === 'livetv'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Tv className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Live TV</span>
                </button>
                <button
                  id="tab-switch-movies"
                  onClick={() => {
                    setSelectedStream('movies');
                    setIframeKey(k => k + 1);
                  }}
                  className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[34px] touch-manipulation ${
                    selectedStream === 'movies'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Film className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Movies & Series</span>
                </button>
              </div>

              {/* Right Tools: Reload, Fullscreen, Collapse */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  id="btn-reload-stream"
                  type="button"
                  onClick={() => setIframeKey(k => k + 1)}
                  className="p-2 sm:p-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 active:bg-neutral-750 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer shadow-sm min-w-[38px] min-h-[38px] flex items-center justify-center touch-manipulation"
                  title="Reload stream frame"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>

                <button
                  id="btn-fullscreen-stream"
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 sm:p-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 active:bg-neutral-750 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer shadow-sm min-w-[38px] min-h-[38px] flex items-center justify-center touch-manipulation"
                  title="Toggle fullscreen mode"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>

                {/* Mobile Toolbar Collapse Trigger (hides it down off-screen) */}
                <button
                  id="btn-hide-toolbar"
                  type="button"
                  onClick={() => setIsToolbarVisible(false)}
                  className="p-2 sm:p-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 active:bg-neutral-750 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer shadow-sm min-w-[38px] min-h-[38px] flex items-center justify-center touch-manipulation sm:hidden"
                  title="Hide toolbar for full view"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Mobile Bottom Restore Pill (when toolbar is hidden, easily tap to bring it back up) */}
            {!isToolbarVisible && (
              <button
                id="btn-show-toolbar"
                type="button"
                onClick={() => setIsToolbarVisible(true)}
                className="absolute sm:top-2 bottom-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-850 active:bg-neutral-800 backdrop-blur-xl border border-neutral-700/60 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xl transition-transform active:scale-95 cursor-pointer touch-manipulation"
              >
                <span className={`w-2 h-2 rounded-full ${selectedStream === 'livetv' ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} />
                <span>{activeConfig.name}</span>
                <ChevronUp className="h-3.5 w-3.5 text-neutral-400" />
              </button>
            )}
          </>
        )}
      </div>

    </div>
  );
}
