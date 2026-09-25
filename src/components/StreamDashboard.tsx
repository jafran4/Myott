import React, { useState } from 'react';
import { Channel } from '../types';
import { 
  Radio, Camera, Sliders, Shield, Key, Sparkles, Check, 
  HelpCircle, AlertTriangle, Monitor, Volume2, Lock 
} from 'lucide-react';

interface StreamDashboardProps {
  channel: Channel;
  isStreaming: boolean;
  onToggleStreaming: (bool: boolean, mode?: 'camera' | 'screenshare') => void;
  onUpdateMetadata: (title: string, category: string, tags: string[], streamUrl?: string) => void;
  isCreatorAuthorized: boolean;
  onAuthorize: (bool: boolean) => void;
}

export default function StreamDashboard({
  channel,
  isStreaming,
  onToggleStreaming,
  onUpdateMetadata,
  isCreatorAuthorized,
  onAuthorize
}: StreamDashboardProps) {
  const [streamTitle, setStreamTitle] = useState(channel.title);
  const [category, setCategory] = useState(channel.category);
  const [tagsInput, setTagsInput] = useState(channel.tags.join(', '));
  const [customStreamUrl, setCustomStreamUrl] = useState(channel.streamUrl || '');
  const [streamKey, setStreamKey] = useState('live_88329571_vjXpYtqW91n5rKb...');
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Authorization input states
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState(false);
  const [newPassInput, setNewPassInput] = useState('');
  const [newPassSuccess, setNewPassSuccess] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('stream_pulse_creator_pass') || 'likhon401';
    if (passInput.trim() === storedPass) {
      localStorage.setItem('stream_pulse_creator_authorized', 'true');
      onAuthorize(true);
      setPassInput('');
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleUpdatePasscode = () => {
    if (!newPassInput.trim()) return;
    localStorage.setItem('stream_pulse_creator_pass', newPassInput.trim());
    setNewPassInput('');
    setNewPassSuccess(true);
    setTimeout(() => setNewPassSuccess(false), 2500);
  };

  const handleLockDashboard = () => {
    localStorage.removeItem('stream_pulse_creator_authorized');
    onAuthorize(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    onUpdateMetadata(streamTitle, category, tagsArray, customStreamUrl);
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  if (!isCreatorAuthorized) {
    return (
      <div id="creator-lock-root" className="w-full bg-neutral-900 p-6 sm:p-8 rounded-xl border border-neutral-800 shadow-2xl max-w-lg mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-purple-600/10 p-4 rounded-full border border-purple-500/30 text-purple-400">
            <Shield className="h-8 w-8 animate-pulse" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-neutral-100 font-display">🔒 Creator Studio Access Verification</h3>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            This broadcasting console is restricted to the stream owner to prevent unauthorized streaming. Please enter your secret Master Creator Passcode to gain broadcast authorization.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <input
              id="inp-creator-pin"
              type="password"
              placeholder="Enter Creator Passcode..."
              value={passInput}
              onChange={(e) => {
                setPassInput(e.target.value);
                setPassError(false);
              }}
              className={`w-full bg-neutral-950 text-neutral-100 text-xs px-4 py-3 rounded-lg border text-center tracking-wider font-mono focus:outline-none focus:border-purple-500 transition-colors ${passError ? 'border-red-500 ring-1 ring-red-500/20' : 'border-neutral-800'}`}
            />
            {passError && (
              <p className="text-[11px] text-red-100 mt-1.5 flex items-center justify-center gap-1">
                <AlertTriangle className="h-3 w-3 text-red-400" /> Incorrect Passcode. Please try again!
              </p>
            )}
          </div>

          <button
            id="btn-creator-unlock"
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg shadow-lg hover:shadow-purple-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Key className="h-3.5 w-3.5" />
            Unlock Studio Console
          </button>
        </form>

        <div className="bg-neutral-950/80 border border-neutral-850 p-3 rounded-lg text-left">
          <p className="text-[10px] text-neutral-400 font-mono flex items-start gap-1.5 leading-normal">
            <span className="text-purple-400 font-semibold uppercase">💡 Setup Note:</span>
            <span>The default master passcode for your account is <code className="bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-purple-300 font-mono">likhon401</code>. Once unlocked, you can change this from the secure settings panel below.</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="creator-dashboard-root" className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-neutral-900/40 rounded-xl border border-neutral-800">
      
      {/* Col 1 & 2: Main Stream Setup */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
              <Sliders className="h-5 w-5 text-purple-400" /> Host Broadcaster Control Studio
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider ${isStreaming ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-neutral-800 text-neutral-400'}`}>
              {isStreaming ? 'STREAMING ACTIVE' : 'STAGE OFFLINE'}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Configure your broadcast credentials and activate camera feeds to stream directly to viewers. In Broadcasting mode, standard browser cameras translate onto the central player stage in high-fidelity.
          </p>

          <form id="creator-broadcast-form" onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label id="lbl-title" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5Packed">Stream Title</label>
              <input
                id="inp-stream-title"
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="Name your stream..."
                className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-800 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label id="lbl-stream-url" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">Stream Source URL / Website Embed URL</label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-500">Presets:</span>
                  <button
                    id="btn-preset-movies"
                    type="button"
                    onClick={() => {
                      setCustomStreamUrl('https://msitmovie.blogspot.com/');
                      setStreamTitle('🎬 LIVE STREAM | MSIT Movie - Movies & Series (msitmovie.blogspot.com)');
                      setCategory('Cinema & Movies');
                    }}
                    className="text-[10px] font-mono text-purple-400 hover:text-purple-300 underline cursor-pointer"
                  >
                    MSIT Movie
                  </button>
                  <span className="text-[10px] text-neutral-600">•</span>
                  <button
                    id="btn-preset-famelack"
                    type="button"
                    onClick={() => {
                      setCustomStreamUrl('https://famelack.com/tv/bd/J7BmdiABqVkDMa');
                      setStreamTitle('🔴 LIVE HD BROADCAST | National Sports Arena & BD TV');
                      setCategory('International Sports');
                    }}
                    className="text-[10px] font-mono text-purple-400 hover:text-purple-300 underline cursor-pointer"
                  >
                    Famelack
                  </button>
                </div>
              </div>
              <input
                id="inp-stream-url"
                type="url"
                value={customStreamUrl}
                onChange={(e) => setCustomStreamUrl(e.target.value)}
                placeholder="https://cinehd.vc/home"
                className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-800 focus:outline-none focus:border-purple-500 transition-colors font-mono"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                Enter your live website URL (e.g. <span className="text-neutral-400">https://cinehd.vc/home</span>) or any video stream to broadcast it live.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label id="lbl-category" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Stream Category / Game</label>
                <input
                  id="inp-stream-category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Software Development"
                  className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-800 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label id="lbl-tags" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Tags (comma separated)</label>
                <input
                  id="inp-stream-tags"
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. WebDev, LiveCode, React"
                  className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-800 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Stream Secret Key (Twitch Simulation flavor) */}
            <div className="bg-neutral-950 border border-neutral-850 p-3.5 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
                <span className="flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider"><Key className="h-3.5 w-3.5 text-purple-400" /> RTMP Connection Key</span>
                <button
                  id="btn-toggle-key"
                  type="button"
                  onClick={() => setShowStreamKey(!showStreamKey)}
                  className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer text-[10px] font-bold"
                >
                  {showStreamKey ? 'Hide Secret Key' : 'Reveal Key'}
                </button>
              </div>
              <input
                id="inp-secret-key"
                type={showStreamKey ? 'text' : 'password'}
                value={streamKey}
                readOnly
                className="w-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-purple-400 px-3 py-2 rounded focus:outline-none select-all"
                title="Secondary streaming credentials"
              />
              <p className="text-[10px] text-neutral-500">
                Keep this key private. It is used to authenticate streaming encoders like OBS Studio or Streamlabs.
              </p>
            </div>

            {/* Save Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-save-settings"
                type="submit"
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" /> Applied Metadata
                  </>
                ) : (
                  'Apply Metadata Changes'
                )}
              </button>

              {isStreaming ? (
                <button
                  id="btn-stream-activation-off"
                  type="button"
                  onClick={() => onToggleStreaming(false)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg animate-pulse"
                >
                  <Radio className="h-4 w-4" />
                  Stop Broadcast
                </button>
              ) : (
                <>
                  <button
                    id="btn-stream-activation-webcam"
                    type="button"
                    onClick={() => onToggleStreaming(true, 'camera')}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                    Go Live (Webcam Mode)
                  </button>

                  <button
                    id="btn-stream-activation-screenshare"
                    type="button"
                    onClick={() => onToggleStreaming(true, 'screenshare')}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Monitor className="h-4 w-4" />
                    Go Live (Share Screen)
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Col 3: Stream Performance Metrics & Setup Helpers */}
      <div className="space-y-6">
        
        {/* Stream Health Card */}
        <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
            <Radio className="h-4 w-4 text-purple-400" /> Bitrates & Broadcast Health
          </h3>
          
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Network Server Health</span>
                <span className="text-emerald-400 font-bold">EXCELLENT</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full border border-neutral-850">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: isStreaming ? '95%' : '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1 font-mono">
                <span>FPS Render Frequency</span>
                <span>{isStreaming ? '60.0 fps' : '0.0 fps'}</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full border border-neutral-850">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: isStreaming ? '100%' : '0%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center bg-neutral-950 p-2.5 rounded border border-neutral-850">
              <div>
                <p className="text-[10px] text-neutral-500 tracking-wider font-semibold">OUTPUT CODEC</p>
                <p className="text-xs font-mono text-neutral-300 font-semibold">{isStreaming ? 'H.264 / AAC' : 'Idle'}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 tracking-wider font-semibold">SERVER DELAY</p>
                <p className="text-xs font-mono text-purple-400 font-bold">{isStreaming ? '1.2 seconds' : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Security & Passcode Configuration */}
        <div id="creator-security-card" className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-sm space-y-4">
          <h3 className="text-xs font-semibold text-neutral-100 flex items-center gap-2 uppercase tracking-wider">
            <Shield className="h-4 w-4 text-purple-400" /> Secure Creator Lock
          </h3>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Change your private Master Passcode to ensure only you can stream on this website.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-neutral-550 uppercase font-bold tracking-wider mb-1">New Creator Passcode</label>
              <input
                id="inp-new-creator-pass"
                type="password"
                placeholder="Type new passcode..."
                value={newPassInput}
                onChange={(e) => {
                  setNewPassInput(e.target.value);
                  setNewPassSuccess(false);
                }}
                className="w-full bg-neutral-950 border border-neutral-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-purple-500 text-neutral-200 font-mono"
              />
            </div>

            <div className="flex gap-2">
              <button
                id="btn-update-passcode"
                type="button"
                onClick={handleUpdatePasscode}
                className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] rounded transition-colors cursor-pointer"
              >
                {newPassSuccess ? 'Updated Successfully!' : 'Set Passcode'}
              </button>
              
              <button
                id="btn-lock-dashboard"
                type="button"
                onClick={handleLockDashboard}
                className="py-1.5 px-3 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 font-semibold text-[11px] rounded transition-colors cursor-pointer flex items-center gap-1.5"
                title="Lock Studio Panel Now"
              >
                <Lock className="h-3 w-3 text-red-400" /> Lock
              </button>
            </div>
          </div>
        </div>

        {/* Streaming tips & instructions */}
        <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-sm space-y-3 text-neutral-400 text-xs">
          <h4 className="text-neutral-100 font-medium flex items-center gap-1.5 text-xs">
            <Sparkles className="h-4 w-4 text-purple-400" /> Host Guidelines
          </h4>
          <p className="leading-relaxed">
            1. Ensure clean framing with robust lighting for high visual stream appeal.
          </p>
          <p className="leading-relaxed">
            2. When live, viewers in the chat will react instantly to your broadcast using preset emoji triggers!
          </p>
          <p className="leading-relaxed">
            3. You can submit chat answers as the administrator to guide discussions and moderate bad vocabulary instantly.
          </p>
        </div>

      </div>

    </div>
  );
}
