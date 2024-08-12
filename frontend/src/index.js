import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Banner from './Banner';
import BannerDashboard from "./BannerDashboard"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/banner/:id" element={<Banner />} />
        <Route path="/dashboard" element={<BannerDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
