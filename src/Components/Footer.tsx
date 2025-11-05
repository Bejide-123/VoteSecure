import { Vote, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* ===== Top Section ===== */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                VoteSecure
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Bringing secure, transparent, AI-powered voting to Nigerian schools
              and organizations.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-green-600 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors">
                  NDPR Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-center pb-0 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              VoteSecure
            </span>
            . All rights reserved. Built with 💚 in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
