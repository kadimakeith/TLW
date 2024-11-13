import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldHalved, 
  faBoltLightning, 
  faGlobe,
  faArrowRight,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import FAQ from './FAQ';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-28 px-4 text-center relative overflow-hidden">
        <div className="relative z-2 mx-auto max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-shadow-md">
            Welcome to Locsafe
          </h1>
          <p className="text-lg text-indigo-100 mb-10 max-w-3xl mx-auto">
            Empowering Global Financial Freedom with Secure, Fast, and Borderless Transactions
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6">
            <Link to="/timelock">
              <button
                className="inline-flex items-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-full text-lg transition-transform duration-300 ease-in-out hover:translate-y-1 hover:shadow-lg"
                onMouseEnter={() => setIsHovered('cta')}
                onMouseLeave={() => setIsHovered('')}
              >
                Get Started
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className={`ml-2 transition-transform duration-300 ${isHovered === 'cta' ? 'transform translate-x-1' : ''}`}
                />
              </button>
            </Link>

            <Link to="/features">
              <button
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full text-lg transition-transform duration-300 ease-in-out hover:translate-y-1 hover:bg-white hover:text-blue-800"
                onMouseEnter={() => setIsHovered('learn-more')}
                onMouseLeave={() => setIsHovered('')}
              >
                Learn More
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className={`ml-2 transition-transform duration-300 ${isHovered === 'learn-more' ? 'transform translate-x-1' : ''}`}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: faShieldHalved,
            title: 'Secure Transactions',
            description: 'Blockchain technology ensures secure, transparent, and immutable transactions.'
          },
          {
            icon: faBoltLightning,
            title: 'Instant Transfers',
            description: 'Enjoy real-time transfers with low fees, ensuring your money moves as fast as you do.'
          },
          {
            icon: faGlobe,
            title: 'Global Accessibility',
            description: 'Transfer money worldwide, overcoming geographical barriers with ease.'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="p-8 text-center rounded-lg shadow-md bg-white cursor-pointer transform transition-all duration-300 hover:translate-y-1 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(`feature-${index}`)}
            onMouseLeave={() => setIsHovered('')}
          >
            <FontAwesomeIcon icon={feature.icon} className="text-blue-500 text-4xl mb-6" />
            <h2 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h2>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </section>

      <FAQ />

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-300 py-28 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates, promotions, and industry news.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mx-auto max-w-xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 text-lg outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-full text-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:bg-blue-600"
              onMouseEnter={() => setIsHovered('submit')}
              onMouseLeave={() => setIsHovered('')}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

