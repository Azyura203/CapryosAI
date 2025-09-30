import { ReactNode } from 'react';

export interface Message {
  originalEnglish: ReactNode | Iterable<ReactNode>;
  role: 'user' | 'assistant';
  content: string;
}

export interface University {
  name: string;
  logo: string;
  description: string;
}