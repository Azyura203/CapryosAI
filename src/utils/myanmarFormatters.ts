// Utility functions for Myanmar-specific formatting
export const myanmarFormatters = {
  // Format currency in Myanmar style
  formatCurrency: (amount: number): string => {
    return `${amount.toLocaleString('my-MM')} ကျပ်`;
  },

  // Format date in Myanmar style
  formatDate: (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year} ခုနှစ် ${month} လ ${day} ရက်`;
  },

  // Format academic terms
  formatAcademicTerm: (term: string): string => {
    const terms: Record<string, string> = {
      'semester': 'စာသင်နှစ်ဝက်',
      'year': 'စာသင်နှစ်',
      'term': 'သင်တန်း',
    };
    return terms[term.toLowerCase()] || term;
  },

  // Format qualification levels
  formatQualification: (level: string): string => {
    const levels: Record<string, string> = {
      'certificate': 'အောင်လက်မှတ်',
      'diploma': 'ဒီပလိုမာ',
      'degree': 'ဘွဲ့',
      'master': 'မဟာဘွဲ့',
      'doctorate': 'ပါရဂူဘွဲ့',
    };
    return levels[level.toLowerCase()] || level;
  },
  // Interpret Myanmar academic or qualification terms into English
  interpretMyanmarTerm: (term: string): string => {
    const academicTerms: Record<string, string> = {
      'စာသင်နှစ်ဝက်': 'semester',
      'စာသင်နှစ်': 'year',
      'သင်တန်း': 'term',
    };
    const qualificationLevels: Record<string, string> = {
      'အောင်လက်မှတ်': 'certificate',
      'ဒီပလိုမာ': 'diploma',
      'ဘွဲ့': 'degree',
      'မဟာဘွဲ့': 'master',
      'ပါရဂူဘွဲ့': 'doctorate',
    };
    return (
      academicTerms[term] ||
      qualificationLevels[term] ||
      term
    );
  },
};