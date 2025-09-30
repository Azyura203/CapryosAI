/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPENAI_CONFIG } from './config';
import i18n from '../../i18n/config';
import universityData from '../../data/universities.json';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function callOpenAI(messages: { role: string; content: string }[]) {
  if (!OPENAI_API_KEY) {
    throw new Error(
      'OpenAI API key is not configured. Please add your API key to the .env file:\n' +
      'VITE_OPENAI_API_KEY=your_actual_api_key'
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Messages array is empty or not provided to OpenAI call.');
  }

  const currentLanguage = i18n.language;
  const systemMessage = messages[0];

  // Remove old language directive if exists
  systemMessage.content = systemMessage.content.replace(/\nIMPORTANT: You must respond ONLY in.*?[.]/g, '');

  // Append additional university details based on query content
  const appendDetails = (query: string) => {
    const austonMM = universityData['auston_myanmar'] as any;
    let details = '';

    if (query.includes('scholarship')) {
      if (Array.isArray(austonMM.scholarships)) {
        austonMM.scholarships.forEach((s: { name: string; description: string }) => {
          details += `\nScholarship Available: ${s.name} - ${s.description}`;
        });
      }
    }

    if (query.includes('event')) {
      austonMM.events?.forEach((e: { name: any; description: any; }) => {
        details += `\nUpcoming Event: ${e.name} - ${e.description}`;
      });
    }

    if (query.includes('campus')) {
      austonMM.campuses?.forEach((c: { name: any; address: any; }) => {
        details += `\nCampus Location: ${c.name} - ${c.address}`;
      });
    }

    return details;
  };

  systemMessage.content += appendDetails(systemMessage.content.toLowerCase());

  // Inject strict language rule
  if (currentLanguage === 'my') {
    systemMessage.content += `\n\nIMPORTANT: You must respond ONLY in Myanmar language (Burmese). Never mix languages. Use formal academic Burmese appropriate for university communication. Format all numbers, dates, and currencies in Myanmar format.`;
  } else if (currentLanguage === 'zh') {
    systemMessage.content += `\n\nIMPORTANT: You must respond ONLY in Simplified Chinese. Never mix languages. Use formal academic Chinese appropriate for university communication.`;
  } else {
    systemMessage.content += `\n\nIMPORTANT: You must respond ONLY in English. Never mix languages. Use formal academic English appropriate for university communication.`;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        ...OPENAI_CONFIG,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Received an empty response from OpenAI.');
    }

    return content.trim();
  } catch (err: any) {
    console.error("❌ OpenAI fetch failed:", err);
    return "⚠️ Sorry, I couldn't process your request right now. Please try again later.";
  }
}