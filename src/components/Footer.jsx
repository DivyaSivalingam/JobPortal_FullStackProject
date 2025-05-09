import React from 'react';
import appStore from '../assets/logo_jobportal.png'; 
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'; // or 'react-icons/fa' for older versions


const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'white', 
      color: 'black', 
      padding: '40px 20px 10px', 
      margin: 0
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Logo and Contact Info */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h2 style={{color:'#4a6cf7', fontSize: '24px', marginBottom: '10px' }}>JobGenie</h2>
          <p>Collin Street West, Victor 8007,</p>
          <p>Australia.</p>
          <p>+1 246-345-0695</p>
          <p>info@jobgenie.com</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998' }}>
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e4405f' }}>
              <FaInstagram size={20} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2' }}>
              <FaXTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
              <FaLinkedinIn size={20} />
            </a>
          </div>

        </div>

        {/* FAQ Links */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Frequently Asked Questions</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>Privacy & Security</li>
            <li>Terms of Service</li>
            <li>Communications</li>
            <li>Referral Terms</li>
            <li>Contact Us</li>
            <li>Disclaimers</li>
          </ul>
        </div>

        {/* Find Jobs Links */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Find Jobs</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>Data Science</li>
            <li>Prompt Engineer</li>
            <li>Backend Developers</li>
            <li>Frontend Developers</li>
            <li>Full Stack Developers</li>
            <li>Trainee</li>
          </ul>
        </div>

        {/* App Store Buttons */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <img src={appStore} alt="App Store" style={{ width: '160px', height: 'auto' , borderRadius: '50%'}} />
        </div>
      </div>

      {/* Optional line to cap bottom background cleanly */}
      <div style={{ height: '1px', backgroundColor: '#1e2a38' }}></div>
    </footer>
  );
};

export default Footer;
