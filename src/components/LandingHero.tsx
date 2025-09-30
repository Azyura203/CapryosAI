import React from 'react';
import { Brain, Sparkles, Zap, Rocket, Star, Globe, Users, BookOpen } from 'lucide-react';

export function LandingHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-20 sm:py-32">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary Grid Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[length:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Particle Field */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-5xl text-center">
          {/* Animated Icon with Enhanced Effects */}
          <div className="relative inline-block animate-float mb-12">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 blur-3xl opacity-60 animate-glow" />
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 blur-xl opacity-40 animate-pulse" />
            <div className="relative p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-2xl border border-white/20">
              <Brain className="h-24 w-24 text-white drop-shadow-lg" />
              <div className="absolute top-3 right-3">
                <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
              <div className="absolute bottom-3 left-3">
                <Zap className="h-6 w-6 text-cyan-300 animate-bounce" />
              </div>
            </div>
          </div>
          
          {/* Enhanced Gradient Heading */}
          <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-8xl animate-fade-in leading-tight mb-8">
            Welcome to
            <span className="block mt-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Capryos AI
            </span>
          </h1>
          
          {/* Enhanced Subheading */}
          <p className="mt-8 text-2xl leading-10 text-purple-100 animate-fade-in max-w-4xl mx-auto font-light" style={{ animationDelay: '0.2s' }}>
            Experience the future of educational assistance with our 
            <span className="text-purple-300 font-semibold"> intelligent AI companion</span>. 
            Get instant, personalized guidance for your academic journey with 
            <span className="text-cyan-300 font-semibold"> cutting-edge technology</span>.
          </p>

          {/* Call to Action */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Your Journey
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-purple-100 font-semibold rounded-2xl border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:bg-white/20">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Learn More
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-32 flow-root">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <Feature 
              icon={Brain} 
              title="AI-Powered Intelligence" 
              description="Advanced machine learning algorithms provide personalized educational guidance"
              delay="0.3s"
              gradient="from-purple-500 to-pink-500"
            />
            <Feature 
              icon={Globe} 
              title="Global Opportunities" 
              description="Access worldwide educational programs and international partnerships"
              delay="0.4s"
              gradient="from-cyan-500 to-blue-500"
            />
            <Feature 
              icon={Users} 
              title="Expert Network" 
              description="Connect with education professionals and industry experts worldwide"
              delay="0.5s"
              gradient="from-pink-500 to-purple-500"
            />
            <Feature 
              icon={Zap} 
              title="Instant Responses" 
              description="Get immediate answers to your questions with lightning-fast AI processing"
              delay="0.6s"
              gradient="from-yellow-500 to-orange-500"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-32 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Statistic number="50K+" label="Students Helped" />
            <Statistic number="1000+" label="Programs Available" />
            <Statistic number="50+" label="Countries Covered" />
            <Statistic number="99%" label="Satisfaction Rate" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ 
  icon: Icon, 
  title, 
  description, 
  delay = "0s",
  gradient = "from-purple-500 to-pink-500"
}: { 
  icon: any; 
  title: string; 
  description: string;
  delay?: string;
  gradient?: string;
}) {
  return (
    <div 
      className="relative group transform transition-all duration-500 hover:scale-105 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      {/* Enhanced Gradient Background */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-500 animate-glow`} />
      
      {/* Feature Card */}
      <div className="relative p-8 bg-slate-800/60 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 group-hover:border-purple-400/40 h-full">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Enhanced Icon */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity`} />
            <div className={`relative p-4 bg-gradient-to-r ${gradient} rounded-full shadow-lg group-hover:shadow-xl transition-shadow`}>
              <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            </div>
          </div>
          
          {/* Title and Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">{title}</h3>
            <p className="text-sm text-purple-200 group-hover:text-purple-100 transition-colors leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Statistic({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center group">
      <div className="relative">
        <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <div className="mt-2 text-sm text-purple-200 group-hover:text-purple-100 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
}