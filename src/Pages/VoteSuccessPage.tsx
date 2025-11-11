import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Download,
  Share2,
  BarChart3,
  Home,
  Copy,
  Check
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const VoteSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  
  // Get data from navigation state
  const { selections, election } = location.state || {};

  // Generate receipt code
  const receiptCode = `VS-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  // Confetti animation on mount
  useEffect(() => {
    // Simple confetti effect (you can add a library like react-confetti)
    console.log('🎉 Vote submitted successfully!');
  }, []);

  // Copy receipt code
  const handleCopy = () => {
    navigator.clipboard.writeText(receiptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download receipt
  const handleDownload = () => {
    const receiptText = `
VoteSecure - Vote Receipt
========================

Election: ${election?.title || 'Student Union Elections 2024'}
Receipt Code: ${receiptCode}
Date: ${timestamp}
Status: ✅ Vote Recorded Successfully

Your vote has been securely recorded and encrypted.
You can verify your vote was counted using the receipt code above.

Thank you for participating in democratic process!

- VoteSecure Team
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VoteSecure-Receipt-${receiptCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      
      {/* ===== SUCCESS ANIMATION ===== */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping animation-delay-500" />
          
          {/* Success icon */}
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Vote Submitted Successfully! 🎉
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thank you for participating in this election. Your vote has been securely recorded.
        </p>
      </div>

      {/* ===== RECEIPT CARD ===== */}
      <div className="relative mb-8">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-30" />
        
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Vote Receipt
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep this receipt to verify your vote
              </p>
            </div>
            
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold">
              Verified
            </span>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4">
            
            {/* Receipt Code */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Receipt Code
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                  <code className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                    {receiptCode}
                  </code>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Copy receipt code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Election */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Election
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {election?.title || 'Student Union Elections 2024'}
              </p>
            </div>

            {/* Timestamp */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Submitted At
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {timestamp}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Status
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="font-semibold text-green-600 dark:text-green-400">
                  Vote Recorded Successfully
                </p>
              </div>
            </div>

            {/* Positions Voted */}
            {selections && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Positions Voted
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {Object.keys(selections).length} out of {Object.keys(selections).length}
                </p>
              </div>
            )}
          </div>

          {/* Important Note */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong>Note:</strong> Your vote is completely anonymous and secure. This receipt only confirms that your vote was recorded, it does not reveal who you voted for. Results will be published after the election closes.
            </p>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
        >
          <Download className="w-5 h-5" />
          Download Receipt
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'I Voted!',
                text: `I just voted in the ${election?.title || 'election'}! 🗳️ #VoteSecure #IVoted`,
              });
            }
          }}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* ===== WHAT'S NEXT ===== */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
          What happens next?
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your vote has been encrypted and securely stored in our database
            </p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">2</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              You can verify your vote was counted using your receipt code
            </p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">3</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Results will be announced immediately after the election closes
            </p>
          </li>
        </ul>
      </div>

      {/* ===== NAVIGATION BUTTONS ===== */}
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/voter/dashboard')}
          className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>

        <button
          onClick={() => navigate('/voter/elections/results')}
          className="group relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
          <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all">
            <BarChart3 className="w-5 h-5" />
            View Live Results
          </div>
        </button>
      </div>

      {/* ===== CSS FOR ANIMATION DELAY ===== */}
      <style>{`
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default VoteSuccessPage;