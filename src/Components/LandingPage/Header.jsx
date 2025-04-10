import React from "react";
import "./Change.css";
import { useNavigate } from "react-router-dom";
import bannerImage from '../../assets/google meet.webp'; 

function Header() {
  const navigate = useNavigate();
  return ( 

    <div className="landing-container">
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">Connect<span className="highlight">Meet</span></h1>
         
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
        <div>
        <button className="buttonStyle">Try Meet for Work</button>
        <button className="buttonStyle"  onClick={() => navigate('/signin')} >Sign In</button>
      </div>
      </header> 

      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Video calls with anyone, anywhere</h2>
          <p className="hero-description">Stay connected and collaborate with friends, family and colleagues, no matter where you are.</p>
          <div className="cta-buttons">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-image">
        <img 
  src={bannerImage} 
  alt="Connect Meet Banner" 
  className="hero-image-content"
/>
</div>

      </section>

      <section id="features" className="features">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Seamless Integration</h3>
            <p className="feature-description">Connect your Silmar account to Google Meet with just a few clicks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Advanced Analytics</h3>
            <p className="feature-description">Track meeting metrics and participant engagement in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3 className="feature-title">Secure Connection</h3>
            <p className="feature-description">Enterprise-grade security ensures your data stays protected.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Performance Boost</h3>
            <p className="feature-description">Optimize your Google Meet experience with Silmar's performance tools.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Create Account</h3>
            <p className="step-description">Sign up for Connect Meet and link your Google account.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Install Extension</h3>
            <p className="step-description">Add our browser extension for Google Meet integration.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Connect Silmar</h3>
            <p className="step-description">Enter your Silmar credentials to establish the connection.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3 className="step-title">Start Meeting</h3>
            <p className="step-description">Enjoy enhanced meetings with all features enabled.</p>
          </div>
        </div>
      </section>


      <section id="contact" className="contact">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="contact-submit">Send Message</button>
          </form>
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> support@connectmeet.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2 className="logo">Connect<span className="highlight">Meet</span></h2>
            <p>Making virtual meetings better.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Updates</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ConnectMeet. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
    
  );
}

export default Header;

