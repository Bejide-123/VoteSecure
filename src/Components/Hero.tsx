import React from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Users, 
  Zap,
  Play,
  Star,
  TrendingUp,
  Lock,
  Clock,
  Award
} from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TrustBadge {
  icon: React.ReactNode;
  text: string;
  color: string;
}

const HeroSection: React.FC = () => {
  // ===== DATA =====
  const stats: Stat[] = [
    { 
      value: "500K+", 
      label: "Verified Voters",
      icon: <Users className="w-6 h-6" />
    },
    { 
      value: "99.9%", 
      label: "Uptime SLA",
      icon: <TrendingUp className="w-6 h-6" />
    },
    { 
      value: "1.2M+", 
      label: "Votes Secured",
      icon: <Lock className="w-6 h-6" />
    },
    { 
      value: "<2min", 
      label: "Average Vote Time",
      icon: <Clock className="w-6 h-6" />
    },
  ];

  const trustBadges: TrustBadge[] = [
    { 
      icon: <CheckCircle className="w-5 h-5" />, 
      text: "INEC Compliant",
      color: "text-green-600 dark:text-green-500"
    },
    { 
      icon: <Shield className="w-5 h-5" />, 
      text: "Bank-Grade Security",
      color: "text-blue-600 dark:text-blue-500"
    },
    { 
      icon: <Award className="w-5 h-5" />, 
      text: "ISO 27001 Certified",
      color: "text-purple-600 dark:text-purple-400"
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      text: "50+ Schools Trust Us",
      color: "text-orange-600 dark:text-orange-400"
    },
  ];

  return (
    <>
      {/* ===== NAVBAR SPACER ===== */}
      <div className="h-16" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 overflow-hidden transition-colors duration-300">
        
        {/* ===== ANIMATED BACKGROUND PATTERN ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Blobs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 dark:opacity-10 animate-blob" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          
          {/* ===== TOP BADGE ===== */}
          <div className="flex justify-center mb-8">
            <div className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-400 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-100/50 dark:shadow-blue-900/30">
              <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              <span>AI-Powered Digital Voting for Schools & Organizations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* ===== MAIN HEADLINE ===== */}
          <div className="text-center max-w-5xl mx-auto mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              <span className="text-gray-900 dark:text-white">
                End Electoral Fraud.
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 dark:from-blue-400 dark:via-blue-300 dark:to-green-400 bg-clip-text text-transparent animate-gradient">
                  Vote Digitally.
                </span>
                {/* Underline decoration */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 rounded-full opacity-30" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Secure, transparent, AI-powered voting for Nigerian schools and organizations. 
              <span className="font-semibold text-gray-700 dark:text-gray-300"> No more ballot box snatching.</span> 
              {" "}No more rigging. Just fair, fast, fraud-free elections.
            </p>

            {/* ===== CTA BUTTONS ===== */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              {/* Primary CTA */}
              <button className="group relative w-full sm:w-auto">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />
                
                {/* Button */}
                <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-200 flex items-center justify-center gap-2">
                  Schedule a Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Secondary CTA */}
              <button className="group w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* ===== SOCIAL PROOF LINE ===== */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {/* Star rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold text-gray-700 dark:text-gray-300">4.9/5</span>
              </div>
              
              <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
              
              {/* User avatars */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Trusted by <span className="font-bold">50+ schools</span>
                </span>
              </div>
            </div>
          </div>

          {/* ===== TRUST BADGES ===== */}
          <div className="flex flex-wrap justify-center gap-6 mt-16 mb-12">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="group flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <div className={`${badge.color} group-hover:scale-110 transition-transform`}>
                  {badge.icon}
                </div>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-16 sm:py-20 bg-white dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INLINE CSS FOR ANIMATIONS ===== */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </>
  );
};

export default HeroSection;