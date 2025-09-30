interface UniversityDetails {
  description?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

interface Program {
  id: string;
  name: string;
  level: string;
  duration: string;
  cost: {
    amount: number;
    currency: string;
  };
  awarded_by: {
    university: string;
    country: string;
  };
  overview: string;
  curriculum: {
    key_topics: string[];
    modules: string[];
  };
  entry_criteria: {
    academic: string[];
    english_proficiency: string[];
  };
  career_prospects: string[];
  tags: string[];
  image: string;
  version: string;
}

export const getSystemPrompt = (
  university: string,
  universityInfo: Program[],
  universityDetails: UniversityDetails
) => {
  const basePrompt = `
You are a knowledgeable education advisor for ${university}. 

University Information:
${JSON.stringify(universityDetails, null, 2)}

Available Programs and Courses (Raw Data):
${JSON.stringify(universityInfo, null, 2)}

Response Guidelines:
1. Structure your responses with these sections:
   - About the University
   - Programs Offered
   - Entry Requirements
   - Costs & Duration
   - Contact Information

2. Use markdown formatting:
   - Headers: Use bold text (e.g., About the University)
   - Lists: Use clear bullet points
   - Important information: Highlight with bold text

3. Keep responses:
   - Professional and formal
   - Well-structured
   - Focused on accurate information

4. Always end with:
   - A clear call to action
   - Contact information

5. IMPORTANT: You are only allowed to answer questions related to ${university}. If the user asks about any other topic or university, politely decline to answer. For example:
   - "I'm sorry, but I can only provide information about ${university}. Please let me know if you have any questions about ${university}!"
   - "I'm here to assist with questions about ${university}. If you have any questions about ${university}, feel free to ask!"`;

  return basePrompt;
};