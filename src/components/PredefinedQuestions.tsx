import { 
  GraduationCap, 
  Clock, 
  DollarSign, 
  Mail, 
  BookOpen,
  Briefcase,
  Sparkles,
  Zap
} from 'lucide-react';

interface PredefinedQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  { 
    text: "Show me the list of available programs.", 
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-500",
    category: "Programs"
  },
  { 
    text: "What are the academic and English entry requirements?", 
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-500",
    category: "Requirements"
  },
  { 
    text: "What is the tuition cost and currency?", 
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
    category: "Costs"
  },
  { 
    text: "How long is each program?", 
    icon: Clock,
    gradient: "from-orange-500 to-red-500",
    category: "Duration"
  },
  { 
    text: "What are the career outcomes or job prospects?", 
    icon: Briefcase,
    gradient: "from-teal-500 to-cyan-500",
    category: "Career"
  },
  { 
    text: "How can I contact the university?", 
    icon: Mail,
    gradient: "from-violet-500 to-purple-500",
    category: "Contact"
  }
];

export function PredefinedQuestions({ onSelect }: PredefinedQuestionsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Quick Questions
          </h2>
          <p className="text-gray-300 text-lg">Get instant answers to common questions</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map(({ text, icon: Icon, gradient, category }, index) => (
          <button
            key={text}
            onClick={() => onSelect(text)}
            className="group relative p-6 bg-gradient-to-br from-gray-700/50 to-gray-600/50 hover:from-gray-600/60 hover:to-gray-500/60 backdrop-blur-sm rounded-2xl border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 text-left overflow-hidden transform hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Enhanced Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className={`flex-shrink-0 p-3 bg-gradient-to-r ${gradient} rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full">
                  {category}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-200 group-hover:text-white transition-colors duration-200 leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            </div>

            {/* Enhanced Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm -z-10`} />
          </button>
        ))}
      </div>
    </div>
  );
}