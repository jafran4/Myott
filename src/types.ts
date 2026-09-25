export interface ChatMessage {
  id: string;
  user: string;
  userColor: string;
  avatar: string;
  message: string;
  timestamp: string;
  isSubscriber: boolean;
  isVIP: boolean;
  isMod: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: {
    text: string;
    votes: number;
  }[];
  active: boolean;
  totalVotes: number;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  title: string;
  category: string;
  categoryType: 'Gaming' | 'Coding' | 'Music' | 'Creative' | 'Just Chatting';
  viewers: number;
  tags: string[];
  followers: number;
  description: string;
  streamUrl: string;
  isLive: boolean;
  uptime: string;
  chatResponses: string[]; // custom automated responses for this channel
  hostCam?: boolean; // if the stream is hosted by the user's camera
  hostScreen?: boolean; // if the stream is hosted by screen sharing
}
