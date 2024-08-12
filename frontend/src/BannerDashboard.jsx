import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './BannerDashboard.css';

function BannerDashboard() {

  const location = useLocation();
  console.log(location,"location");
  const { bannerDetails } = location.state || {};

  const [description, setDescription] = useState(bannerDetails?.description);
  const [link, setLink] = useState(bannerDetails?.link);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(bannerDetails?.isVisible);
  const navigate = useNavigate(); 

  const handleCreateBanner = async () => {
    const timerInSeconds = (parseInt(hours, 10) || 0) * 3600 +
                           (parseInt(minutes, 10) || 0) * 60 +
                           (parseInt(seconds, 10) || 0);

    try {
      if(bannerDetails) {
        await axios.put(`http://localhost:5000/api/banner/update/${bannerDetails.id}`, {
          description,
          link,
          timer: timerInSeconds,
          isVisible
        });
        alert('Banner edited successfully!');
      }else{
        await axios.post('http://localhost:5000/api/banner/create', {
          description,
          link,
          timer: timerInSeconds,
          isVisible
        });
        alert('Banner created successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  return (
    <div className="background">
      <div className="container">
        <h2 className="heading">Banner Dashboard</h2>
        <div>
          <label className="label">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Timer:</label>
          <div className="timerInputs">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="HH"
              min="0"
              max="23"
              className="timerInput"
            />:
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="MM"
              min="0"
              max="59"
              className="timerInput"
            />:
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="SS"
              min="0"
              max="59"
              className="timerInput"
            />
          </div>
        </div>
        <div>
          <label className="label">Visibility:</label>
          <input
            type="checkbox"
            checked={isVisible}
            onChange={() => setIsVisible(!isVisible)}
            className="checkbox"
          />
        </div>
        <button
          onClick={handleCreateBanner}
          className="button"
        >
          {bannerDetails ? "Edit Banner" : "Create Banner"}
        </button>
      </div>
    </div>
  );
}

export default BannerDashboard;
