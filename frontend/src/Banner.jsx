import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Banner.css';

function Banner() {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/banner/get/${id}`);
      setBanner(data);
      setTimeLeft(data.timer);
    };

    fetchBanner();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const getLink = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleToggleVisibility = async () => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/banner/toggle/${id}`);
      setBanner(data);
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  if (!banner) return <div>Loading...</div>;

  return (
    <div className="banner-container">
      <div className="banner-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button onClick={handleToggleVisibility}>
          {banner.isVisible ? 'Hide Banner' : 'Show Banner'}
        </button>
      </div>
      {banner.isVisible && (
        <div>
          <h2>{banner.description}</h2>
          <p>
            Link: <a href={getLink(banner.link)} target="_blank" rel="noopener noreferrer">{getLink(banner.link)}</a>
          </p>
          <p className="banner-timer">Time left: {timeLeft}s</p>
        </div>
      )}
    </div>
  );
}

export default Banner;
