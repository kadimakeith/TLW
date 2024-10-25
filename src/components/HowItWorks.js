import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign, faSatellite, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  return (
    <section style={{
      backgroundColor: "#f8f9fa", 
      padding: "50px 0", 
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        width: "80%", 
        margin: "0 auto", 
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "2.5rem", 
          fontWeight: "700", 
          marginBottom: "40px", 
          color: "#333"
        }}>
          How It Works
        </h2>
        <div style={{
          display: "flex", 
          justifyContent: "space-between", 
          flexWrap: "wrap"
        }}>
          {/* Step 1 */}
          <div style={{
            flex: "1 1 30%", 
            backgroundColor: "#fff", 
            padding: "30px 20px", 
            margin: "15px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
            cursor: "pointer",
            hover: {
              transform: "translateY(-10px)"
            }
          }}>
            <div style={{ 
              fontSize: "3rem", 
              color: "#f39c12", 
              marginBottom: "20px"
            }}>
              <FontAwesomeIcon icon={faBitcoinSign} flip />
            </div>
            <h3 style={{
              fontSize: "1.5rem", 
              fontWeight: "600", 
              color: "#444", 
              marginBottom: "15px"
            }}>
              Step 1: Access the Web App
            </h3>
            <p style={{ 
              fontSize: "1rem", 
              color: "#666" 
            }}>
              Scroll down below to access the prototype.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            flex: "1 1 30%", 
            backgroundColor: "#fff", 
            padding: "30px 20px", 
            margin: "15px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
            cursor: "pointer",
            hover: {
              transform: "translateY(-10px)"
            }
          }}>
            <div style={{ 
              fontSize: "3rem", 
              color: "#3498db", 
              marginBottom: "20px"
            }}>
              <FontAwesomeIcon icon={faLocationArrow} beat />
            </div>
            <h3 style={{
              fontSize: "1.5rem", 
              fontWeight: "600", 
              color: "#444", 
              marginBottom: "15px"
            }}>
              Step 2: Create a Time Lock
            </h3>
            <p style={{ 
              fontSize: "1rem", 
              color: "#666" 
            }}>
              Create a time lock by setting a time and date for when you want your funds to become available.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            flex: "1 1 30%", 
            backgroundColor: "#fff", 
            padding: "30px 20px", 
            margin: "15px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
            cursor: "pointer",
            hover: {
              transform: "translateY(-10px)"
            }
          }}>
            <div style={{ 
              fontSize: "3rem", 
              color: "#e74c3c", 
              marginBottom: "20px"
            }}>
              <FontAwesomeIcon icon={faSatellite} pulse />
            </div>
            <h3 style={{
              fontSize: "1.5rem", 
              fontWeight: "600", 
              color: "#444", 
              marginBottom: "15px"
            }}>
              Step 3: Share Your Time Lock
            </h3>
            <p style={{ 
              fontSize: "1rem", 
              color: "#666" 
            }}>
              Share your time lock with friends, family, or colleagues to ensure accountability and transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

