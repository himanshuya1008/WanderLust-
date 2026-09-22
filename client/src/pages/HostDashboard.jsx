import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthContext } from '../context/AuthContext';
import { INITIAL_STAYS } from '../assets/staysData';
import { 
  Home, 
  DollarSign, 
  Users, 
  Star, 
  PlusCircle, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Calendar,
  Sparkles,
  Building2,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const HostDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isHost } = useAuthContext();
  const [hostStays, setHostStays] = useState(INITIAL_STAYS.slice(0, 4));

  const recentBookings = [
    {
      id: "res-01",
      guestName: "Marcus Chen",
      guestAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      property: "The Celestial Cliffside Sanctuary",
      dates: "Oct 12 – Oct 17, 2026",
      guests: 2,
      payout: "₹1,42,500",
      status: "Confirmed"
    },
    {
      id: "res-02",
      guestName: "Emma Watson-Davis",
      guestAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      property: "Hideout Bamboo Eco-Palace",
      dates: "Nov 04 – Nov 09, 2026",
      guests: 3,
      payout: "₹71,000",
      status: "Confirmed"
    },
    {
      id: "res-03",
      guestName: "Claire DeWitt",
      guestAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      property: "Villa Positano Bella Vista",
      dates: "Dec 20 – Dec 27, 2026",
      guests: 4,
      payout: "₹4,06,000",
      status: "Pending"
    }
  ];

  const handleToggleStatus = (stayId) => {
    setHostStays(hostStays.map(s => s.id === stayId ? { ...s, active: s.active === false ? true : false } : s));
    toast.success("Listing visibility updated.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Superhost Control Panel</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Host Management & Earnings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, {currentUser?.name || "Eleni"}. Here is your portfolio overview and reservation requests.
            </p>
          </div>

          <button
            onClick={() => navigate('/host')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF385C] text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:bg-[#E00B41] transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Listing</span>
          </button>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Revenue */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">30-Day Payouts</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">₹24,50,000</h3>
            <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24% wired to your bank (INR)
            </p>
          </div>

          {/* Active Listings */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Active Stays</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">4 Stays</h3>
            <p className="text-xs text-gray-400 font-medium mt-2">
              98% average occupancy rate
            </p>
          </div>

          {/* Total Bookings */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Guests</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">42 Guests</h3>
            <p className="text-xs text-purple-600 font-bold mt-2">
              8 upcoming arrivals this week
            </p>
          </div>

          {/* Host Rating */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Superhost Rating</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">4.98 ⭐</h3>
            <p className="text-xs text-gray-400 font-medium mt-2">
              Based on 142 guest reviews
            </p>
          </div>

        </div>

        {/* Host Payout Destination Bank Banner */}
        <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl border border-emerald-200 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-gray-900 text-sm">Direct Deposit Bank Account Verified</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-black">Active T+1 Auto Wire</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Earnings are wired directly to: <strong>HDFC Bank (A/C: •••• 7291 · IFSC: HDFC0000240)</strong>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Next Scheduled Payout</span>
            <p className="text-sm font-extrabold text-emerald-700">Today, 5:00 PM (₹1,42,500)</p>
          </div>
        </div>

        {/* 2-Section Grid: Managed Properties & Recent Reservation Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Managed Stays (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-lg">Your Listed Properties</h3>
              <span className="text-xs font-bold text-gray-400">4 Published</span>
            </div>

            <div className="space-y-4">
              {hostStays.map((stay) => (
                <div 
                  key={stay.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 bg-gray-50/50 transition"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={stay.images?.[0]}
                      alt={stay.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 truncate">{stay.title}</h4>
                      <p className="text-xs font-bold text-gray-500">{stay.city}, {stay.country}</p>
                      <p className="text-xs font-extrabold text-[#FF385C] mt-0.5">₹{stay.price?.toLocaleString('en-IN')} <span className="font-normal text-gray-400">/ night</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`/listings/${stay.id}`)}
                      className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition cursor-pointer"
                      title="View public page"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(stay.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        stay.active !== false 
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {stay.active !== false ? "Active" : "Paused"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Guest Bookings (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-lg">Recent Bookings</h3>
              <span className="text-xs font-bold text-emerald-600">3 New</span>
            </div>

            <div className="space-y-4">
              {recentBookings.map((res) => (
                <div key={res.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={res.guestAvatar} alt={res.guestName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{res.guestName}</p>
                        <p className="text-[10px] text-gray-400">{res.guests} Guests</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600">{res.payout}</span>
                  </div>

                  <p className="text-xs font-semibold text-gray-700 truncate">{res.property}</p>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {res.dates}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default HostDashboard;

