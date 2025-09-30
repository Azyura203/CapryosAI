/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Message, University } from '../types/chat';
import { getChatResponse } from '../services/openai';
import { getUniversityKey } from '../data/universityDetails'; // Import the function
import { useTypingEffect } from '../hooks/useTypingEffect';


export function useUniversityChat() {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (content: string) => {
    if (!selectedUniversity) return;

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const universityKey = getUniversityKey(selectedUniversity.name);
      console.log('University Key:', universityKey); // Debugging line
      if (!universityKey) {
        throw new Error('Invalid university selected');
      }

      const response = await getChatResponse([...messages, userMessage], universityKey);
      
      const botMessage: Message = {
        role: 'assistant',
        content: response
      };
      
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500); // 500ms delay to simulate typing effect
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(`Sorry, I encountered an error: ${errorMessage}`);
      console.error('Chat error:', err);
    } finally {
      // setIsLoading(false); // Removed to prevent ending loading too early
    }
  };

  const handleUniversitySelect = (university: University | null) => {
  if (!university) {
    setSelectedUniversity(null);
    return;
  }

  setSelectedUniversity(university);
  setMessages([]);
  setError(null);
};

  return {
    selectedUniversity,
    messages,
    isLoading,
    error,
    handleSend,
    handleUniversitySelect
  };
}