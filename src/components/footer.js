import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faClock, 
  faEnvelope, 
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faDiscord
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const styles = {
    footer: {
      width: '100%',
      backgroundColor: '#111827',
      color: '#E5E7EB',
      padding: '2rem 0',
      marginTop: 'auto'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '2rem',
      marginBottom: '2rem',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      }
    },
    section: {
      flex: '1',
      minWidth: '250px',
      marginBottom: '1rem',
      '@media (max-width: 768px)': {
        minWidth: '100%',
      }
    },
    heading: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      marginRight: '0.5rem',
      width: '1.25rem',
      height: '1.25rem'
    },
    text: {
      color: '#9CA3AF',
      fontSize: '0.875rem'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    socialIcon: {
      color: '#9CA3AF',
      transition: 'color 0.2s ease',
      cursor: 'pointer'
    },
    link: {
      color: '#9CA3AF',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
      display: 'block',
      marginBottom: '0.5rem'
    },
    button: {
      backgroundColor: '#2563EB',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      marginTop: '0.5rem',
      transition: 'background-color 0.2s ease'
    },
    bottomBar: {
      borderTop: '1px solid #1F2937',
      paddingTop: '2rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        textAlign: 'center'
      }
    },
    bottomSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#9CA3AF',
      fontSize: '0.875rem'
    }
  };

  // Hover styles
  const hoverStyles = {
    socialIcon: {
      twitter: { color: '#60A5FA' },
      discord: { color: '#A78BFA' },
      github: { color: '#9CA3AF' }
    },
    link: { color: 'white' },
    button: { backgroundColor: '#1D4ED8' }
  };
  
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          {/* Company info */}
          <div style={styles.section}>
            <h3 style={styles.heading}>
              <FontAwesomeIcon icon={faLock} style={styles.icon} />
              Locsafe
            </h3>
            <p style={styles.text}>
              Secure time-based cryptocurrency management solution for your digital assets.
            </p>
            <div style={styles.socialLinks}>
              <a 
                href="#" 
                style={styles.socialIcon}
                onMouseOver={(e) => e.target.style.color = hoverStyles.socialIcon.twitter.color}
                onMouseOut={(e) => e.target.style.color = styles.socialIcon.color}
              >
                <FontAwesomeIcon icon={faTwitter} style={styles.icon} />
              </a>
              <a 
                href="#" 
                style={styles.socialIcon}
                onMouseOver={(e) => e.target.style.color = hoverStyles.socialIcon.discord.color}
                onMouseOut={(e) => e.target.style.color = styles.socialIcon.color}
              >
                <FontAwesomeIcon icon={faDiscord} style={styles.icon} />
              </a>
              <a 
                href="#" 
                style={styles.socialIcon}
                onMouseOver={(e) => e.target.style.color = hoverStyles.socialIcon.github.color}
                onMouseOut={(e) => e.target.style.color = styles.socialIcon.color}
              >
                <FontAwesomeIcon icon={faGithub} style={styles.icon} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h3 style={styles.heading}>
              <FontAwesomeIcon icon={faClock} style={styles.icon} />
              Quick Links
            </h3>
            <div>
              {['Documentation', 'API Reference', 'Security', 'Terms of Service'].map((text) => (
                <a 
                  key={text} 
                  href="#" 
                  style={styles.link}
                  onMouseOver={(e) => e.target.style.color = hoverStyles.link.color}
                  onMouseOut={(e) => e.target.style.color = styles.link.color}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={styles.section}>
            <h3 style={styles.heading}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
              Contact Us
            </h3>
            <div>
              <p style={styles.text}>support@loc-safe.com</p>
              <button 
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = hoverStyles.button.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
              >
                Get Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottomBar}>
          <div style={styles.bottomSection}>
            <FontAwesomeIcon icon={faShield} style={{...styles.icon, color: '#10B981'}} />
            <span>Protected by industry-standard encryption</span>
          </div>
          <div style={styles.bottomSection}>
            Built with Web3 Technology
          </div>
          <div style={styles.bottomSection}>
            © {currentYear} Transpesa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;