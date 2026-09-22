import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import HostListing from './pages/HostListing';
import HostDashboard from './pages/HostDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyTrips from './pages/MyTrips';
import Wishlist from './pages/Wishlist';
import AITripPlanner from './pages/AITripPlanner';
import { AuthProvider } from './context/AuthContext';

// AI SaaS Tools Sub-suite
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import GenerateImages from './pages/GenerateImages';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-900 selection:bg-rose-100 selection:text-[#FF385C]">
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1A1D20',
              color: '#fff',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '600',
              padding: '12px 18px',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)'
            }
          }}
        />

        <Routes>
          {/* WanderLust Vacation Rentals & Booking Platform Core */}
          <Route path="/" element={<Home />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/host" element={<HostListing />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/ai-planner" element={<AITripPlanner />} />

          {/* AI SaaS Suite Sub-routes */}
          <Route path="/ai" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="blog-titles" element={<BlogTitles />} />
            <Route path="generate-images" element={<GenerateImages />} />
            <Route path="remove-background" element={<RemoveBackground />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

