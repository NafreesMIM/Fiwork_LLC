// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Crafting Unique Brand Identities.</h1>
          <p className="sub-heading">
            At Fiwork LLC, we transform visions into powerful visual stories. Let's create a logo that speaks volumes.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="button-primary">Start Your Project</Link>
            <Link to="/portfolio" className="button-secondary">View Our Work</Link>
          </div>
        </div>
      </section>

      <section className="about-us-preview section-gap">
        <h2>Who We Are</h2>
        <p>
          Fiwork LLC is a dedicated team of passionate graphic designers committed to delivering exceptional logo design and branding solutions. We believe in collaborative creativity, ensuring every design perfectly encapsulates your brand's essence and resonates with your audience.
        </p>
        <Link to="/contact" className="button-primary">Learn More About Us</Link>
      </section>

      <section className="featured-work section-gap">
        <h2>Featured Projects</h2>
        <div className="portfolio-grid">
          {/* Replace with actual portfolio items or a dynamic loop */}
          <div className="portfolio-item">
            <img src="https://via.placeholder.com/400x250?text=Logo+Project+1" alt="Project 1" />
            <div className="portfolio-item-info">
              <h3>EcoBloom Organics</h3>
              <p>Minimalist logo for an organic food brand.</p>
            </div>
          </div>
          <div className="portfolio-item">
            <img src="https://via.placeholder.com/400x250?text=Logo+Project+2" alt="Project 2" />
            <div className="portfolio-item-info">
              <h3>Quantum Innovations</h3>
              <p>Modern tech logo with abstract elements.</p>
            </div>
          </div>
          <div className="portfolio-item">
            <img src="https://via.placeholder.com/400x250?text=Logo+Project+3" alt="Project 3" />
            <div className="portfolio-item-info">
              <h3>Velvet Lounge Bar</h3>
              <p>Sophisticated wordmark for a high-end bar.</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/portfolio" className="button-secondary">See All Portfolio Items</Link>
        </div>
      </section>

      <section className="testimonials-preview section-gap">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-card">
          <p>"Fiwork LLC truly captured the essence of my brand. The process was smooth, and the result was beyond my expectations!"</p>
          <h4>- Jane D., Startup Founder</h4>
        </div>
        <div className="testimonial-card">
          <p>"Professional, creative, and responsive. Fiwork LLC delivered a stunning logo on time and within budget."</p>
          <h4>- Mark S., Small Business Owner</h4>
        </div>
        {/* Add more testimonials here */}
      </section>
    </div>
  );
};

export default HomePage;