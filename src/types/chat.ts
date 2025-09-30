export interface Message {
  role: 'user' | 'assistant';
  content: string;
  originalEnglish?: string;
}

export interface University {
  name: string;
  logo: string;
  description: string;
}