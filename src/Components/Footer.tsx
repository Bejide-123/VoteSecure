import React, { useState } from 'react';
import { 
  Vote, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Github
} from "lucide-react";

// ===== TYPE DEFINITIONS =====
interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  // ===== STATE =====
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== DATA =====
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#security" },
        { name: "Live Demo", href: "#demo" },
        { name: "API Docs", href: "#api" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Tutorials", href: "#tutorials" },
        { name: "Case Studies", href: "#cases" },
        { name: "Community", href: "#community" },
        { name: "Status", href: "#status" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "NDPR Compliance", href: "#ndpr" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Licenses", href: "#licenses" }
      ]
    }
  ];

  const socialLinks = [
    { Icon: Twitter, href: "https://twitter.com/votesecure", label: "Twitter" },
    { Icon: Facebook, href: "https://facebook.com/votesecure", label: "Facebook" },
    { Icon: Linkedin, href: "https://linkedin.com/company/votesecure", label: "LinkedIn" },
    { Icon: Instagram, href: "https://instagram.com/votesecure", label: "Instagram" },
    { Icon: Github, href: "https://github.com/votesecure", label: "GitHub" }
  ];

  // ===== EVENT HANDLERS =====
  const handleNewsletterSubmit = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (replace with real API later)
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 text-gray-700 dark:text-gray-300 overflow-hidden transition-colors duration-300">
      {/* ===== BACKGROUND PATTERN ===== */}
      {/* Light mode: subtle blue/green tint */}
      {/* Dark mode: glowing effect */}
      <div className="absolute inset-0 opacity-30 dark:opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 dark:bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== TOP SECTION (Newsletter + Brand) ===== */}
        <div className="pt-16 pb-12 border-b border-gray-200 dark:border-gray-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Brand + Description */}
            <div>
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Vote className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VoteSecure
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed max-w-md">
                Transforming democracy with secure, transparent, and AI-powered digital voting for schools and organizations across Nigeria.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:hello@votesecure.ng" 
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">hello@votesecure.ng</span>
                </a>
                
                <a 
                  href="tel:+2348012345678" 
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+234 801 234 5678</span>
                </a>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Signup */}
            <div className="lg:pl-12">
              <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  Get the latest news, updates, and exclusive content delivered to your inbox.
                </p>

                {isSubscribed ? (
                  // Success Message
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Successfully subscribed! Check your inbox.
                    </span>
                  </div>
                ) : (
                  // Newsletter Input
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      onClick={handleNewsletterSubmit}
                      disabled={isSubmitting}
                      className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 cursor-pointer">
                          <Send className="w-5 h-5" />
                          <span className="hidden sm:inline">Subscribe</span>
                        </span>
                      )}
                    </button>
                  </div>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MIDDLE SECTION (Links) ===== */}
        <div className="py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-gray-900 dark:text-white font-bold mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-4 transition-all duration-300" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM SECTION (Social + Copyright) ===== */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-green-600 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 dark:text-gray-500">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  VoteSecure
                </span>
                . All rights reserved.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-600 mt-1">
                Built with 💚 in Nigeria for Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* ===== TRUST BADGES ===== */}
        <div className="pb-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 dark:opacity-50">
            <div className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>NDPR Compliant</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>256-bit Encryption</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;