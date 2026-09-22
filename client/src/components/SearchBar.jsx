import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, X, Sparkles } from 'lucide-react';

const popularDestinations = [
  { city: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=150&q=80" },
  { city: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=150&q=80" },
  { city: "Amalfi Coast", country: "Italy", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=150&q=80" },
  { city: "Zermatt", country: "Switzerland", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=150&q=80" },
  { city: "Kyoto", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&q=80" },
  { city: "Tulum", country: "Mexico", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=150&q=80" }
];

const SearchBar = ({ isOpen, onClose, onSearch, currentDestination = "" }) => {
  const [destination, setDestination] = useState(currentDestination);
  const [checkIn, setCheckIn] = useState("2026-10-12");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState("where");

  if (!isOpen) return null;

  const totalGuests = adults + children;

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    onSearch({
      destination,
      checkIn,
      checkOut,
      guests: totalGuests
    });
    onClose();
  };

  const handleQuickDestination = (cityName) => {
    setDestination(cityName);
    setActiveTab("dates");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-3xl w-full p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#FF385C]">
            <Search className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Find Your Dream Stay</h2>
        </div>

        {/* Search Input Panels */}
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2 bg-gray-50/80 rounded-2xl border border-gray-200">
            
            {/* Where */}
            <div 
              onClick={() => setActiveTab("where")}
              className={`p-3 rounded-xl transition cursor-pointer ${
                activeTab === "where" ? "bg-white shadow-sm ring-2 ring-black/5" : "hover:bg-gray-100/70"
              }`}
            >
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF385C]" /> Where
              </label>
              <input
                type="text"
                placeholder="Search destinations..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full mt-1 bg-transparent text-sm font-semibold text-gray-900 placeholder:text-gray-400 outline-none"
              />
            </div>

            {/* When / Dates */}
            <div 
              onClick={() => setActiveTab("dates")}
              className={`p-3 rounded-xl transition cursor-pointer ${
                activeTab === "dates" ? "bg-white shadow-sm ring-2 ring-black/5" : "hover:bg-gray-100/70"
              }`}
            >
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF385C]" /> Check In / Out
              </label>
              <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-gray-800">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent outline-none w-28 text-xs font-semibold"
                />
                <span>–</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent outline-none w-28 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Who / Guests */}
            <div 
              onClick={() => setActiveTab("who")}
              className={`p-3 rounded-xl transition cursor-pointer ${
                activeTab === "who" ? "bg-white shadow-sm ring-2 ring-black/5" : "hover:bg-gray-100/70"
              }`}
            >
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF385C]" /> Guests
              </label>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
              </p>
            </div>

          </div>

          {/* Quick Popular Destination Badges */}
          {activeTab === "where" && (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
                Popular Destinations
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {popularDestinations.map((dest) => (
                  <button
                    type="button"
                    key={dest.city}
                    onClick={() => handleQuickDestination(dest.city)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-black/20 hover:bg-rose-50/50 transition cursor-pointer group text-center"
                  >
                    <img
                      src={dest.image}
                      alt={dest.city}
                      className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition"
                    />
                    <span className="text-xs font-bold text-gray-800">{dest.city}</span>
                    <span className="text-[10px] text-gray-400">{dest.country}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guest Counter Controls */}
          {activeTab === "who" && (
            <div className="mt-5 p-4 bg-gray-50 rounded-2xl divide-y divide-gray-200">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">Adults</p>
                  <p className="text-xs text-gray-500">Ages 13 or above</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-black"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-black"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">Children</p>
                  <p className="text-xs text-gray-500">Ages 2–12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-black"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setDestination("");
                setAdults(2);
                setChildren(0);
              }}
              className="text-xs font-bold text-gray-500 hover:text-black underline cursor-pointer"
            >
              Clear all filters
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF385C] to-[#E00B41] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md shadow-rose-500/25 hover:scale-102 active:scale-98 transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explore Stays</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SearchBar;
