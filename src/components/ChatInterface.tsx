import { Message, University } from '../types/chat';
import { ChatContainer } from './ChatContainer';
import { UniversitySelector } from './UniversitySelector';
import { ConsultationButton } from './ConsultationButton';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface ChatInterfaceProps {
  selectedUniversity: University | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onUniversitySelect: (university: University | null) => void;
  universities: University[];
}

export function ChatInterface({
  selectedUniversity,
  messages,
  isLoading,
  error,
  onSend,
  onUniversitySelect,
  universities,
}: ChatInterfaceProps) {
  return (
    <div className="w-full px-4 py-8 mt-8 min-h-[600px]">
      <div className="relative bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl border border-purple-500/30">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 opacity-60" />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[length:2rem_2rem] animate-pulse" />
          
          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/15 to-purple-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Radial gradient spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
        </div>

        {/* Enhanced Header Section */}
        <div className="relative p-8 bg-gradient-to-r from-slate-800/80 via-purple-800/80 to-slate-800/80 backdrop-blur-sm border-b border-purple-600/30">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                    Capryos AI Assistant
                  </h2>
                  <p className="text-purple-200 text-lg flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Intelligent Educational Guidance
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
            {selectedUniversity && (
              <div className="hidden md:block">
                <ConsultationButton universityName={selectedUniversity.name} />
              </div>
            )}
          </div>
        </div>

        {/* University Selector Section */}
        <UniversitySelector
          universities={universities}
          selectedUniversity={selectedUniversity}
          onSelect={onUniversitySelect}
        />

        {/* Chat Container Section */}
        <div className="relative">
          <ChatContainer
            selectedUniversity={selectedUniversity}
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={onSend}
          />
        </div>

        {/* Mobile Consultation Button */}
        {selectedUniversity && (
          <div className="md:hidden p-6 border-t border-purple-600/30 bg-slate-800/50">
            <ConsultationButton universityName={selectedUniversity.name} />
          </div>
        )}
      </div>
    </div>
  );
}