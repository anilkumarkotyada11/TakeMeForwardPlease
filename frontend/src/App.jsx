import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await axios.get('http://localhost:5000/api/banner/all');
      setBanners(data);
    };

    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/banner/delete/${id}`);
      setBanners(banners.filter(banner => banner.id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="dashboard-link">
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
      <h1>Available Banners</h1>
      <ul className="banner-list">
        {banners.map(banner => (
          <li key={banner.id} className="banner-item">
            <Link to={`/banner/${banner.id}`} className="banner-link">{banner.description}</Link>
            <div className="banner-buttons">
              <Link
                to={{
                  pathname: "/dashboard",
                }}
                state = {{ bannerDetails: banner }}
                className="edit-button"
              >
                Edit
              </Link>              
              <button
                className="delete-button"
                onClick={() => handleDelete(banner.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="content">
        <h1>Welcome to the Website</h1>
        <p>This is a simple, clean one-page website with a controllable banner.</p>
      </div>
    </div>
  );
}

export default App;
