import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faXmark, 
  faClock, 
  faShield, 
  faHome, 
  faCircleInfo, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', href: '/', icon: faHome },
    { title: 'About', href: '/about', icon: faCircleInfo },
    { title: 'Contact', href: 'mailto:mseeflani@proton.me', icon: faEnvelope },
  ];

  const styles = {
    nav: {
      position: 'relative',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    logoIcon: {
      height: '24px',
      width: '24px',
      color: '#2563eb'
    },
    logoText: {
      marginLeft: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827'
    },
    desktopNav: {
      display: 'none',
      alignItems: 'center',
      gap: '2rem',
      '@media (min-width: 768px)': {
        display: 'flex'
      }
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      color: '#4b5563',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      transition: 'color 0.2s ease-in-out',
      textDecoration: 'none'
    },
    navLinkIcon: {
      height: '16px',
      width: '16px',
      marginRight: '0.5rem'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#2563eb',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out'
    },
    buttonHover: {
      backgroundColor: '#1d4ed8'
    },
    buttonIcon: {
      height: '16px',
      width: '16px',
      marginRight: '0.5rem'
    },
    mobileMenuButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      color: '#4b5563',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '@media (min-width: 768px)': {
        display: 'none'
      }
    },
    mobileMenuIcon: {
      height: '24px',
      width: '24px'
    },
    mobileNav: {
      backgroundColor: 'white',
      transition: 'all 0.3s ease-in-out',
      maxHeight: isOpen ? '500px' : '0',
      opacity: isOpen ? '1' : '0',
      overflow: 'hidden'
    },
    mobileNavContent: {
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    mobileNavLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      color: '#4b5563',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out'
    },
    mobileNavLinkIcon: {
      height: '20px',
      width: '20px',
      marginRight: '0.75rem'
    },
    mobileButton: {
      width: '100%',
      justifyContent: 'center',
      marginTop: '0.5rem'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          {/* Logo and Brand */}
          <div style={styles.logoWrapper}>
            <FontAwesomeIcon icon={faClock} style={styles.logoIcon} />
            <a href='/'><span style={styles.logoText}>Transpesa</span></a>
          </div>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#4b5563'}
              >
                <FontAwesomeIcon icon={item.icon} style={styles.navLinkIcon} />
                {item.title}
              </Link>
            ))}
            <button 
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              <FontAwesomeIcon icon={faShield} style={styles.buttonIcon} />
              Secure Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            style={styles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon 
              icon={isOpen ? faXmark : faBars}
              style={styles.mobileMenuIcon} 
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div style={styles.mobileNav}>
        <div style={styles.mobileNavContent}>
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#4b5563';
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={styles.mobileNavLinkIcon} />
              {item.title}
            </Link>
          ))}
          <button 
            style={{...styles.button, ...styles.mobileButton}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <FontAwesomeIcon icon={faShield} style={styles.buttonIcon} />
            Secure Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;