import { Message } from '../types/chat';
import universityData from '../data/universities.json';
import { Program, UniversityDataMap } from '../types/university';
import { universityDetails } from '../data/universityDetails';
import { getSystemPrompt } from './openai/prompts';
import { callOpenAI } from './openai/api';

export async function getChatResponse(messages: Message[], university: string): Promise<string> {
  const data = universityData as unknown as UniversityDataMap;
  const universityInfo = data[university] as unknown as Program[];
  
  if (!universityInfo) {
    throw new Error(`No information found for university: ${university}`);
  }

  const details = universityDetails[university as keyof typeof universityDetails];
  
  try {
    const systemPrompt = getSystemPrompt(university, universityInfo, details);
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    return await callOpenAI(allMessages);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}