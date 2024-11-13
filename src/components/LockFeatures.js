import React from 'react';

const offers = [
  {
    title: 'Savings & Investment',
    description: 'Secure your savings for the future with a wallet that ensures you save without temptation.',
    icon: '💰',
    color: 'bg-gradient-to-r from-blue-500 to-teal-400',
  },
  {
    title: 'Education Fund',
    description: 'Ensure your child\'s education is taken care of. Start saving today for their bright tomorrow.',
    icon: '🎓',
    color: 'bg-gradient-to-r from-purple-500 to-pink-400',
  },
  {
    title: 'Emergency Fund',
    description: 'Create a secure financial safety net you can\'t touch, ensuring you\'re ready for life\'s surprises.',
    icon: '🚑',
    color: 'bg-gradient-to-r from-green-500 to-yellow-400',
  },
  {
    title: 'Incentivized Long-Term Savings',
    description: 'Offer your employees a retirement plan they can\'t withdraw prematurely, ensuring their financial future.',
    icon: '📅',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
  },
  {
    title: 'Charitable Giving',
    description: 'Give with purpose. Lock your donations to ensure they\'re used exactly as intended.',
    icon: '💖',
    color: 'bg-gradient-to-r from-red-500 to-orange-400',
  },
  {
    title: 'Freelancer & Contractor Payments',
    description: 'Secure payments for freelancers and contractors, ensuring both parties meet expectations before funds are released.',
    icon: '👩‍💻',
    color: 'bg-gradient-to-r from-teal-500 to-cyan-400',
  },
  {
    title: 'Youth & Student Savings',
    description: 'Empower the youth to save and unlock their potential. Plan for your future today!',
    icon: '👦',
    color: 'bg-gradient-to-r from-yellow-500 to-amber-400',
  },
  {
    title: 'Business & Tokenized Project Launches',
    description: 'Secure your business funds until it\'s time to make your project a reality.',
    icon: '🏢',
    color: 'bg-gradient-to-r from-indigo-600 to-blue-600',
  },
  {
    title: 'Escrow & Dispute Resolution',
    description: 'Safeguard your transactions. Funds are only released when both parties are happy.',
    icon: '⚖️',
    color: 'bg-gradient-to-r from-gray-500 to-black',
  },
  {
    title: 'Health & Emergency Savings',
    description: 'Prepare for your health emergencies without dipping into your regular funds. Secure your future health needs!',
    icon: '💊',
    color: 'bg-gradient-to-r from-pink-500 to-red-500',
  },
  {
    title: 'Personal Milestones (Weddings, Birthdays)',
    description: 'Save for life’s big moments. Lock away funds for your wedding or birthday celebrations, ensuring everything is covered!',
    icon: '🎉',
    color: 'bg-gradient-to-r from-teal-500 to-green-400',
  },
];

const TimeLockedWalletOffers = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">Unlock Your Future with Time-Locked Wallets</h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Secure your financial goals with discipline and foresight. Whether it’s personal milestones or business ventures, lock in your future today.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all hover:scale-105 duration-300">
            <div className={`${offer.color} p-8 text-white`}>
              <div className="text-6xl mb-4">{offer.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{offer.title}</h3>
              <p className="text-lg mb-6">{offer.description}</p>
              <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg transition-all duration-300 hover:bg-white hover:text-gray-800 hover:border-gray-800">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLockedWalletOffers;

