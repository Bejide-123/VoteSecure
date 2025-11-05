import { ArrowRight, CheckCircle, Shield, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "500K+", label: "Verified Voters" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "1.2M+", label: "Votes Cast Digitally" },
  { value: "36", label: "States Covered" },
];

const HeroSection = () => {
  return (
    <>
      {/* ===== SPACER ===== */}
      <div className="h-4" />

      {/* ===== HERO SECTION ===== */}
      <section
        className="
          relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 
          bg-gradient-to-b from-gray-50 to-white 
          text-gray-900 
          dark:from-gray-950 dark:via-gray-900 dark:to-black 
          dark:text-white 
          overflow-hidden
        "
      >
        {/* Decorative background gradient / pattern */}
        <div
          className="absolute inset-0 
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
          from-blue-100/40 via-transparent to-transparent 
          dark:from-blue-900/20 
          pointer-events-none
        "
        ></div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              inline-flex items-center gap-2 
              bg-blue-100 text-blue-700 
              dark:bg-blue-950/40 dark:text-blue-400 
              px-4 py-2 rounded-full text-sm font-semibold mb-6
            "
          >
            <Zap className="w-4 h-4" />
            AI-Powered Digital Voting for Nigerian Schools
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="
              text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight
            "
          >
            End Electoral Fraud.{" "}
            <span
              className="
              bg-gradient-to-r from-blue-600 to-green-600 
              dark:from-blue-500 dark:to-green-500 
              bg-clip-text text-transparent
            "
            >
              Vote Digitally.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="
              text-lg sm:text-xl 
              text-gray-600 dark:text-gray-400 
              mb-10 max-w-2xl mx-auto leading-relaxed
            "
          >
            VoteSecure brings secure, transparent, AI-assisted voting to schools
            and organizations. No more ballot box snatching. No more rigging.
            Just fair, fast, fraud-free elections.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              className=" cursor-pointer
                group bg-gradient-to-r from-blue-600 to-green-600 
                text-white px-8 py-4 rounded-xl font-bold text-lg 
                hover:shadow-xl hover:scale-105 
                transition-all duration-200 flex items-center justify-center gap-2
              "
            >
              Schedule a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="
                bg-white text-gray-700 border-2 border-gray-200 
                hover:border-blue-600 hover:text-blue-600 
                dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 
                dark:hover:border-blue-500 dark:hover:text-blue-400 
                px-8 py-4 rounded-xl font-bold text-lg 
                transition-all duration-200
              "
            >
              Watch Video
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="
              mt-14 flex flex-wrap justify-center gap-8 text-sm 
              text-gray-500 dark:text-gray-400
            "
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span>INEC Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>50+ Schools</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
