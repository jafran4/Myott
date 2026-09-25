import React, { useState } from 'react';
import { 
  Tv, Film, RefreshCw, Maximize2, 
  ArrowLeft, Play, Radio, Clapperboard, Sparkles
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
    <div id="app-viewport-wrapper" className="w-screen h-screen bg-neutral-950 text-neutral-100 overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* 1. SELECTION PORTAL: Shown when user enters the website */}
      {viewMode === 'selection' && (
        <div 
          id="entry-selection-portal"
          className="absolute inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto"
        >
          {/* Ambient background light gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-10 my-auto">
            
            {/* Header intro */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>StreamPulse Portal</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
                Select What to Watch
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto">
                Choose between our 24/7 Live Television stream or explore our Movies & Series cinema entertainment.
              </p>
            </div>

            {/* The TWO Primary Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              
              {/* Option 1: Live TV */}
              <button
                id="btn-select-live-tv"
                onClick={() => handleSelectOption('livetv')}
                className="group relative flex flex-col text-left rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/60 p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer overflow-hidden"
              >
                {/* Background image overlay with gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${STREAM_OPTIONS.livetv.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
                      <Tv className="h-7 w-7" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      LIVE TV
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      Live TV
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {STREAM_OPTIONS.livetv.description}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-neutral-300 border-t border-neutral-800/80">
                    <span className="font-mono text-neutral-500">{STREAM_OPTIONS.livetv.domain}</span>
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
                className="group relative flex flex-col text-left rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-purple-500/60 p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
              >
                {/* Background image overlay with gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${STREAM_OPTIONS.movies.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg">
                      <Film className="h-7 w-7" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      <Clapperboard className="h-3 w-3" />
                      CINEMA HD
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      Movies & Series
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {STREAM_OPTIONS.movies.description}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-neutral-300 border-t border-neutral-800/80">
                    <span className="font-mono text-neutral-500">{STREAM_OPTIONS.movies.domain}</span>
                    <span className="inline-flex items-center gap-1 text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                      Watch Movies & Series →
                    </span>
                  </div>
                </div>
              </button>

            </div>

            <p className="text-xs text-neutral-600 font-mono">
              You can switch between Live TV and Movies & Series at any time while watching.
            </p>
          </div>
        </div>
      )}

      {/* 2. BODY LAYOUT (Includes Stream Stage and Floating Switcher) */}
      <div id="body-layout-container" className="w-full h-full flex-1 flex flex-col relative overflow-hidden">
        
        {/* Sleek Floating Header / Switcher when inside stream view */}
        {viewMode === 'stream' && (
          <header 
            id="stream-header-toolbar"
            className="absolute top-0 inset-x-0 z-30 h-14 bg-gradient-to-b from-neutral-950/90 via-neutral-950/60 to-transparent backdrop-blur-md px-4 sm:px-6 flex items-center justify-between border-b border-neutral-800/40"
          >
            {/* Back to Options & Brand */}
            <div className="flex items-center gap-3">
              <button
                id="btn-back-to-options"
                onClick={() => setViewMode('selection')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors cursor-pointer shadow-md"
                title="Back to option selector"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Options</span>
              </button>

              {/* Active Stream Indicator */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selectedStream === 'livetv' ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} />
                <span className="text-sm font-bold text-white tracking-tight">
                  {activeConfig.name}
                </span>
              </div>
            </div>

            {/* Quick Two-Option Switcher Tabs */}
            <div id="quick-option-tabs" className="flex items-center bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 shadow-xl">
              <button
                id="tab-switch-livetv"
                onClick={() => {
                  setSelectedStream('livetv');
                  setIframeKey(k => k + 1);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedStream === 'livetv'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Tv className="h-3.5 w-3.5" />
                <span>Live TV</span>
              </button>
              <button
                id="tab-switch-movies"
                onClick={() => {
                  setSelectedStream('movies');
                  setIframeKey(k => k + 1);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedStream === 'movies'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Film className="h-3.5 w-3.5" />
                <span>Movies & Series</span>
              </button>
            </div>

            {/* Right Tools: Reload, Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                id="btn-reload-stream"
                type="button"
                onClick={() => setIframeKey(k => k + 1)}
                className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer shadow-sm"
                title="Reload stream frame"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>

              <button
                id="btn-fullscreen-stream"
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer shadow-sm"
                title="Toggle fullscreen mode"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>
        )}

        {/* Main Stage hosting the stream player */}
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
      </div>

    </div>
  );
}
