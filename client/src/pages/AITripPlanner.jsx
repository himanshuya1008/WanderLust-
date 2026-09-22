import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Markdown from 'react-markdown';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Compass, 
  DollarSign, 
  Users, 
  Send, 
  Copy, 
  Check, 
  ArrowRight,
  Plane,
  Camera,
  Utensils
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AITripPlanner = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Santorini & Cyclades Islands");
  const [days, setDays] = useState(4);
  const [vibe, setVibe] = useState("Romantic Luxury & Sunset Views");
  const [budget, setBudget] = useState("Luxury");
  const [travelers, setTravelers] = useState("2 Travelers (Couple)");
  
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const [copied, setCopied] = useState(false);

  const sampleDestinations = [
    "Santorini, Greece",
    "Amalfi Coast, Italy",
    "Kyoto, Japan",
    "Bali, Indonesia",
    "Zermatt & Swiss Alps",
    "Tulum, Mexico",
    "Reykjavik, Iceland"
  ];

  const travelVibes = [
    "Romantic Luxury & Sunset Views",
    "Adventure, Mountains & Outdoors",
    "Art, History & Cultural Immersion",
    "Jungle Eco-Retreat & Wellness",
    "Foodie, Wine & Culinary Masterclasses"
  ];

  const handleGenerateItinerary = async (e) => {
    if (e) e.preventDefault();
    if (!destination.trim()) return toast.error("Please provide a destination.");

    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const { data } = await axios.post(`${backendUrl}/api/ai/plan-trip`, {
        destination,
        days,
        vibe,
        budget,
        travelers
      });

      if (data.success && data.content) {
        setItinerary(data.content);
        toast.success("✨ Your custom vacation itinerary is ready!");
      } else {
        toast.error(data.message || "Could not generate itinerary.");
      }
    } catch (error) {
      console.error("AI Planner error:", error);
      toast.error("Could not reach AI server. Using local fallback.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (itinerary && navigator.clipboard) {
      navigator.clipboard.writeText(itinerary);
      setCopied(true);
      toast.success("Itinerary copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Banner Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-[#FF385C] text-xs font-bold border border-rose-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Gemini 2.0 Flash</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            WanderAI Vacation Itinerary Planner
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Let AI craft the ultimate personalized day-by-day travel guide, dining gems, and secret photography viewpoints.
          </p>
        </div>

        {/* 2-Column Studio: Configuration Form & Output Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-6">
            <form onSubmit={handleGenerateItinerary} className="space-y-5">
              
              {/* Destination */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF385C]" /> Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amalfi Coast, Bali, Kyoto, Swiss Alps"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-black"
                />

                {/* Quick Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sampleDestinations.slice(0, 4).map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDestination(d)}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-[#FF385C] transition font-medium"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip Length & Travelers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF385C]" /> Duration
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none"
                  >
                    {[2, 3, 4, 5, 7, 10, 14].map((num) => (
                      <option key={num} value={num}>{num} Days</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FF385C]" /> Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none"
                  >
                    <option value="Solo Traveler">Solo Traveler</option>
                    <option value="2 Travelers (Couple)">2 Travelers (Couple)</option>
                    <option value="Family with Kids">Family with Kids</option>
                    <option value="Group of Friends (4-6)">Group of Friends (4-6)</option>
                  </select>
                </div>
              </div>

              {/* Travel Vibe */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#FF385C]" /> Vacation Vibe
                </label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                >
                  {travelVibes.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF385C]" /> Budget Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Comfort", "Luxury", "Ultra-Luxe"].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setBudget(tier)}
                      className={`py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        budget === tier 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white font-extrabold text-sm shadow-lg shadow-rose-500/30 hover:scale-101 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>WanderAI is planning your trip...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom Itinerary</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Itinerary Results Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 min-h-[500px] flex flex-col justify-between">
            
            {/* Header / Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#FF385C]" />
                <h3 className="font-bold text-gray-900 text-lg">
                  {destination ? `Itinerary for ${destination}` : "Your Vacation Plan"}
                </h3>
              </div>

              {itinerary && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>

            {/* Content Body */}
            {itinerary ? (
              <div className="my-6 space-y-4 text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-[600px] pr-2">
                <div className="reset-tw">
                  <Markdown>{itinerary}</Markdown>
                </div>
              </div>
            ) : (
              /* Empty Initial State */
              <div className="py-20 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-[#FF385C] flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Ready to Plan Your Next Adventure?</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Pick your destination, length of stay, and travel vibe, then click "Generate Custom Itinerary" to get started.
                </p>
              </div>
            )}

            {/* Footer Matching Stays Action */}
            {itinerary && (
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Ready to find accommodations?</p>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition cursor-pointer"
                >
                  <span>Browse Stays in {destination}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AITripPlanner;
