// src/pages/ThankYouPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ThankYouPage = () => {
  const { briefId } = useParams(); // Get briefId from URL if passed

  return (
    <div className="thank-you-page main-content text-center">
      <h1>🎉 Thank You for Your Brief!</h1>
      <p className="page-description">
        We're thrilled about the opportunity to bring your vision to life. Your design brief has been successfully submitted.
      </p>
      {briefId && <p className="brief-id-display">Your brief reference ID: <strong>{briefId}</strong></p>}
      <div className="payment-instructions card">
        <h3>Next Step: Complete Your Payment</h3>
        <p>
          To kickstart your project, please complete the payment using the Stripe link that should have opened automatically in a new tab.
        </p>
        <p>
          <strong>If the payment page didn't open:</strong>
          <br />
          Please ensure pop-ups are allowed for this site, or return to the <Link to="/brief" className="link-text">brief submission page</Link> and resubmit to get the link.
        </p>
        <p className="bold-instruction">
          <strong>Once your payment is complete, please share a screenshot of the transaction with us via:</strong>
        </p>
        <ul className="contact-methods">
          <li>📸 Instagram DM: <a href="https://instagram.com/fiwork_llc" target="_blank" rel="noopener noreferrer">@Fiwork_LLC</a></li>
          <li>📧 Email: <a href="mailto:your@fiworkllc.com">your@fiworkllc.com</a></li>
        </ul>
        <p>
          As soon as we confirm your payment, we'll dive straight into creating your perfect logo!
        </p>
      </div>
      <p className="final-note">
        Feel free to reach out if you have any questions. We're excited to work together! 😊
      </p>
      <Link to="/" className="button-secondary">Return to Home Page</Link>
    </div>
  );
};

export default ThankYouPage;