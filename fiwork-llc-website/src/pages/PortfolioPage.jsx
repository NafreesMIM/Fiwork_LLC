// src/pages/PortfolioPage.jsx
import React from 'react';

const portfolioItems = [
  { id: 1, title: "EcoBloom Organics", category: "Nature", image: "https://via.placeholder.com/600x400?text=EcoBloom+Logo" },
  { id: 2, title: "Quantum Innovations", category: "Tech", image: "https://via.placeholder.com/600x400?text=Quantum+Logo" },
  { id: 3, title: "Velvet Lounge Bar", category: "Hospitality", image: "https://via.placeholder.com/600x400?text=Velvet+Logo" },
  { id: 4, title: "Aurora Wellness", category: "Health", image: "https://via.placeholder.com/600x400?text=Aurora+Logo" },
  { id: 5, title: "PixelCraft Gaming", category: "Gaming", image: "https://via.placeholder.com/600x400?text=PixelCraft+Logo" },
  { id: 6, title: "Summit Consulting", category: "Business", image: "https://via.placeholder.com/600x400?text=Summit+Logo" },
  // Add more items
];

const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
      <h1>Our Creative Portfolio</h1>
      <p>Explore a selection of our finest logo designs and branding projects.</p>

      {/* Optional: Add filtering/sorting here */}

      <div className="portfolio-grid">
        {portfolioItems.map(item => (
          <div key={item.id} className="portfolio-item">
            <img src={item.image} alt={item.title} />
            <div className="portfolio-item-info">
              <h3>{item.title}</h3>
              <p>Category: {item.category}</p>
              {/* Add a link to a detailed project page if you create one */}
              {/* <Link to={`/portfolio/${item.id}`}>View Details</Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;