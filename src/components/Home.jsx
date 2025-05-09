import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import joblady from '../assets/job-lady.png';
import devops from '../assets/devops.png';
import mobiledevelopment from '../assets/mobile_development.png';
import webdevelopment from '../assets/web_development.png';
import datascience from '../assets/data_science.png';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/jobseeker');
    }
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Find Your <span className="highlight">Dream Job</span><br />
            With Your Interest And Skills
          </h1>
          <p>
            We help you discover the best jobs tailored to your passions and abilities.
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search jobs (e.g. Developer, Designer...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <p className="daily-users">20k+ daily active users</p>
        </div>
        <div className="hero-right">
          <img src={joblady}  alt="Job Search" />
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <h2>Easy Steps To Get Your Dream Job With Our Platform</h2>
        <div className="steps-grid">
          <div className="step-card">📝<span>Create Account</span></div>
          <div className="step-card">📄<span>Upload Resume</span></div>
          <div className="step-card">🔍<span>Search Job</span></div>
          <div className="step-card">💼<span>Apply Job</span></div>
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="category-section">
        <div className="category-header">
          <h2>Popular Jobs Categories</h2>
          <button>Explore All Jobs</button>
        </div>
        <div className="category-grid">
          <div className="category-card">
            <img src={devops} alt="Devop Engineer" />
            <h3>Devops Engineer</h3>
            <p className="jobs-count">6,213 Jobs</p>
            <p>Available in Amazon, Meta, Google, Microsoft, and Apple</p>
          </div>
          <div className="category-card">
            <img src={webdevelopment} alt=" Web Development" />
            <h3>Web Development</h3>
            <p className="jobs-count">3,750 Jobs</p>
            <p>Available in Infosys, Accenture, Cognizant, and Valtech</p>
          </div>
          <div className="category-card">
            <img src={mobiledevelopment} alt="Mobile Development" />
            <h3>Mobile App Development</h3>
            <p className="jobs-count">1,265 Jobs</p>
            <p>Available in ninox,Dot Com Infoway</p>
          </div>
          <div className="category-card">
            <img src={datascience} alt="Data Science" />
            <h3>Data Analysis</h3>
            <p className="jobs-count">5,913 Jobs</p>
            <p>Available in TCS, Infosys, Wipro</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
