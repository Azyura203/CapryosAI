/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPENAI_CONFIG } from './config';
import i18n from '../../i18n/config';
import universityData from '../../data/universities.json';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function callOpenAI(messages: { role: string; content: string }[]) {
  // API temporarily disabled for development
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        "🤖 **Welcome to Capryos AI!** \n\nI'm your intelligent assistant, ready to help you explore educational opportunities and answer your questions. \n\n**What I can help you with:**\n- Program information and requirements\n- Admission guidance\n- Course details and curriculum\n- Career prospects\n- Application processes\n\nFeel free to ask me anything about your educational journey!",
        "✨ **Great question!** \n\nI'd be happy to provide you with detailed information about our programs. Here are some key highlights:\n\n**🎓 Available Programs:**\n- Engineering & Technology\n- Computer Science & IT\n- Business & Management\n- Digital Innovation\n\n**📋 Entry Requirements:**\n- Academic qualifications vary by program\n- English proficiency requirements\n- Portfolio submissions for certain courses\n\nWould you like more specific information about any particular program?",
        "🌟 **Excellent choice!** \n\nOur programs are designed with industry needs in mind. Here's what makes us special:\n\n**🚀 Key Features:**\n- Cutting-edge curriculum\n- Industry partnerships\n- Hands-on learning approach\n- Global recognition\n- Career support services\n\n**💼 Career Outcomes:**\n- High employment rates\n- Competitive salaries\n- Industry connections\n- Continuous learning opportunities\n\nLet me know if you'd like to explore specific career paths!",
        "📚 **Program Details** \n\nI can provide comprehensive information about:\n\n**Duration & Structure:**\n- Flexible learning schedules\n- Full-time and part-time options\n- Online and on-campus delivery\n\n**Costs & Financial Aid:**\n- Competitive tuition fees\n- Scholarship opportunities\n- Payment plan options\n- Financial assistance programs\n\n**Support Services:**\n- Academic mentoring\n- Career counseling\n- Student support services\n\nWhat specific aspect would you like to know more about?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      resolve(randomResponse);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  });
}