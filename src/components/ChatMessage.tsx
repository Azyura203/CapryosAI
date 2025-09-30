import React, { useMemo } from 'react';
import { MessageSquare, Bot, Volume2, Copy, Check } from 'lucide-react';
import { Message } from '../types/chat';
import { clsx } from 'clsx';
import { formatMarkdown } from '../utils/formatMarkdown';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { textToSpeech } from '../utils/textToSpeech';
import { useTranslation } from 'react-i18next';

interface ChatMessageProps {
  message: Message;
  index: number;
  totalMessages: number;
  originalEnglish?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, index, totalMessages }) => {
  const isUser = message.role === 'user';
  const { i18n } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const isLastAssistant = message.role === 'assistant' && index === totalMessages - 1;
  const typingEffectText = useTypingEffect(message.content, isLastAssistant, 450);
  const displayText = isUser ? message.content : typingEffectText;
  const formattedContent = useMemo(() => formatMarkdown(displayText), [displayText]);

  const isLikelyMixedLanguage = useMemo(() => {
    if (i18n.language === 'my') {
      return /[a-zA-Zก-๙]/.test(displayText);
    }
    return false;
  }, [displayText, i18n.language]);

  const handleSpeak = () => {
    textToSpeech(message.content, i18n.language);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-4 w-full animate-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 relative">
          <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      )}

      <div
        className={clsx(
          'relative max-w-[75%] break-words',
          isUser ? 'order-1' : 'order-2'
        )}
      >
        {/* Message Bubble */}
        <div
          lang={i18n.language}
          className={clsx(
            'px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl',
            isUser 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-400/30 ml-auto' 
              : 'bg-white/10 text-gray-100 border-white/20 mr-auto'
          )}
          style={{
            fontFamily:
              i18n.language === 'my'
                ? '"Noto Sans Myanmar", "Myanmar3", "Padauk", "Tharlon", sans-serif'
                : undefined,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            lineHeight: 1.8,
          }}
        >
          {formattedContent}
          
          {!isUser && i18n.language === 'my' && (
            <div className="mt-3 text-xs">
              <span className={clsx(
                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
                isLikelyMixedLanguage 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              )}>
                {isLikelyMixedLanguage ? '⚠️ Mixed Language' : '✔️ Burmese'}
              </span>
            </div>
          )}
          
          {!isUser && i18n.language === 'my' && message.originalEnglish && (
            <div className="mt-3 p-3 bg-black/20 rounded-xl border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Original (English):</div>
              <div className="text-sm text-gray-300 italic">{message.originalEnglish}</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-3 ml-2">
            <button
              onClick={handleSpeak}
              className="group p-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 hover:border-teal-400/50 transition-all duration-200"
              title="Listen to response"
            >
              <Volume2 className="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors" />
            </button>
            
            <button
              onClick={handleCopy}
              className="group p-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 hover:border-teal-400/50 transition-all duration-200"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors" />
              )}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 relative order-2">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <MessageSquare className="w-6 h-6 text-teal-400" />
          </div>
        </div>
      )}
    </div>
  );
};