import React from 'react';
import { University } from '../types/chat';
import { Building2, Globe, GraduationCap, Award, CheckCircle, Sparkles } from 'lucide-react';

interface UniversitySelectorProps {
  universities: University[];
  selectedUniversity: University | null;
  onSelect: (university: University | null) => void;
}

export const UniversitySelector: React.FC<UniversitySelectorProps> = ({
  universities,
  selectedUniversity,
  onSelect,
}) => {
  return (
    <div className="p-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white">Choose Your University</h3>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Select a university to start exploring programs and opportunities with our AI assistant
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {universities.map((university, index) => (
          <button
            key={university.name}
            onClick={() => {
              console.log('University selected:', university.name);
              onSelect(null);
              setTimeout(() => {
                onSelect(university);
              }, 0);
            }}
            className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 transform hover:scale-105 overflow-hidden animate-fade-in ${
              selectedUniversity?.name === university.name
                ? 'border-teal-400 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 shadow-2xl shadow-teal-500/25'
                : 'border-gray-600/50 bg-gray-800/50 hover:border-teal-400/50 hover:bg-gray-700/50 backdrop-blur-sm'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.1),transparent_50%)]" />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-teal-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Content */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              {/* University Logo */}
              <div className="relative">
                <div className="w-24 h-20 bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-gray-600/30 group-hover:border-teal-400/50 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <img
                    src={university.logo}
                    alt={university.name}
                    className="h-16 max-w-[90px] object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {selectedUniversity?.name === university.name && (
                  <div className="absolute -top-2 -right-2 p-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* University Info */}
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
                  {university.name}
                </h4>
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {university.description}
                </p>
              </div>

              {/* Enhanced Feature Icons */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {[
                  { icon: Building2, color: 'from-blue-500 to-blue-600' },
                  { icon: Globe, color: 'from-green-500 to-green-600' },
                  { icon: GraduationCap, color: 'from-purple-500 to-purple-600' },
                  { icon: Award, color: 'from-orange-500 to-orange-600' }
                ].map(({ icon: Icon, color }, iconIndex) => (
                  <div 
                    key={iconIndex}
                    className={`p-2.5 bg-gradient-to-r ${color} rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    style={{ transitionDelay: `${iconIndex * 50}ms` }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedUniversity?.name === university.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-3xl animate-pulse border border-teal-400/30" />
              )}
            </div>

            {/* Enhanced Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          </button>
        ))}
      </div>
    </div>
  );
};