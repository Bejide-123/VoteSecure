import { motion } from "framer-motion";

type PricingPlan = {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₦0 / month",
    features: [
      "Up to 2 elections",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "₦2,500 / month",
    isPopular: true,
    features: [
      "Unlimited elections",
      "Advanced analytics dashboard",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Custom AI integrations",
      "Dedicated account manager",
      "On-premise deployment",
      "24/7 support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Simple, Transparent Pricing
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Choose the plan that fits your organization’s voting needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={`relative p-8 rounded-2xl shadow-lg border ${
                plan.isPopular
                  ? "border-blue-600 bg-white dark:bg-gray-900"
                  : "border-gray-200 dark:border-gray-800 bg-white/5 dark:bg-gray-900/20"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                {plan.price}
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center gap-2">
                    <span className="text-green-500">✔</span> {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-2 rounded-lg font-semibold transition ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                    : "border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {plan.isPopular ? "Get Started" : "Learn More"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
