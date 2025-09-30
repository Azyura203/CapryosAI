import React from 'react';
import { GraduationCap, Globe, Users, Clock, BookOpen, Award, Sparkles, Star } from 'lucide-react';

export function LandingHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16 sm:py-24">
      {/* Enhanced Animated Background Grid */}
      <div className="absolute inset-0">
        {/* Primary Grid Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[length:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse" />
        
        {/* Secondary Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[length:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_60%,transparent_100%)] opacity-60" />
        
        {/* Floating Dots Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(20,184,166,0.2)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[length:3rem_3rem] animate-float" />
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 animate-pulse" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-soft-light" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Icon with Enhanced Effects */}
          <div className="relative inline-block animate-float mb-8">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 blur-2xl opacity-75 animate-glow" />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 blur-xl opacity-50 animate-pulse" />
            <div className="relative p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-2xl border border-white/20">
              <GraduationCap className="h-20 w-20 text-white drop-shadow-lg" />
              <div className="absolute top-2 right-2">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Enhanced Gradient Heading */}
          <h1 className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-7xl animate-fade-in leading-tight">
            Your Educational Journey 
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          
          {/* Enhanced Subheading */}
          <p className="mt-8 text-xl leading-8 text-gray-300 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Discover world-class programs at top universities in 
            <span className="text-teal-400 font-semibold"> Singapore</span>, 
            <span className="text-cyan-400 font-semibold"> Myanmar</span>, and the 
            <span className="text-blue-400 font-semibold"> UK</span>. 
            Get instant answers about courses, requirements, and admissions.
          </p>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-20 flow-root sm:mt-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <Feature 
              icon={Globe} 
              title="Global Education" 
              description="Access international education opportunities across three countries"
              delay="0.3s"
              gradient="from-emerald-500 to-teal-500"
            />
            <Feature 
              icon={Users} 
              title="Expert Support" 
              description="Get personalized guidance from university experts and advisors"
              delay="0.4s"
              gradient="from-blue-500 to-cyan-500"
            />
            <Feature 
              icon={Clock} 
              title="Instant Answers" 
              description="Quick AI-powered responses to all your university questions"
              delay="0.5s"
              gradient="from-purple-500 to-pink-500"
            />
            <Feature 
              icon={Award} 
              title="Accredited Programs" 
              description="Study internationally recognized degrees and certifications"
              delay="0.6s"
              gradient="from-orange-500 to-red-500"
            />
            <Feature 
              icon={BookOpen} 
              title="Diverse Courses" 
              description="Choose from engineering, business, IT, and many more fields"
              delay="0.7s"
              gradient="from-indigo-500 to-purple-500"
            />
            <Feature 
              icon={Star} 
              title="Success Stories" 
              description="Join thousands of successful graduates worldwide"
              delay="0.8s"
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 sm:mt-32 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Statistic number="10,000+" label="Students Enrolled" />
            <Statistic number="50+" label="Programs Available" />
            <Statistic number="3" label="Countries" />
            <Statistic number="95%" label="Graduate Success Rate" />
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
  gradient = "from-teal-500 to-cyan-500"
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
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300 animate-glow`} />
      
      {/* Feature Card */}
      <div className="relative p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 group-hover:border-teal-400/50 h-full">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Enhanced Icon with Multiple Layers */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
            <div className={`relative p-4 bg-gradient-to-r ${gradient} rounded-full shadow-lg group-hover:shadow-xl transition-shadow`}>
              <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            </div>
          </div>
          
          {/* Title and Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-teal-300 transition-colors">{title}</h3>
            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{description}</p>
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
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <div className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
}