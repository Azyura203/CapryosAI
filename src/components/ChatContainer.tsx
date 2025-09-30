import React from 'react';
import { Message, University } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { PredefinedQuestions } from './PredefinedQuestions';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { Sparkles, RotateCcw, Trash2, GraduationCap, MessageCircle } from 'lucide-react';

interface ChatContainerProps {
  selectedUniversity: University | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
}

export function ChatContainer({
  selectedUniversity,
  messages,
  isLoading,
  error,
  onSend
}: ChatContainerProps) {
  const scrollRef = useAutoScroll<HTMLDivElement>([messages, error]);

  const [confirmAction, setConfirmAction] = React.useState<null | (() => void)>(null);
  const [confirmMessage, setConfirmMessage] = React.useState('');
  const [showConfirm, setShowConfirm] = React.useState(false);

  if (!selectedUniversity) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-8 text-center min-h-[500px] bg-gradient-to-br from-slate-800/30 to-purple-800/30 backdrop-blur-sm">
        <div className="relative">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
          
          {/* Main icon */}
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-full shadow-2xl border border-white/10">
            <Brain className="w-16 h-16 text-white" />
            <div className="absolute top-2 right-2">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Learn?
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed">
            Select an institution above to begin your personalized learning journey with Capryos AI
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span>Powered by advanced AI for intelligent educational guidance</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px] relative">
      <div className="relative bg-gradient-to-br from-slate-800/30 via-purple-800/20 to-slate-800/30 backdrop-blur-xl overflow-hidden">
        {/* Enhanced Header with University Info */}
        <div className="p-8 border-b border-purple-600/30 bg-gradient-to-r from-slate-800/60 to-purple-800/60 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-2xl blur-lg" />
              <div className="relative p-4 bg-gradient-to-r from-slate-700/80 to-purple-700/80 backdrop-blur-sm rounded-2xl border border-purple-500/30">
                <img
                  src={selectedUniversity.logo}
                  alt={selectedUniversity.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                Exploring {selectedUniversity.name}
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed">
                {selectedUniversity.description}
              </p>
            </div>
          </div>
        </div>

        {/* Predefined Questions Section */}
        <div className="p-8 border-b border-purple-600/30 bg-gradient-to-r from-slate-800/40 to-purple-800/40 backdrop-blur-sm">
          <PredefinedQuestions onSelect={onSend} />
        </div>

        {/* Chat Messages Section */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth min-h-[400px] max-h-[600px] custom-scrollbar"
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              index={index}
              totalMessages={messages.length}
            />
          ))}

          {error && (
            <div className="text-center p-8 bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-3xl border border-red-500/20 animate-shake">
              <div className="inline-flex items-center gap-3 text-red-300 mb-3">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="font-semibold text-lg">Error</span>
              </div>
              <p className="text-red-200 whitespace-pre-line text-lg">{error}</p>
              {error.includes('API key') && (
                <p className="mt-4 text-sm text-red-300/80">
                  Please ensure your OpenAI API key is properly configured.
                </p>
              )}
            </div>
          )}

          {messages.length === 0 && !error && (
            <div className="text-center space-y-8 py-20">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-full shadow-2xl">
                  <Sparkles className="w-12 h-12 text-white animate-bounce" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ask me about {selectedUniversity.name}!
                </h3>
                <p className="text-gray-300 text-lg">
                  Try one of the suggested questions above to get started
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm rounded-3xl border border-gray-500/30">
              <div className="flex-shrink-0 p-3 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full">
                <Sparkles className="w-6 h-6 text-teal-400 animate-spin" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-gray-300 text-lg">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Chat Input Section */}
        <div className="border-t border-gray-600/30 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm">
          {/* Quick Actions Toolbar */}
          <div className="px-8 py-4 border-b border-gray-600/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setConfirmMessage('Clear all messages?');
                    setConfirmAction(() => () => window.location.reload());
                    setShowConfirm(true);
                  }}
                  className="group flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/60 hover:to-gray-500/60 rounded-xl transition-all duration-200 border border-gray-500/30 hover:border-gray-400/50"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Clear</span>
                </button>

                <button
                  onClick={() => {
                    setConfirmMessage('Restart chat without changing university?');
                    setConfirmAction(() => () => window.location.reload());
                    setShowConfirm(true);
                  }}
                  className="group flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/60 hover:to-gray-500/60 rounded-xl transition-all duration-200 border border-gray-500/30 hover:border-gray-400/50"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  <span>Restart</span>
                </button>

                <button
                  onClick={() => {
                    setConfirmMessage('Go back to university selection?');
                    setConfirmAction(() => () => window.location.reload());
                    setShowConfirm(true);
                  }}
                  className="group flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/60 hover:to-gray-500/60 rounded-xl transition-all duration-200 border border-gray-500/30 hover:border-gray-400/50"
                >
                  <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Change University</span>
                </button>
              </div>

              <div className="text-sm text-gray-400">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-8">
            <ChatInput onSend={onSend} disabled={isLoading} />
          </div>
        </div>
      </div>

      {/* Enhanced Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-6 border border-gray-600/30">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">Confirm Action</h3>
              <p className="text-gray-300 text-lg">{confirmMessage}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  confirmAction?.();
                  setShowConfirm(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-3 bg-gradient-to-r from-gray-600/50 to-gray-500/50 text-white rounded-xl hover:from-gray-500/60 hover:to-gray-400/60 transition-all duration-200 border border-gray-400/30 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}