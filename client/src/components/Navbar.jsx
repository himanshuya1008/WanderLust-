import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Globe, 
  Menu, 
  User, 
  Heart, 
  Luggage, 
  Sparkles, 
  PlusCircle, 
  LogOut,
  MapPin,
  Crown,
  Home,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ onSearchOpen, searchDestination, onResetSearch }) => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isHost, isAdmin, logout, openAuthModal, switchRole } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo */}
            <div 
              onClick={() => {
                if (onResetSearch) onResetSearch();
                navigate('/');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF385C] to-[#E00B41] flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition duration-200">
                <Compass className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] bg-clip-text text-transparent">
                  wanderlust
                </span>
                <span className="text-[10px] font-semibold text-gray-400 -mt-1 tracking-widest uppercase">
                  Luxury Stays & Villas
                </span>
              </div>
            </div>

            {/* Search Pill - Center */}
            <div 
              onClick={onSearchOpen}
              className="hidden md:flex items-center divide-x divide-gray-200 border border-gray-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white group hover:border-gray-300"
            >
              <div className="px-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <MapPin className="w-4 h-4 text-[#FF385C]" />
                <span>{searchDestination || "Anywhere"}</span>
              </div>
              <div className="px-3 text-sm font-semibold text-gray-800">
                Any week
              </div>
              <div className="pl-3 pr-1 flex items-center gap-3 text-sm font-medium text-gray-500">
                <span>Add guests</span>
                <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center text-white group-hover:scale-105 transition">
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right Navigation & User Actions */}
            <div className="flex items-center gap-3">
              
              {/* AI Trip Planner Button */}
              <Link
                to="/ai-planner"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 bg-rose-50/80 hover:bg-rose-100/70 border border-rose-200/60 transition duration-200"
              >
                <Sparkles className="w-4 h-4 text-[#FF385C]" />
                <span>WanderAI Planner</span>
              </Link>

              {/* Role-Specific Direct Link in Header */}
              {isHost && (
                <Link
                  to="/host/dashboard"
                  className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Host Dashboard</span>
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              )}

              {!isHost && !isAdmin && (
                <Link
                  to="/host"
                  className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  <PlusCircle className="w-4 h-4 text-gray-500" />
                  <span>Host a Home</span>
                </Link>
              )}

              {/* User Profile Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 border border-gray-200 rounded-full hover:shadow-md transition bg-white cursor-pointer"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {/* User Profile Card */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60 rounded-t-3xl mx-1 -mt-1 mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Active Account
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          currentUser?.role === "admin" 
                            ? "bg-purple-100 text-purple-700" 
                            : currentUser?.role === "host" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {currentUser?.roleTitle || "Guest"}
                        </span>
                      </div>
                      <p className="text-sm font-extrabold text-gray-900 truncate">
                        {currentUser?.name || "Sophia Laurent"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email || "traveler@wanderlust.com"}
                      </p>
                    </div>

                    {/* Quick Switch Role Shortcuts */}
                    <div className="px-4 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Switch Demo Role
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            switchRole("guest");
                          }}
                          className={`py-1 text-[11px] font-bold rounded-lg border transition ${
                            currentUser?.role === "guest" 
                              ? "bg-blue-600 text-white border-blue-600" 
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Guest
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            switchRole("host");
                          }}
                          className={`py-1 text-[11px] font-bold rounded-lg border transition ${
                            currentUser?.role === "host" 
                              ? "bg-emerald-600 text-white border-emerald-600" 
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Host
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            switchRole("admin");
                          }}
                          className={`py-1 text-[11px] font-bold rounded-lg border transition ${
                            currentUser?.role === "admin" 
                              ? "bg-purple-600 text-white border-purple-600" 
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-1.5" />

                    {/* Navigation Links */}
                    <Link
                      to="/trips"
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50/60 hover:text-[#FF385C] transition"
                    >
                      <Luggage className="w-4 h-4 text-gray-400" />
                      <span>My Trips & Reservations</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50/60 hover:text-[#FF385C] transition"
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Saved Wishlist</span>
                    </Link>

                    <Link
                      to="/ai-planner"
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50/60 hover:text-[#FF385C] transition"
                    >
                      <Sparkles className="w-4 h-4 text-[#FF385C]" />
                      <span>AI Vacation Itinerary</span>
                    </Link>

                    {isHost && (
                      <Link
                        to="/host/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/70 transition"
                      >
                        <Home className="w-4 h-4 text-emerald-600" />
                        <span>Host Management Console</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-purple-700 bg-purple-50/50 hover:bg-purple-100/70 transition"
                      >
                        <Crown className="w-4 h-4 text-purple-600" />
                        <span>Admin Analytics Console</span>
                      </Link>
                    )}

                    <Link
                      to="/host"
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50/60 hover:text-[#FF385C] transition"
                    >
                      <PlusCircle className="w-4 h-4 text-gray-400" />
                      <span>List a New Vacation Stay</span>
                    </Link>

                    <div className="h-px bg-gray-100 my-1.5" />

                    {isAuthenticated ? (
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <button
                        onClick={openAuthModal}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-bold text-[#FF385C] hover:bg-rose-50 transition cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        <span>Sign In / Create Account</span>
                      </button>
                    )}

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal Component */}
      <AuthModal />
    </>
  );
};

export default Navbar;
