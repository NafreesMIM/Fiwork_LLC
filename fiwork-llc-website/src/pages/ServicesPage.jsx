// src/pages/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const packagesData = [
  { name: "Basic", price: "$150", description: "Essential branding for new ventures.", features: ["3 Logo Concepts", "5 Revisions", "High-Res PNG & JPG", "Dedicated Designer"], paymentLinkKey: "Basic" },
  { name: "Standard", price: "$300", description: "Comprehensive solution for growing businesses.", features: ["5 Logo Concepts", "10 Revisions", "Vector & Source Files (AI, EPS)", "Brand Guidelines (Basic)", "Priority Support"], paymentLinkKey: "Standard" },
  { name: "Business", price: "$500", description: "Professional package for established brands.", features: ["7 Logo Concepts", "15 Revisions", "All File Formats", "Full Brand Guidelines", "Social Media Kit", "Stationery Design"], paymentLinkKey: "Business" },
  { name: "Premium", price: "$750", description: "Unlimited possibilities for total brand dominance.", features: ["Unlimited Concepts", "Unlimited Revisions", "Comprehensive Branding Pack", "Brand Story & Messaging", "Presentation Mockups", "VIP Support"], paymentLinkKey: "Premium" },
  { name: "Full Branding", price: "$1250", description: "The ultimate branding experience.", features: ["Everything in Premium", "Brand Strategy Session", "Brand Voice & Tone Guide", "Marketing Collateral (Choice of 2)", "Ongoing Consultation"], paymentLinkKey: "FullBranding" },
];

const ServicesPage = () => {
  return (
    <div className="services-page">
      <h1>Our Professional Logo Design & Branding Packages</h1>
      <p className="page-description">
        Choose the package that best fits your brand's needs. Each package is designed to provide maximum value and creativity.
      </p>

      <div className="pricing-table-container">
        {packagesData.map(pkg => (
          <div key={pkg.name} className="package-card">
            <h3>{pkg.name}</h3>
            <p className="price">{pkg.price}</p>
            <p className="package-description">{pkg.description}</p>
            <ul>
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Link to={`/brief/${pkg.paymentLinkKey}`} className="button-primary">
              Select {pkg.name} Package
            </Link>
          </div>
        ))}
      </div>

      <section className="call-to-action section-gap">
        <h2>Not sure which package is right for you?</h2>
        <p>Contact us for a custom quote or to discuss your unique project requirements.</p>
        <Link to="/contact" className="button-secondary">Get a Custom Quote</Link>
      </section>
    </div>
  );
};

export default ServicesPage;