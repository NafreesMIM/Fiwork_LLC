// src/pages/ContactPage.jsx
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // In a real application, you would send this to a Firebase Cloud Function
    // that then uses a service like SendGrid or Nodemailer to send an email.
    // For this example, we'll just simulate success.
    console.log("Contact form submitted:", formData);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({ type: 'success', text: 'Thank you for your message! We will get back to you shortly.' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error("Contact form submission error:", error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <h1>Get In Touch With Us</h1>
      <p className="page-description">
        Have questions, need a custom quote, or just want to say hello? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required></textarea>
        </div>

        <button type="submit" className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {message.text && <p className={`form-message ${message.type}`}>{message.text}</p>}
      </form>

      <div className="contact-info">
        <h3>Direct Contact</h3>
        <p>Email: <a href="mailto:your@fiworkllc.com">your@fiworkllc.com</a></p>
        <p>Instagram: <a href="https://instagram.com/fiwork_llc" target="_blank" rel="noopener noreferrer">@Fiwork_LLC</a></p>
        {/* Add phone number if desired */}
      </div>
    </div>
  );
};

export default ContactPage;