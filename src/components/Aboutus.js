import React from "react";
import "./Aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Our Time Lock Wallet</h1>
      <p>
        Our time lock wallet is a secure and easy-to-use way to manage your
        cryptocurrency assets. With our unique time lock feature, you can set
        specific times when your assets will become available, helping you stay
        on track with your financial goals.
      </p>
      <p>
        Our team of experienced developers and designers are committed to
        creating a seamless user experience. We understand that trust is crucial
        when it comes to managing your finances, which is why we prioritize
        security and transparency in everything we do.
      </p>
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          {/*<img src="https://shirlyneodhiambo.carrd.co/assets/images/image03.jpg?v=1a07be7b" alt="Shirleen Odhiambo" />*/}
          <h3>Keith Kadima</h3>
        </div>
        <div className="team-member">
          {/*<img src="https://shirlyneodhiambo.carrd.co/assets/images/image03.jpg?v=1a07be7b" alt="Shirleen Odhiambo" />*/}
          <h3>James Gitere</h3>
        </div>
        <div className="team-member">
          {/*<img src="https://shirlyneodhiambo.carrd.co/assets/images/image03.jpg?v=1a07be7b" alt="Shirleen Odhiambo" />*/}
          <h3>Shirleen Odhiambo</h3>
        </div>
        <div className="team-member">
          {/*<img src="https://shirlyneodhiambo.carrd.co/assets/images/image03.jpg?v=1a07be7b" alt="Shirleen Odhiambo" />*/}
          <h3>Kevin Isom</h3>
        </div>
        <div className="team-member">
          {/*<img src="https://shirlyneodhiambo.carrd.co/assets/images/image03.jpg?v=1a07be7b" alt="Shirleen Odhiambo" />*/}
          <h3>Doreen Nangira</h3>
        </div>
      </div> 
    </div>
  );
};

export default AboutUs;
