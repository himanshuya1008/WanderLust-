import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthContext } from '../context/AuthContext';
import { INITIAL_STAYS } from '../assets/staysData';
import { 
  Crown, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Database, 
  Server, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  ArrowRight,
  Building2,
  Edit,
  Save,
  Check,
  CreditCard,
  Zap
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DEFAULT_BANK = {
  accountName: "Himanshu (WanderLust Stays)",
  bankName: "HDFC Bank Ltd",
  accountNumber: "50100492817291",
  ifscCode: "HDFC0000240",
  branch: "Mumbai Central Branch / India",
  upiId: "wanderlust.rentals@razorpay",
  razorpayKeyId: "rzp_test_wanderlust_luxury_2026",
  settlementFrequency: "Instant T+0 / Daily Auto-Settlement",
  accountType: "Current / Business Merchant Account"
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, switchRole } = useAuthContext();
  
  const [bankDetails, setBankDetails] = useState(() => {
    try {
      const saved = localStorage.getItem("wanderlust_merchant_bank");
      return saved ? JSON.parse(saved) : DEFAULT_BANK;
    } catch {
      return DEFAULT_BANK;
    }
  });

  const [isEditingBank, setIsEditingBank] = useState(false);
  const [editForm, setEditForm] = useState(bankDetails);

  const [usersList, setUsersList] = useState([
    { id: "u-1", name: "Sophia Laurent", email: "sophia@wanderlust.com", role: "guest", bookings: 3, joined: "2024" },
    { id: "u-2", name: "Eleni Vassiliou", email: "eleni.host@wanderlust.com", role: "host", listings: 2, joined: "2021" },
    { id: "u-3", name: "Matteo & Giulia", email: "matteo@amalfi.it", role: "host", listings: 1, joined: "2022" },
    { id: "u-4", name: "Himanshu (You)", email: "admin@wanderlust.com", role: "admin", privileges: "Full Root", joined: "2020" }
  ]);

  const [systemServices, setSystemServices] = useState([
    { name: "Backend REST API (Node/Express)", port: "3000", status: "Operational", ping: "18ms", icon: Server },
    { name: "Neon PostgreSQL Serverless", status: "Connected / Standby", ping: "42ms", icon: Database },
    { name: "Google Gemini 2.0 Flash AI", status: "Active & Ready", model: "gemini-2.0-flash", icon: Cpu },
    { name: "Razorpay & Direct Bank Settlement", status: "Settling to HDFC Bank", ping: "Live", icon: Zap }
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsersList(usersList.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success("User access permission role updated.");
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setBankDetails(editForm);
    localStorage.setItem("wanderlust_merchant_bank", JSON.stringify(editForm));
    setIsEditingBank(false);

    try {
      const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      await axios.post(`${backendUrl}/api/bookings/bank-config`, editForm);
    } catch {
      // Local storage handled
    }

    toast.success("Bank Account & Razorpay Payout config updated! 🏦");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>Master Platform Administration</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              WanderLust Global Console
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time platform gross bookings volume, user role access control, and payment bank account management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              Bank Settlements Nominal
            </span>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Gross Booking Volume</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">₹1,48,90,000</h3>
            <p className="text-xs text-emerald-600 font-bold mt-2">
              100% INR Native Volume
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Platform 10% Fee</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">₹14,89,000</h3>
            <p className="text-xs text-purple-600 font-bold mt-2">
              Net Commission to Merchant Bank (INR)
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Verified Stays</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">{INITIAL_STAYS.length} Stays</h3>
            <p className="text-xs text-gray-400 font-medium mt-2">
              100% Quality Inspected
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-200">
            <div className="flex items-center justify-between text-gray-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Platform Members</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#FF385C] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">1,240</h3>
            <p className="text-xs text-emerald-600 font-bold mt-2">
              +140 new signups this month
            </p>
          </div>

        </div>

        {/* Bank & Payouts Beneficiary Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-gray-900 text-lg">
                  Platform Beneficiary Bank Account & Razorpay Gateway
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                All guest checkout payments and host commissions settle directly into this bank account.
              </p>
            </div>

            <button
              onClick={() => setIsEditingBank(!isEditingBank)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition cursor-pointer self-start sm:self-auto"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{isEditingBank ? "Cancel Edit" : "Update Bank Details"}</span>
            </button>
          </div>

          {!isEditingBank ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Account Holder</span>
                <p className="text-sm font-extrabold text-gray-900 mt-1">{bankDetails.accountName}</p>
                <p className="text-[11px] text-gray-500">Primary Beneficiary</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Bank Name</span>
                <p className="text-sm font-extrabold text-gray-900 mt-1">{bankDetails.bankName}</p>
                <p className="text-[11px] text-gray-500">{bankDetails.branch}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Account Number & IFSC</span>
                <p className="text-sm font-mono font-extrabold text-blue-900 mt-1">{bankDetails.accountNumber}</p>
                <p className="text-[11px] font-mono text-gray-500">IFSC: {bankDetails.ifscCode}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">UPI / Razorpay ID</span>
                <p className="text-sm font-mono font-extrabold text-emerald-700 mt-1">{bankDetails.upiId}</p>
                <p className="text-[11px] text-emerald-600 font-bold">⚡ Active for QR Checkout</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveBank} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-200">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500">Account Holder Name</label>
                <input
                  type="text"
                  required
                  value={editForm.accountName}
                  onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500">Bank Name</label>
                <input
                  type="text"
                  required
                  value={editForm.bankName}
                  onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500">Account Number</label>
                <input
                  type="text"
                  required
                  value={editForm.accountNumber}
                  onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500">IFSC Code</label>
                <input
                  type="text"
                  required
                  value={editForm.ifscCode}
                  onChange={(e) => setEditForm({ ...editForm, ifscCode: e.target.value.toUpperCase() })}
                  className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase text-gray-500">Razorpay / UPI ID</label>
                <input
                  type="text"
                  required
                  value={editForm.upiId}
                  onChange={(e) => setEditForm({ ...editForm, upiId: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow hover:bg-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Beneficiary Bank Credentials</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 2-Section Grid: User RBAC Management & Infrastructure Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* User Role Access Control Table (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">User Role & Access Control (RBAC)</h3>
                <p className="text-xs text-gray-400">Manage traveler, host, and admin credentials</p>
              </div>
              <span className="text-xs font-bold text-gray-500">4 Active</span>
            </div>

            <div className="divide-y divide-gray-100">
              {usersList.map((usr) => (
                <div key={usr.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-xs text-gray-900">{usr.name}</p>
                    <p className="text-[11px] text-gray-400">{usr.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={usr.role}
                      onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl border outline-none cursor-pointer ${
                        usr.role === "admin" 
                          ? "bg-purple-100 text-purple-700 border-purple-200" 
                          : usr.role === "host" 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }`}
                    >
                      <option value="guest">🎒 Guest / Traveler</option>
                      <option value="host">🏡 Verified Host</option>
                      <option value="admin">👑 Administrator</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Status (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-lg">System Health</h3>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="space-y-3.5">
              {systemServices.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{srv.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{srv.ping || srv.model || srv.port || "Online"}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      {srv.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

