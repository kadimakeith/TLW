import React from "react";

const FAQ = () => {
  return (
    <section style={{ 
      backgroundColor: "#fff", 
      padding: "60px 20px", 
      fontFamily: "'Poppins', sans-serif" 
    }}>
      <div style={{ 
        width: "80%", 
        margin: "0 auto", 
        textAlign: "center" 
      }}>
        <h1 style={{ 
          fontSize: "2.8rem", 
          fontWeight: "700", 
          color: "#333", 
          marginBottom: "40px" 
        }}>
          Frequently Asked Questions
        </h1>
        {/* Question 1 */}
        <div style={{ 
          marginBottom: "30px", 
          textAlign: "left", 
          borderBottom: "1px solid #eee", 
          paddingBottom: "20px" 
        }}>
          <h2 style={{ 
            fontSize: "1.8rem", 
            fontWeight: "600", 
            color: "#444" 
          }}>
            What is a time lock wallet?
          </h2>
          <p style={{ 
            fontSize: "1rem", 
            color: "#666", 
            lineHeight: "1.6" 
          }}>
            A time lock wallet is a type of cryptocurrency wallet that allows you to lock your funds for a specific period of time. This can help you stay on track with your financial goals and avoid making impulsive decisions.
          </p>
        </div>

        {/* Question 2 */}
        <div style={{ 
          marginBottom: "30px", 
          textAlign: "left", 
          borderBottom: "1px solid #eee", 
          paddingBottom: "20px" 
        }}>
          <h2 style={{ 
            fontSize: "1.8rem", 
            fontWeight: "600", 
            color: "#444" 
          }}>
            How secure is your time lock wallet?
          </h2>
          <p style={{ 
            fontSize: "1rem", 
            color: "#666", 
            lineHeight: "1.6" 
          }}>
            We take security very seriously and use industry-standard encryption and authentication protocols to protect your assets. The code is also open source.
          </p>
        </div>

        {/* Question 3 */}
        <div style={{ 
          marginBottom: "30px", 
          textAlign: "left", 
          borderBottom: "1px solid #eee", 
          paddingBottom: "20px" 
        }}>
          <h2 style={{ 
            fontSize: "1.8rem", 
            fontWeight: "600", 
            color: "#444" 
          }}>
            What happens if I lose access to my account?
          </h2>
          <p style={{ 
            fontSize: "1rem", 
            color: "#666", 
            lineHeight: "1.6" 
          }}>
            If you lose access to your account, we have a recovery process in place that allows you to regain access to your funds. However, this process can take some time and requires you to provide proof of ownership of the account.
          </p>
        </div>

        {/* Question 4 */}
        <div style={{ 
          marginBottom: "30px", 
          textAlign: "left", 
          borderBottom: "1px solid #eee", 
          paddingBottom: "20px" 
        }}>
          <h2 style={{ 
            fontSize: "1.8rem", 
            fontWeight: "600", 
            color: "#444" 
          }}>
            How do I contact customer support?
          </h2>
          <p style={{ 
            fontSize: "1rem", 
            color: "#666", 
            lineHeight: "1.6" 
          }}>
            You can contact our customer support team by emailing 
            <a href="mailto:mseeflani@proton.me" style={{ 
              color: "#3498db", 
              textDecoration: "none", 
              marginLeft: "5px" 
            }}>
              mseeflani@proton.me
            </a>. We strive to respond to all inquiries as quickly as possible, usually within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
