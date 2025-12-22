
export enum View {
  CHAT = 'CHAT',
  VOICE = 'VOICE',
  NOTES = 'NOTES',
  HOME = 'HOME',
  SETTINGS = 'SETTINGS'
}

export interface VoiceSettings {
  voiceName: string;
  gender: 'feminine' | 'masculine' | 'neutral';
  accent: 'US' | 'UK';
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export interface SessionNote {
  dateTimeUTC: string;
  presentingThemes: string[];
  emotionsObserved: string[];
  keyQuotes: string[];
  skillsApplied: string[];
  summary: string;
  goalsNextSteps: string[];
}

export interface CrisisResource {
  name: string;
  contact: string;
  description: string;
}
