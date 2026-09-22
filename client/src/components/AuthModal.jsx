import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  Crown, 
  Compass, 
  Home, 
  ShieldCheck, 
  Check, 
  ArrowRight 
} from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, quickLogin, login, register } = useAuthContext();
  const [tab, setTab] = useState("signin"); // "signin" or "signup"
  const [role, setRole] = useState("guest"); // "guest", "host", "admin"
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "signin") {
      login(email || "traveler@wanderlust.com", password || "pass123", role);
    } else {
      register(name || "Traveler", email || "traveler@wanderlust.com", password || "pass123", role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full p-6 sm:p-8 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF385C] to-[#E00B41] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-rose-500/20">
            <Compass className="w-7 h-7 animate-[spin_12s_linear_infinite]" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Welcome to WanderLust
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access luxury stays, host management, and AI trip planning.
          </p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="mb-6 p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF385C] text-center">
            ⚡ Quick 1-Click Demo Profiles
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => quickLogin("guest")}
              className="p-2 rounded-xl bg-white border border-rose-200/70 hover:border-black text-center transition cursor-pointer group shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-1 text-[10px] font-bold">
                🎒
              </div>
              <span className="block text-[11px] font-bold text-gray-800 group-hover:text-[#FF385C]">Guest</span>
              <span className="block text-[9px] text-gray-400">Sophia L.</span>
            </button>

            <button
              type="button"
              onClick={() => quickLogin("host")}
              className="p-2 rounded-xl bg-white border border-rose-200/70 hover:border-black text-center transition cursor-pointer group shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1 text-[10px] font-bold">
                🏡
              </div>
              <span className="block text-[11px] font-bold text-gray-800 group-hover:text-[#FF385C]">Superhost</span>
              <span className="block text-[9px] text-gray-400">Eleni V.</span>
            </button>

            <button
              type="button"
              onClick={() => quickLogin("admin")}
              className="p-2 rounded-xl bg-white border border-rose-200/70 hover:border-black text-center transition cursor-pointer group shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-1 text-[10px] font-bold">
                👑
              </div>
              <span className="block text-[11px] font-bold text-gray-800 group-hover:text-[#FF385C]">Admin</span>
              <span className="block text-[9px] text-gray-400">Himanshu</span>
            </button>
          </div>
        </div>

        {/* Sign In / Sign Up Toggle */}
        <div className="flex border-b border-gray-200 mb-5">
          <button
            type="button"
            onClick={() => setTab("signin")}
            className={`flex-1 pb-3 text-xs font-bold transition border-b-2 cursor-pointer ${
              tab === "signin"
                ? "border-[#FF385C] text-[#FF385C]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 pb-3 text-xs font-bold transition border-b-2 cursor-pointer ${
              tab === "signup"
                ? "border-[#FF385C] text-[#FF385C]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
            Account Role Access
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "guest", label: "Traveler", icon: "🎒" },
              { id: "host", label: "Host", icon: "🏡" },
              { id: "admin", label: "Admin", icon: "👑" }
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`py-2 px-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  role === r.id
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === "signup" && (
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Full Name</label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sophia Laurent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 font-semibold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Email Address</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="email"
                required
                placeholder="your.email@wanderlust.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Password</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs">
              <Lock className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:scale-101 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{tab === "signin" ? "Sign In to WanderLust" : "Complete Registration"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted & Protected</span>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
