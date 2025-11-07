import React, { useState } from 'react';
import { 
  Shield, 
  Zap,  
  Lock, 
  Cpu, 
  Vote,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  badge?: string;
}

const FeaturesSection: React.FC = () => {
  // State for featured card hover effect
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ===== DATA =====
  const features: Feature[] = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: "End-to-End Encryption",
      description: "Every vote is securely encrypted from the moment it's cast until the final tally. Bank-grade AES-256 encryption ensures no tampering, no leaks, ever.",
      color: "from-blue-500 to-blue-600",
      badge: "Military Grade"
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "AI Fraud Detection",
      description: "Smart AI algorithms monitor vote patterns 24/7 and flag suspicious activities in real-time. Machine learning adapts to new fraud attempts automatically.",
      color: "from-purple-500 to-purple-600",
      badge: "Powered by AI"
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Facial Recognition",
      description: "Biometric verification ensures only authorized voters can participate. Liveness detection prevents photo spoofing and deepfakes.",
      color: "from-green-500 to-green-600",
      badge: "99.9% Accurate"
    },
    {
      icon: <Vote className="w-7 h-7" />,
      title: "Instant Results",
      description: "Votes are counted instantly and transparently. Real-time dashboards show results as they happen, with full audit trails for verification.",
      color: "from-orange-500 to-orange-600",
      badge: "Real-Time"
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Immutable Records",
      description: "Once submitted, votes are locked in blockchain-inspired storage. Cryptographic hashing makes records impossible to alter or delete.",
      color: "from-red-500 to-red-600",
      badge: "Tamper-Proof"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Lightning Performance",
      description: "Optimized infrastructure handles 10,000+ simultaneous voters. CDN-backed delivery ensures fast loading even on 3G networks.",
      color: "from-yellow-500 to-yellow-600",
      badge: "99.9% Uptime"
    },
  ];

  return (
    <section 
      id="features" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300"
    >
      {/* ===== BACKGROUND DECORATIONS ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* ===== SECTION HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Cutting-Edge Technology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-900 dark:text-white">
              Powered by AI. Built for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 bg-clip-text text-transparent animate-gradient">
              Transparency.
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Advanced technology meets democratic values. Here's how VoteSecure transforms elections from risky to reliable.
          </p>
        </div>

        {/* ===== FEATURES GRID ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`
                absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500
              `} />

              {/* Card */}
              <div className="relative h-full bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-transparent hover:shadow-2xl transition-all duration-300">
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center
                    bg-gradient-to-br ${feature.color}
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                    shadow-lg
                  `}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Badge */}
                  {feature.badge && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {feature.badge}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base mb-4">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className={`
                  flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  ${hoveredIndex === index ? 'translate-x-0 cursor-pointer' : '-translate-x-2'}
                `}>
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border border-blue-200 dark:border-blue-800 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  Ready to see it in action?
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Book a personalized demo with our team
                </div>
              </div>
            </div>
            <button className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer animate-gradient">
              Schedule Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== CSS FOR GRID PATTERN ===== */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;