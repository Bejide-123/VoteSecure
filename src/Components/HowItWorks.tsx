import React from 'react';
import { 
  UserCheck, 
  Vote, 
  BarChart,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  Sparkles
} from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const HowItWorksSection: React.FC = () => {
  // ===== DATA =====
  const steps: Step[] = [
    {
      number: 1,
      title: "Register Voters",
      description: "Admins onboard eligible voters using verified school or organization data. Each voter gets a unique secure ID with facial biometrics.",
      icon: <UserCheck className="w-8 h-8" />,
      details: [
        "Upload voter database (CSV/Excel)",
        "AI verifies student credentials",
        "Facial recognition enrollment"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      title: "Cast Your Vote",
      description: "Voters securely log in with face verification and cast their votes digitally — encrypted end-to-end, anonymous, and tamper-proof.",
      icon: <Vote className="w-8 h-8" />,
      details: [
        "Biometric login verification",
        "One vote per person enforced",
        "Real-time fraud detection active"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      number: 3,
      title: "View Live Results",
      description: "Votes are tallied instantly and displayed on transparent dashboards. Results are immutable and verifiable by anyone with audit access.",
      icon: <BarChart className="w-8 h-8" />,
      details: [
        "Results update in real-time",
        "Complete audit trail included",
        "Export reports instantly"
      ],
      color: "from-purple-500 to-purple-600"
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 overflow-hidden transition-colors duration-300"
    >
      {/* ===== BACKGROUND DECORATIONS ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5 animate-blob" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* ===== SECTION HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-900 dark:text-white">
              How It
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 dark:from-blue-400 dark:via-green-400 dark:to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            From registration to results in three simple steps. No technical knowledge required.
          </p>
        </div>

        {/* ===== STEPS WITH CONNECTING LINE ===== */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="max-w-5xl mx-auto px-20">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full opacity-20 dark:opacity-10" />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative h-full">
                  {/* Glow effect on hover */}
                  <div className={`
                    absolute -inset-0.5 bg-gradient-to-br ${step.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500
                  `} />

                  {/* Main card */}
                  <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-transparent hover:shadow-2xl transition-all duration-300">
                    
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`
                        w-14 h-14 rounded-full flex items-center justify-center
                        bg-gradient-to-br ${step.color}
                        shadow-lg group-hover:scale-110 transition-transform duration-300
                      `}>
                        <span className="text-2xl font-extrabold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="mt-8 mb-6 flex justify-center">
                      <div className={`
                        w-20 h-20 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br ${step.color}
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                        shadow-lg
                      `}>
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className="space-y-3 bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-950/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Step number decoration in corner */}
                    <div className="absolute bottom-4 right-4 text-6xl font-black text-gray-100 dark:text-gray-800 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Arrow between steps (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-20 -right-6 items-center justify-center w-12 h-12 z-20">
                    <ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== STATS BAR ===== */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { value: "<3min", label: "Setup Time", icon: <Zap className="w-5 h-5" /> },
            { value: "100%", label: "Accurate", icon: <CheckCircle2 className="w-5 h-5" /> },
            { value: "0", label: "Fraud Cases", icon: <Shield className="w-5 h-5" /> },
            { value: "50+", label: "Happy Schools", icon: <Users className="w-5 h-5" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <section id="contact" className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 dark:from-blue-700 dark:via-blue-600 dark:to-green-700 shadow-2xl">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Ready to get started?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Transform Your Elections Today
              </h2>

              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 50+ schools using VoteSecure for fair, fast, and fraud-free elections. See the difference in your next election.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Setup in 3 minutes</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative">
                  <div className="absolute -inset-0.5 bg-white rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    Schedule Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                  Contact Sales
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CSS FOR ANIMATIONS ===== */}
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

export default HowItWorksSection;