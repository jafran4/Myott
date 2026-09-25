import { Channel } from './types';

export const CATEGORIES = [
  { name: 'All', icon: 'Tv', count: 6 },
  { name: 'Gaming', icon: 'Gamepad2', count: 1 },
  { name: 'Coding', icon: 'Code', count: 1 },
  { name: 'Music', icon: 'Music', count: 1 },
  { name: 'Creative', icon: 'Palette', count: 2 },
  { name: 'Just Chatting', icon: 'Heart', count: 1 }
];

export const INITIAL_CHANNELS: Channel[] = [
  {
    id: 'ch-movies',
    name: 'MSIT_Cinema',
    avatar: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    title: '🎬 LIVE BROADCAST | MSIT Movie - Movies & Series (msitmovie.blogspot.com)',
    category: 'Cinema & Movies',
    categoryType: 'Creative',
    viewers: 36200,
    tags: ['MSITMovie', 'Movies', 'HDLive', 'CinemaStream', 'Series'],
    followers: 512000,
    description: 'Live streaming portal for Movies & Series (msitmovie.blogspot.com). High-definition cinema streaming, series, trending film highlights, and nonstop theater entertainment broadcast.',
    streamUrl: 'https://msitmovie.blogspot.com/',
    isLive: true,
    uptime: '06:14:32',
    chatResponses: [
      'MSIT Movie streaming live feed is super crisp!',
      'Movies & series selection is top tier 🍿🎥',
      'Audio quality and subtitle sync are crystal clear',
      'Love having this stream directly inside StreamPulse!',
      'What movie or show is scheduled next?',
      'Can we full-screen this stream? Yes, click the expand button!',
      'No buffering at 1080p, stream bitrate is solid 🚀',
      'Cinema vibes 10/10 tonight',
      'Greatest streaming channel on the platform!'
    ]
  },
  {
    id: 'ch-famelack',
    name: 'Famelack_BD_TV',
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
    title: '🔴 LIVE HD BROADCAST | National Sports Arena & Bangladesh TV Channel Stream',
    category: 'International Sports',
    categoryType: 'Creative',
    viewers: 24700,
    tags: ['LiveSports', 'BanglaTV', 'Famelack', 'Broadcasting'],
    followers: 341000,
    description: 'Famelack high definition sports livestreaming gateway. Delivering premium coverage, regional events, and global television highlights 24/7.',
    streamUrl: 'https://famelack.com/tv/bd/J7BmdiABqVkDMa',
    isLive: true,
    uptime: '12:04:15',
    chatResponses: [
      'Wow the frame rate on this YouTube livestream is incredibly crisp!',
      'Where is this game being hosted?',
      'Famelack stream quality is amazing! 🚀',
      'Go BD! Go Team! 🐯🏏',
      'Can we set the streaming quality to 1080p source?',
      'Is there an alternative link if the backup buffers?',
      'Awesome stream experience',
      'This platform has the absolute best live chat features',
      'Chat is moving so fast we need slow mode enabled',
      'Hype is real!'
    ]
  },
  {
    id: 'ch-gaming',
    name: 'GlitchGamer_99',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    title: '🏆 RANKED SPEEDRUNS! | Neon Strike: 2099 - Cyber Arena - Custom Mods Enabled',
    category: 'Neon Strike 2099',
    categoryType: 'Gaming',
    viewers: 14820,
    tags: ['Speedrun', 'Hardcore', 'Gaming', 'NoDeath'],
    followers: 124500,
    description: 'Professional speedrunner & esports athlete. Gaming standard set high, visual neon atmosphere 100% active. Join the Arena!',
    streamUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02cba3d11b32a122e2f3886c3d0b240&profile_id=139&oauth2_token_id=57447761',
    isLive: true,
    uptime: '02:44:12',
    chatResponses: [
      'POG! What a slide transition!',
      'He is actually going for the world record today!',
      'Gamer99 has supreme controller grip, can someone link his setup?',
      'OMG did you see that speed jump?',
      'Can we get a hype train going in the chat?! 🚂💨',
      'That boss fight was pure sweat mode 🥵',
      'GG wp, gamer is unbeatable',
      'Settings on high or medium resolution today?',
      'Wait, glitch gamer is playing on a customized controller?',
      'Lmao he just dodged a bullet point-blank!'
    ]
  },
  {
    id: 'ch-coding',
    name: 'CodeStack_Dev',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&auto=format&fit=crop&q=80',
    title: '💻 BUILDING A HIGH-PERFORMANCE CHATBOT SERVER | React 19 + Express from Scratch',
    category: 'Software Development',
    categoryType: 'Coding',
    viewers: 3205,
    tags: ['WebDev', 'TypeScript', 'Tailwindv4', 'LiveCode'],
    followers: 43200,
    description: 'Senior Full Stack Software Architect. Sharing software insights and building beautiful, scalable client systems in real time.',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-matrix-style-green-digital-particles-background-39822-large.mp4',
    isLive: true,
    uptime: '01:15:30',
    chatResponses: [
      'Is React 19 stable enough for production server setups?',
      'That useEffect code block is so clean now',
      'Quick question: does tailwindcss bundle size increase with v4?',
      'He forgot a closing parenthesis on line 42!',
      'I love that code color theme, what is it?',
      'Do you prefer esbuild over bun for custom server bundles?',
      'Nice, type safety is elite here',
      'Can you explain why we use absolute paths over relative?',
      'Ah! That makes perfect sense, thank you.',
      'That state management flow is pure art 🚀'
    ]
  },
  {
    id: 'ch-music',
    name: 'LofiHorizon_DJ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: '🎧 24/7 Cosmic Chill Vibes & Atmospheric Beats | Synthwave Radio live DJ Set',
    category: 'Synth & Lofi',
    categoryType: 'Music',
    viewers: 8940,
    tags: ['Ambient', 'Relax', 'Chillout', 'Beatmaker'],
    followers: 98100,
    description: 'Cosmic beats to study, code, design, or sleep to. Dynamic visuals powered by our localized laser spectrum analyzer.',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32124-large.mp4',
    isLive: true,
    uptime: '15:22:01',
    chatResponses: [
      'This track is absolutely hitting the sweet spot',
      'Lofi beats paired with hot tea ☕ perfect evening.',
      'Who is the producer of the current synth synth track?',
      'The laser visuals match the low frequency bass so well!',
      'Adding this stream to my permanent study bookmarks.',
      'Just vibing in the chat, hello everyone from Canada!',
      'Vibe check: Passed with flying cosmic colors 🪐',
      'Is there a spotify playlist for these session mixes?',
      'Pure relaxation, thanks DJ Horizon!',
      'The bass drop just cleared my head completely'
    ]
  },
  {
    id: 'ch-creative',
    name: 'InkFlow_Aesthetics',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    title: '🎨 WATERCOLOR SWIRL TECHNIQUE! - Live Canvas Art Mastery & Sub Reviews',
    category: 'Digital & Fluid Art',
    categoryType: 'Creative',
    viewers: 1240,
    tags: ['Watercolor', 'Satisfying', 'InkFluid', 'CreativeDesign'],
    followers: 25700,
    description: 'Visual designer and classical canvas artist. Sharing experimental watercolor and high-density liquid swirl art styles live.',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-underwater-42921-large.mp4',
    isLive: true,
    uptime: '03:10:45',
    chatResponses: [
      'That liquid swirl is super satisfying to watch',
      'Wow, the color mixing is gorgeous!',
      'Do you use standard acrylics or special ink density formulas?',
      'This is incredibly therapeutic 💆‍♀️',
      'I could watch the ink expand for hours, outstanding frame speed',
      'The gradient transition on the top left is magical',
      'Beautiful artwork! Looking forward to the subscriber review session!',
      'Where can we buy these high-contrast prints?',
      'Ink flow looks perfectly fluid',
      'Mind = Blown by the color coordination 🎨'
    ]
  },
  {
    id: 'ch-chatting',
    name: 'CosmicSpeaks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: '☕ Sunday Tea Talk & Reacting to AI Studio agent code compilation fails',
    category: 'Just Chatting',
    categoryType: 'Just Chatting',
    viewers: 5800,
    tags: ['TalkShow', 'Chill', 'Q&A', 'Reacts'],
    followers: 84000,
    description: 'Weekly casual talks, technology news breakdown, internet culture react, and friendly Q&A stream.',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-concert-with-lights-42525-large.mp4',
    isLive: true,
    uptime: '00:54:20',
    chatResponses: [
      'Loll that reaction face represents all of us!',
      'Chat, what is the best frontend framework in 2026?',
      'Hahaha so true!',
      'His laugh is infectious 😂',
      'Hey Cosmic, what are your thoughts on developer container scaling?',
      'The background light setup is stellar!',
      'Perfect topic, glad I tuned in early',
      'React 19 hooks are indeed a game changer',
      'Can we ask off-topic tech questions?',
      'Lmao standard twitch chat memes are flooding in'
    ]
  }
];

export const MOCK_USERS = [
  { name: 'SkyLurker', color: '#10B981', isSub: true, isVIP: false, isMod: false },
  { name: 'Mod_Quantum', color: '#EF4444', isSub: true, isVIP: false, isMod: true },
  { name: 'CodeNinja', color: '#3B82F6', isSub: false, isVIP: true, isMod: false },
  { name: 'VibeCheck_9', color: '#F59E0B', isSub: true, isVIP: false, isMod: false },
  { name: 'PixelDust', color: '#EC4899', isSub: true, isVIP: true, isMod: false },
  { name: 'CtrlAltDefeat', color: '#8B5CF6', isSub: false, isVIP: false, isMod: false },
  { name: 'BugHunter', color: '#14B8A6', isSub: true, isVIP: false, isMod: true },
  { name: 'CoffeeFueled', color: '#6366F1', isSub: true, isVIP: false, isMod: false },
  { name: 'Synth_Lover', color: '#F43F5E', isSub: false, isVIP: false, isMod: false },
  { name: 'ByteMe', color: '#06B6D4', isSub: true, isVIP: true, isMod: false }
];

export const MOCK_BADGES = {
  mod: '⚔️ Mod',
  sub: '⭐ Sub',
  vip: '💎 VIP'
};
