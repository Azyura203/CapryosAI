export interface Program {
  name: string;
  cost: string;
  duration: string;
  highlights?: string[];
  entry_criteria?: {
    qualification: string[];
    english_proficiency: string;
  };
  courses?: {
    name: string;
    focus: string;
  }[];
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
}

export interface UniversityData {
  description: string;
  programs: Program[];
  contact: Contact;
}

export interface UniversityDataMap {
  [key: string]: UniversityData;
}