import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { INITIAL_STAYS } from '../assets/staysData';
import { Heart, ArrowRight, Compass } from 'lucide-react';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wanderlust_favorites") || "[]");
    } catch {
      return [];
    }
  });

  const handleToggleFavorite = (stayId, isFav) => {
    let next;
    if (isFav) {
      next = Array.from(new Set([...favoriteIds, stayId]));
    } else {
      next = favoriteIds.filter(id => id !== stayId);
    }
    setFavoriteIds(next);
    localStorage.setItem("wanderlust_favorites", JSON.stringify(next));
  };

  const favoriteStays = INITIAL_STAYS.filter((stay) => favoriteIds.includes(stay.id));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#FF385C] text-xs font-bold border border-rose-100 mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#FF385C]" />
            <span>Saved Collections</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Saved Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {favoriteStays.length} {favoriteStays.length === 1 ? "Dream stay" : "Dream stays"} saved for your future journeys.
          </p>
        </div>

        {/* Wishlist Grid */}
        {favoriteStays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {favoriteStays.map((stay) => (
              <ListingCard
                key={stay.id}
                stay={stay}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#FF385C] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-rose-100" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500">
              As you search, tap the heart icon on any stay to save your favorite villas, cabins, and dream retreats here.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF385C] text-white text-xs font-bold shadow-md shadow-rose-500/25 hover:bg-[#E00B41] transition cursor-pointer"
            >
              <span>Explore Stays</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
