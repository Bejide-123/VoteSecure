import { motion } from "framer-motion";
import { Shield, Zap, Users, Lock, Cpu, Vote } from "lucide-react";
import type { JSX } from "react";

type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "End-to-End Encryption",
    description:
      "Every vote is securely encrypted from the moment it’s cast until the final tally — no tampering, no leaks.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI Fraud Detection",
    description:
      "Smart AI algorithms monitor vote patterns and flag suspicious activities in real time.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Multi-User Access",
    description:
      "Supports admins, voters, and observers — each with secure, role-based access control.",
  },
  {
    icon: <Vote className="w-8 h-8" />,
    title: "Instant Results",
    description:
      "Votes are counted instantly and transparently, giving you fast, verifiable results.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Immutable Records",
    description:
      "Once submitted, votes are locked in blockchain-like storage — impossible to alter.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Performance",
    description:
      "Optimized for speed and reliability, even under heavy election-day traffic.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* ===== Section Header ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Powered by AI. Built for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Transparency.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Advanced technology meets democratic values. Here's how VoteSecure
            transforms elections.
          </motion.p>
        </div>

        {/* ===== Features Grid ===== */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group bg-white dark:bg-gray-900/60 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/20 w-16 h-16 rounded-xl flex items-center justify-center text-blue-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
