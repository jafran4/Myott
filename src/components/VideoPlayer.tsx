import React, { useState, useRef, useEffect } from 'react';
import { Channel } from '../types';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, 
  Settings, Activity, RefreshCw, Radio, Camera, Cpu, Wifi, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPlayerProps {
  channel: Channel;
  onEmojiBurst: (emoji: string) => void;
  emojiBursts: { id: string; emoji: string; x: number; y: number }[];
}

export default function VideoPlayer({
  channel,
  onEmojiBurst,
  emojiBursts
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // default to muted for autoplay policies
  const [volume, setVolume] = useState(0.8);
  const [resolution, setResolution] = useState('1080p');
  const [isChangingResolution, setIsChangingResolution] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [latency, setLatency] = useState('1.8s');
  const [bitrate, setBitrate] = useState(5400); // kbps
  const [iframeKey, setIframeKey] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Trigger loading spinner when channel changes or resolution changes
  useEffect(() => {
    setIsLoading(true);
    setStreamError(false);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Dynamic fake bitrate and latency changes to make dials feel real-time
    const statsInterval = setInterval(() => {
      setBitrate(prev => Math.floor(prev + (Math.random() * 400 - 200)));
      setLatency(prev => {
        const floatVal = parseFloat(prev);
        const next = Math.max(0.8, Math.min(4.5, floatVal + (Math.random() * 0.4 - 0.2)));
        return `${next.toFixed(1)}s`;
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(statsInterval);
    };
  }, [channel.id, resolution]);

  // Handle Host Camera/Screen-Share Streaming logic
  useEffect(() => {
    if (channel.hostCam) {
      startCamera();
    } else if (channel.hostScreen) {
      startScreenShare();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [channel.hostCam, channel.hostScreen]);

  const startCamera = async () => {
    setStreamError(false);
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => console.log('Autoplay request:', err));
        };
      }
      setIsLoading(false);
      startAudioVisuals(stream);
    } catch (err) {
      console.error('Camera stream access denied or failed:', err);
      setStreamError(true);
      setIsLoading(false);
    }
  };

  const startScreenShare = async () => {
    setStreamError(false);
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => console.log('Autoplay request:', err));
        };
      }
      setIsLoading(false);
      startAudioVisuals(stream);

      // Handle user stopping screen share via browser built-in control bar
      stream.getVideoTracks().forEach(track => {
        track.onended = () => {
          stopCamera();
        };
      });
    } catch (err) {
      console.error('Screen capture access denied or failed:', err);
      setStreamError(true);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      localStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Build a custom canvas audio visualizer/background graphic when streaming or loading
  const startAudioVisuals = (stream: MediaStream) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 128;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasRef.current) return;
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        analyser.getByteFrequencyData(dataArray);

        // Ambient cyber backdrop glow
        ctx.fillStyle = 'rgba(15, 15, 15, 0.4)';
        ctx.fillRect(0, 0, width, height);

        // Draw dynamic soundwave bar spectrum
        const barWidth = (width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const percent = dataArray[i] / 255;
          const barHeight = percent * (height * 0.5);

          // Purple/indigo colors
          const r = Math.floor(139 + percent * 100);
          const g = Math.floor(92 + percent * 50);
          const b = Math.floor(246);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }

        animationFrameRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch (e) {
      // AudioContext fallback graphic
      const drawSimulated = () => {
        if (!canvasRef.current) return;
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(20, 20, 20, 0.6)';
        ctx.fillRect(0, 0, width, height);

        const time = Date.now() * 0.003;
        ctx.beginPath();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 3;
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.01 + time) * 30 + Math.cos(x * 0.005 + time * 1.5) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        animationFrameRef.current = requestAnimationFrame(drawSimulated);
      };
      drawSimulated();
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const handleResolutionChange = (res: string) => {
    setIsChangingResolution(true);
    setResolution(res);
    setShowSettingsMenu(false);
    
    setTimeout(() => {
      setIsChangingResolution(false);
    }, 900);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Fullscreen trigger failed', err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Re-sync video play events is helpful
  useEffect(() => {
    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.addEventListener('play', handleVideoPlay);
      videoEl.addEventListener('pause', handleVideoPause);
    }

    return () => {
      if (videoEl) {
        videoEl.removeEventListener('play', handleVideoPlay);
        videoEl.removeEventListener('pause', handleVideoPause);
      }
    };
  }, [channel.id, channel.hostCam, channel.hostScreen]);

  const popularReactEmojis = ['🔥', '😮', '💖', '😂', 'GG', '📈', '🚀', '💯'];

  return (
    <div 
      id="video-player-root" 
      ref={containerRef} 
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800 group"
    >
      {/* 1. HTML5 Video Stream Source OR Canvas element OR Embedded Iframe code */}
      {!(channel.hostCam || channel.hostScreen) ? (
        channel.streamUrl && (
          channel.streamUrl.includes('youtube') || 
          channel.streamUrl.includes('embed') || 
          (!channel.streamUrl.toLowerCase().endsWith('.mp4') && channel.streamUrl.startsWith('http'))
        ) ? (
          <div className="relative w-full h-full bg-neutral-950">
            <iframe
              key={`${channel.streamUrl}-${iframeKey}`}
              id="website-stream-player"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`${channel.name} Live Stream`}
              className="w-full h-full object-cover z-0 bg-neutral-950"
              src={channel.streamUrl}
            />
            {/* Top Bar for External Website Stream */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-auto">
              <span className="bg-neutral-950/85 backdrop-blur-md text-neutral-300 px-2.5 py-1 rounded-md text-[11px] font-medium border border-neutral-800 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[10px] text-purple-400 font-semibold">Web Stream:</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{channel.streamUrl.replace(/^https?:\/\//, '')}</span>
              </span>
              <a
                href={channel.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600/90 hover:bg-purple-600 text-white backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg transition-all"
                title="Open stream website in new tab"
              >
                Open Site <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <button
                type="button"
                onClick={() => setIframeKey(k => k + 1)}
                className="bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 backdrop-blur-md px-2 py-1 rounded-md text-[10px] flex items-center gap-1 border border-neutral-800 transition-colors cursor-pointer"
                title="Reload stream player frame"
              >
                <RefreshCw className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>
        ) : (
          <video
            id="video-player-element"
            ref={videoRef}
            src={channel.streamUrl}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
          />
        )
      ) : (
        <div id="host-stream-container" className="relative w-full h-full">
          <video
            id="video-player-element-host"
            ref={videoRef}
            playsInline
            muted={isMuted}
            className={`w-full h-full object-cover ${channel.hostScreen ? '' : 'scale-x-[-1]'}`} // mirror ONLY webcam, not screen share!
          />
          <canvas
            id="visualizer-canvas"
            ref={canvasRef}
            width={640}
            height={360}
            className="absolute bottom-4 left-4 w-48 h-16 rounded-lg opacity-80 pointer-events-none border border-neutral-700/50 bg-neutral-900/60"
          />
        </div>
      )}

      {/* Floating Burst Emoticons Layer */}
      <div id="floating-burst-container" className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {emojiBursts.map(burst => (
            <motion.div
              key={burst.id}
              initial={{ opacity: 1, y: burst.y, scale: 0.5 }}
              animate={{ 
                opacity: 0, 
                y: burst.y - 250 - Math.random() * 100, 
                x: burst.x + (Math.random() * 120 - 60), 
                scale: 1.8,
                rotate: Math.random() * 40 - 20 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="absolute text-3xl select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] font-bold pointer-events-none text-purple-400"
              style={{ left: `${burst.x}%`, top: `80%` }}
            >
              {burst.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading Overlay */}
      {(isLoading || isChangingResolution) && (
        <div id="video-loading-overlay" className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col justify-center items-center z-30 transition-all">
          <div className="relative flex items-center justify-center">
            <RefreshCw className="h-10 w-10 text-purple-500 animate-spin" />
            <Radio className="absolute h-4 w-4 text-white animate-pulse" />
          </div>
          <p className="text-sm text-neutral-300 mt-4 font-medium tracking-wide">
            {isChangingResolution ? `Switching to ${resolution}...` : `Buffering Stream Feed...`}
          </p>
        </div>
      )}

      {/* Error State Overlay */}
      {streamError && (
        <div id="video-error-overlay" className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center z-30">
          <div className="bg-red-500/15 p-4 rounded-full border border-red-500/30 mb-4 animate-bounce">
            <Camera className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-neutral-100">Broadcasting Hardware Inactive</h3>
          <p className="text-sm text-neutral-400 max-w-sm mt-2">
            Failed to fetch standard camera feed. Please confirm browser webcam permissions are enabled, or select a pre-recorded streamer to watch!
          </p>
          <button 
            id="btn-retry-hd"
            onClick={startCamera}
            className="mt-5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Request Permissions Again
          </button>
        </div>
      )}

      {/* Auto Unmute Action Overlay - highly realistic Stream UX */}
      {isMuted && !streamError && !isLoading && !(
        channel.streamUrl && (
          channel.streamUrl.includes('youtube') || 
          channel.streamUrl.includes('embed') || 
          (!channel.streamUrl.toLowerCase().endsWith('.mp4') && channel.streamUrl.startsWith('http'))
        )
      ) && (
        <div 
          id="click-to-unmute-prompter"
          onClick={() => setIsMuted(false)}
          className="absolute top-4 left-4 z-20 bg-purple-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl border border-purple-400/30 cursor-pointer hover:bg-purple-600 animate-pulse transition-transform active:scale-95"
        >
          <VolumeX className="h-3.5 w-3.5" /> CLICK TO UNMUTE STREAM
        </div>
      )}

      {/* Live Stream Status telemetry banner topright */}
      <div id="live-telemetry-pill" className="absolute top-4 right-4 z-20 flex items-center gap-1.5 font-mono text-[10px] bg-neutral-950/80 px-2.5 py-1 rounded-full border border-neutral-800 backdrop-blur-sm text-neutral-300">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
        <span className="font-bold text-red-400">LIVE</span>
        <span className="text-neutral-500">|</span>
        <span className="flex items-center gap-1"><Cpu className="h-2.5 w-2.5" /> {resolution}</span>
        <span className="text-neutral-500">|</span>
        <span className="flex items-center gap-1"><Wifi className="h-2.5 w-2.5" /> {latency}</span>
      </div>

      {/* Interactive Quick Floating Emote Bar Above Controls */}
      <div id="quick-emoji-triggers" className="absolute bottom-16 right-4 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
        <div className="bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-full border border-neutral-800 flex gap-1 shadow-2xl">
          {popularReactEmojis.map(emoji => (
            <button
              id={`emoji-trigger-${emoji}`}
              key={emoji}
              onClick={() => onEmojiBurst(emoji)}
              className="w-7 h-7 flex items-center justify-center text-sm rounded-full hover:bg-neutral-850 active:scale-125 transition-transform cursor-pointer"
              title={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Stream Control Bar */}
      <div id="playback-control-bar" className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/90 via-black/75 to-transparent flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        
        {/* Left Side Controls: Play, Mute, Volume */}
        <div className="flex items-center gap-4">
          <button
            id="play-pause-btn"
            onClick={handlePlayPause}
            className="text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2 group/volume">
            <button
              id="mute-unmute-btn"
              onClick={handleMuteToggle}
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 rounded-lg bg-neutral-700 accent-purple-500 cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity"
            />
          </div>

          <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800">
            {channel.uptime}
          </span>
        </div>

        {/* Right Side Settings: Gear, Tech Stats, Fullscreen */}
        <div className="flex items-center gap-4">
          
          {/* Settings cog */}
          <div className="relative">
            <button
              id="stream-settings-toggle"
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className={`text-white hover:text-purple-400 transition-all cursor-pointer ${showSettingsMenu ? 'rotate-45 text-purple-400' : ''}`}
            >
              <Settings className="h-5 w-5" />
            </button>

            {showSettingsMenu && (
              <div id="settings-menu-box" className="absolute bottom-8 right-0 bg-neutral-900/95 border border-neutral-800 rounded-lg shadow-2xl p-2 w-48 text-left backdrop-blur-md z-40">
                <p className="text-[10px] font-semibold text-neutral-500 uppercase px-2 py-1 tracking-wider">Quality Presets</p>
                {['1080p60 Source', '720p60 HD', '480p SD', '360p Low', 'Auto Quality'].map(level => {
                  const levelCode = level.split(' ')[0];
                  const currentLevelSelected = resolution === levelCode || (resolution === '1080p' && levelCode === '1080p60');
                  
                  return (
                    <button
                      id={`quality-${levelCode}`}
                      key={level}
                      onClick={() => handleResolutionChange(levelCode)}
                      className={`w-full text-xs text-left px-2 py-1.5 rounded hover:bg-neutral-800 transition-colors flex items-center justify-between ${currentLevelSelected ? 'text-purple-400 font-semibold' : 'text-neutral-300'}`}
                    >
                      <span>{level}</span>
                      {currentLevelSelected && <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>}
                    </button>
                  );
                })}
                <div className="h-px bg-neutral-800 my-1"></div>
                <div className="px-2 py-1 text-[9px] font-mono text-neutral-500 space-y-0.5">
                  <p>Bitrate: ~{bitrate} kbps</p>
                  <p>Provider: Mixkit/Cloud-Nodes</p>
                  <p>HMR: Handled Off</p>
                </div>
              </div>
            )}
          </div>

          <button
            id="fullscreen-btn"
            onClick={toggleFullscreen}
            className="text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
