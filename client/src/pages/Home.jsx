import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoriesFilter from '../components/CategoriesFilter';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { INITIAL_STAYS } from '../assets/staysData';
import { 
  Sparkles, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [stays, setStays] = useState(INITIAL_STAYS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showTaxes, setShowTaxes] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({ destination: "", guests: 0 });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wanderlust_favorites") || "[]");
    } catch {
      return [];
    }
  });

  // Price & Amenity Filters
  const [priceRange, setPriceRange] = useState([5000, 150000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Fetch from backend or fallback to local
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const { data } = await axios.get(`${backendUrl}/api/listings`);
        if (data.success && data.listings && data.listings.length > 0) {
          // Merge backend custom listings with initial rich stays
          const merged = [...data.listings, ...INITIAL_STAYS.filter(s => !data.listings.some(l => l.id === s.id))];
          setStays(merged);
        }
      } catch (err) {
        // Safe fallback to INITIAL_STAYS
      }
    };
    fetchListings();
  }, []);

  const handleToggleFavorite = (stayId, isFav) => {
    let next;
    if (isFav) {
      next = Array.from(new Set([...favorites, stayId]));
    } else {
      next = favorites.filter(id => id !== stayId);
    }
    setFavorites(next);
    localStorage.setItem("wanderlust_favorites", JSON.stringify(next));
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleResetSearch = () => {
    setSearchParams({ destination: "", guests: 0 });
    setActiveCategory("all");
    setPriceRange([5000, 150000]);
    setSelectedAmenities([]);
  };

  // Filter listings
  const filteredStays = stays.filter((stay) => {
    // Category filter
    if (activeCategory !== "all" && stay.category?.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    // Destination filter
    if (searchParams.destination && searchParams.destination.trim() !== "") {
      const q = searchParams.destination.toLowerCase();
      const matchLoc = 
        stay.city?.toLowerCase().includes(q) ||
        stay.country?.toLowerCase().includes(q) ||
        stay.title?.toLowerCase().includes(q) ||
        stay.tagline?.toLowerCase().includes(q);
      if (!matchLoc) return false;
    }
    // Guests filter
    if (searchParams.guests && stay.maxGuests < searchParams.guests) {
      return false;
    }
    // Price filter
    if (stay.price < priceRange[0] || stay.price > priceRange[1]) {
      return false;
    }
    // Amenity filter
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(a => stay.amenities?.includes(a));
      if (!hasAll) return false;
    }
    return true;
  });

  const activeFiltersCount = 
    (searchParams.destination ? 1 : 0) + 
    (selectedAmenities.length) + 
    (priceRange[0] > 5000 || priceRange[1] < 150000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        searchDestination={searchParams.destination}
        onResetSearch={handleResetSearch}
      />

      {/* Categories Bar */}
      <CategoriesFilter
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        showTaxes={showTaxes}
        onToggleTaxes={setShowTaxes}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        activeFilterCount={activeFiltersCount}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Active Filters Pill Bar */}
        {(searchParams.destination || activeFiltersCount > 0) && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-2 p-3 bg-rose-50/60 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-700">Active Filters:</span>
              {searchParams.destination && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-gray-800 shadow-xs border border-gray-200">
                  <MapPin className="w-3 h-3 text-[#FF385C]" />
                  {searchParams.destination}
                  <X className="w-3 h-3 cursor-pointer text-gray-400 hover:text-black" onClick={() => setSearchParams({ ...searchParams, destination: "" })} />
                </span>
              )}
              {selectedAmenities.map(am => (
                <span key={am} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-gray-800 shadow-xs border border-gray-200">
                  {am}
                  <X className="w-3 h-3 cursor-pointer text-gray-400 hover:text-black" onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== am))} />
                </span>
              ))}
              <span className="text-xs text-gray-500 font-medium">
                ({filteredStays.length} {filteredStays.length === 1 ? "Stay" : "Stays"} found)
              </span>
            </div>

            <button
              onClick={handleResetSearch}
              className="text-xs font-bold text-[#FF385C] hover:underline cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

        {/* AI Vacation Concierge Callout Banner */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-rose-300 border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF385C]" />
              <span>WanderAI Travel Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Where will your wanderlust take you next?
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Let our AI travel concierge curate the ultimate custom day-by-day vacation itinerary, secret photo spots, and handpicked stays for any destination worldwide.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => navigate('/ai-planner')}
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF385C] to-[#E00B41] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <span>Launch AI Trip Planner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FF385C]/20 blur-3xl pointer-events-none" />
        </div>

        {/* Listings Grid */}
        {filteredStays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {filteredStays.map((stay) => (
              <ListingCard
                key={stay.id}
                stay={stay}
                showTaxes={showTaxes}
                isFavorite={favorites.includes(stay.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#FF385C] flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No stays found matching your search</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your destination, removing some filters, or exploring all available categories.
            </p>
            <button
              onClick={handleResetSearch}
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}

      </main>

      {/* Floating Interactive Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        currentDestination={searchParams.destination}
      />

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-6">Filter Stays</h3>

            {/* Price Range Slider */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Nightly Price Range (₹ INR)
              </label>
              <div className="flex items-center justify-between text-sm font-bold text-gray-900 mt-2">
                <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                <span>₹{priceRange[1].toLocaleString('en-IN')}+</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full mt-3 accent-[#FF385C]"
              />
            </div>

            {/* Popular Amenities Checkboxes */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                Popular Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Private Pool",
                  "Hot Tub",
                  "High-Speed Fiber WiFi",
                  "Mountain View",
                  "Air Conditioning",
                  "Pet Friendly",
                  "Direct Private Cenote Access",
                  "Wine Cellar & Bar"
                ].map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                        } else {
                          setSelectedAmenities([...selectedAmenities, amenity]);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left ${
                        isChecked 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate">{amenity}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Modal Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setPriceRange([0, 2000]);
                  setSelectedAmenities([]);
                }}
                className="text-xs font-bold text-gray-500 hover:text-black underline"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#FF385C] text-white font-bold text-xs hover:bg-[#E00B41] transition"
              >
                Show {filteredStays.length} Stays
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
