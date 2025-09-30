import { Message, University } from '../types/chat';
import { ChatContainer } from './ChatContainer';
import { UniversitySelector } from './UniversitySelector';
import { ConsultationButton } from './ConsultationButton';

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
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl border border-gray-700/30">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 opacity-60" />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[length:2rem_2rem] animate-pulse" />
          
          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Radial gradient spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_70%)]" />
        </div>

        {/* Enhanced Header Section */}
        <div className="relative p-8 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 backdrop-blur-sm border-b border-gray-600/30">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                    University Assistant
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Get instant answers about programs, requirements, and more
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
          <div className="md:hidden p-6 border-t border-gray-600/30 bg-gray-800/50">
            <ConsultationButton universityName={selectedUniversity.name} />
          </div>
        )}
      </div>
    </div>
  );
}