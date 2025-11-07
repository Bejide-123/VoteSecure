import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap,
  Shield,
  Crown,
  ArrowRight,
  HelpCircle
} from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface PricingFeature {
  text: string;
  highlighted?: boolean;
}

interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  color: string;
  icon: React.ReactNode;
  badge?: string;
  buttonText: string;
}

const PricingSection: React.FC = () => {
  // ===== STATE =====
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // ===== DATA =====
  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      tagline: "Perfect for small organizations",
      price: "₦0",
      period: "forever",
      features: [
        { text: "Up to 500 voters per election" },
        { text: "2 elections per year" },
        { text: "Basic analytics dashboard" },
        { text: "Email support (48h response)" },
        { text: "Community forum access" },
        { text: "Standard security features" }
      ],
      color: "from-gray-500 to-gray-600",
      icon: <Zap className="w-6 h-6" />,
      buttonText: "Start Free"
    },
    {
      name: "Professional",
      tagline: "Most popular for schools",
      price: billingCycle === 'monthly' ? "₦50,000" : "₦500,000",
      period: billingCycle === 'monthly' ? "per election" : "per year",
      features: [
        { text: "Unlimited voters", highlighted: true },
        { text: "Unlimited elections", highlighted: true },
        { text: "AI fraud detection", highlighted: true },
        { text: "Advanced analytics & reports" },
        { text: "Custom branding (logo, colors)" },
        { text: "Priority support (12h response)" },
        { text: "Face verification included" },
        { text: "SMS notifications" }
      ],
      isPopular: true,
      color: "from-blue-600 to-green-600",
      icon: <Crown className="w-6 h-6" />,
      badge: "Most Popular",
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      tagline: "For large organizations",
      price: "Custom",
      period: "pricing",
      features: [
        { text: "Everything in Professional" },
        { text: "Dedicated account manager" },
        { text: "Custom AI integrations" },
        { text: "On-premise deployment option" },
        { text: "24/7 priority support" },
        { text: "SLA guarantees (99.99%)" },
        { text: "Training & onboarding" },
        { text: "API access" }
      ],
      color: "from-purple-600 to-pink-600",
      icon: <Shield className="w-6 h-6" />,
      badge: "Custom",
      buttonText: "Contact Sales"
    },
  ];

  return (
    <section 
      id="pricing" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-950 overflow-hidden transition-colors duration-300"
    >
      {/* ===== BACKGROUND DECORATIONS ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5 animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* ===== SECTION HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border border-purple-200 dark:border-purple-800 px-4 py-2 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-900 dark:text-white">
              Simple Pricing.
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:to-green-400 bg-clip-text text-transparent animate-gradient">
              No Hidden Fees.
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Choose the plan that fits your organization's voting needs. All plans include fraud detection and instant results.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`
                px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300
                ${billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              Per Election
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`
                relative px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300
                ${billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              Annual
              {billingCycle === 'annual' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ===== PRICING CARDS ===== */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`
                group relative
                ${plan.isPopular ? 'lg:scale-105 lg:z-10' : ''}
              `}
            >
              {/* Glow effect on hover */}
              <div className={`
                absolute -inset-0.5 bg-gradient-to-br ${plan.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500
                ${plan.isPopular ? 'opacity-20' : ''}
              `} />

              {/* Card */}
              <div className={`
                relative h-full bg-white dark:bg-gray-900 p-8 rounded-3xl border transition-all duration-300
                ${plan.isPopular 
                  ? 'border-blue-500 dark:border-blue-600 shadow-2xl' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }
                hover:shadow-2xl
              `}>
                
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`
                      px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg
                      bg-gradient-to-r ${plan.color}
                    `}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  inline-flex p-3 rounded-2xl mb-6
                  bg-gradient-to-br ${plan.color}
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                  shadow-lg
                `}>
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </div>

                {/* Plan Name & Tagline */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`
                      text-4xl font-extrabold
                      bg-gradient-to-r ${plan.color} bg-clip-text text-transparent
                    `}>
                      {plan.price}
                    </span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-600 dark:text-gray-400">
                        / {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.period === 'forever' && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Free forever, no credit card required
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className={`
                        flex items-start gap-3 text-sm
                        ${feature.highlighted ? 'font-semibold' : ''}
                      `}
                    >
                      <div className={`
                        flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                        ${feature.highlighted 
                          ? `bg-gradient-to-br ${plan.color}` 
                          : 'bg-green-100 dark:bg-green-900/30'
                        }
                      `}>
                        <Check className={`
                          w-3.5 h-3.5
                          ${feature.highlighted ? 'text-white' : 'text-green-600 dark:text-green-400'}
                        `} />
                      </div>
                      <span className={`
                        ${feature.highlighted 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-600 dark:text-gray-400'
                        }
                      `}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`
                  group/btn w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2
                  ${plan.isPopular
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105'
                    : 'border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}>
                  {plan.buttonText}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="mt-16 sm:mt-20">
          {/* FAQ Prompt */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mb-4">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team can help you choose the perfect plan for your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 cursor-pointer rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                Schedule a Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                View FAQ
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span>No setup fees</span>
            </div>
          </div>
        </div>
      </div>

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

export default PricingSection;