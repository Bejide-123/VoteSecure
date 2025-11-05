import { motion } from "framer-motion";
import { UserCheck, Vote, BarChart } from "lucide-react";
import type { JSX } from "react";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: JSX.Element;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Register Voters",
    description:
      "Admins onboard eligible voters using verified school or organization data. Each voter gets a unique secure ID.",
    icon: <UserCheck className="w-8 h-8" />,
  },
  {
    number: 2,
    title: "Cast Your Vote",
    description:
      "Voters securely log in and cast their votes digitally — encrypted, anonymous, and tamper-proof.",
    icon: <Vote className="w-8 h-8" />,
  },
  {
    number: 3,
    title: "View Live Results",
    description:
      "Votes are tallied instantly and displayed transparently, ensuring fair and fraud-free outcomes.",
    icon: <BarChart className="w-8 h-8" />,
  },
];

const HowItWorksSection = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500"
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
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              From registration to results in three simple steps.
            </motion.p>
          </div>

          {/* ===== Steps ===== */}
          <motion.div
            className="grid md:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative pt-10 bg-white dark:bg-gray-900/60 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                {/* Number circle */}
                <div
                  className="
                  absolute -top-6 left-1/2 transform -translate-x-1/2
                  bg-gradient-to-br from-blue-600 to-green-600 text-white
                  w-12 h-12 rounded-full flex items-center justify-center
                  text-xl font-bold shadow-lg z-20
                "
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-4 mb-6 flex justify-center items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-green-400 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Step Info */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="
        relative overflow-hidden rounded-3xl p-12 text-center text-white
        bg-gradient-to-br from-blue-600 to-green-600
        dark:bg-gradient-to-br dark:from-blue-800 dark:to-green-700
        shadow-[0_0_50px_-12px_rgba(59,130,246,0.4)]
        dark:shadow-[0_0_40px_-10px_rgba(16,185,129,0.12)]
      "
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="
            absolute top-0 left-0 w-64 h-64 rounded-full
            -translate-x-1/2 -translate-y-1/2 blur-3xl
            bg-white/80 dark:bg-white/6
            opacity-10 dark:opacity-8
          "
                />
                <div
                  className="
            absolute bottom-0 right-0 w-96 h-96 rounded-full
            translate-x-1/3 translate-y-1/3 blur-3xl
            bg-white/80 dark:bg-white/6
            opacity-10 dark:opacity-6
          "
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Ready to Transform Your Elections?
                </h2>

                <p className="text-lg sm:text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
                  Join 50+ schools using VoteSecure for fair, fast, and
                  fraud-free elections.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className=" cursor-pointer
              bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg
              hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] hover:scale-105
              transition-all duration-200
              dark:bg-white/90 dark:text-blue-700
            "
                  >
                    Schedule Demo
                  </button>

                  <button
                    className="
              border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg
              hover:bg-white hover:text-blue-600 hover:shadow-[0_8px_25px_rgba(255,255,255,0.12)]
              transition-all duration-200
              dark:border-white/60 dark:hover:bg-white/10 dark:hover:text-blue-200
            "
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default HowItWorksSection;
