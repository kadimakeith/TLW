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

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState('');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    },
    hero: {
      backgroundColor: '#111827',
      padding: '120px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      position: 'relative',
      zIndex: '2',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '1.5rem',
      lineHeight: '1.2',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#e0e7ff',
      marginBottom: '2.5rem',
      maxWidth: '600px',
      margin: '0 auto 2.5rem'
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      color: '#1e3a8a',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontSize: '1.125rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    ctaButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)'
    },
    ctaIcon: {
      marginLeft: '0.5rem',
      transition: 'transform 0.3s ease'
    },
    features: {
      padding: '100px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    feature: {
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '1rem',
      transition: 'all 0.3s ease',
      background: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer'
    },
    featureHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    featureIcon: {
      fontSize: '2.5rem',
      color: '#3b82f6',
      marginBottom: '1.5rem'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: '1.6'
    },
    newsletter: {
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '80px 20px',
      textAlign: 'center'
    },
    newsletterContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    newsletterTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    newsletterDescription: {
      color: '#4b5563',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    newsletterForm: {
      display: 'flex',
      flexWrap: 'wrap', // Responsive wrapping for mobile
      gap: '1rem',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    input: {
      flex: '1',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      border: '2px solid #e5e7eb',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      minWidth: '0', // Allows the input to shrink on smaller screens
    },
    inputFocus: {
      borderColor: '#3b82f6'
    },
    submitButton: {
      backgroundColor: '#111827',
      color: '#ffffff',
      padding: '0.75rem 2rem',
      borderRadius: '9999px',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      flex: '0 1 100px' // Prevent the button from growing too large on smaller screens
    },
    submitButtonHover: {
      backgroundColor: '#2563eb',
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    setEmail('');
  };

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Welcome to Transpesa</h1>
          <p style={styles.subtitle}>
            Empowering Global Financial Freedom with Secure, Fast, and Borderless Transactions
          </p>
          <Link to="/timelock">
            <button 
              style={{
                ...styles.ctaButton,
                ...(isHovered === 'cta' ? styles.ctaButtonHover : {})
              }}
              onMouseEnter={() => setIsHovered('cta')}
              onMouseLeave={() => setIsHovered('')}
            >
              Get Started
              <FontAwesomeIcon 
                icon={faArrowRight} 
                style={{
                  ...styles.ctaIcon,
                  transform: isHovered === 'cta' ? 'translateX(4px)' : 'none'
                }}
              />
            </button>
          </Link>
        </div>
      </section>

      <section style={styles.features}>
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
            style={{
              ...styles.feature,
              ...(isHovered === `feature-${index}` ? styles.featureHover : {})
            }}
            onMouseEnter={() => setIsHovered(`feature-${index}`)}
            onMouseLeave={() => setIsHovered('')}
          >
            <FontAwesomeIcon icon={feature.icon} style={styles.featureIcon} />
            <h2 style={styles.featureTitle}>{feature.title}</h2>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </section>

      <section style={styles.newsletter}>
        <div style={styles.newsletterContent}>
          <h2 style={styles.newsletterTitle}>Stay Updated</h2>
          <p style={styles.newsletterDescription}>
            Subscribe to our newsletter for the latest updates, promotions, and industry news.
          </p>
          <form style={styles.newsletterForm} onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                ...styles.input,
                ...(isHovered === 'input' ? styles.inputFocus : {})
              }}
              onFocus={() => setIsHovered('input')}
              onBlur={() => setIsHovered('')}
            />
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isHovered === 'submit' ? styles.submitButtonHover : {})
              }}
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


