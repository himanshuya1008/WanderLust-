import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Calendar, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Luggage,
  Lock
} from 'lucide-react';
import PaymentModal from './PaymentModal';
import toast from 'react-hot-toast';

const BookingModal = ({ stay, isOpen, onClose, onBookingSuccess }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("2026-10-12");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("Sophia Laurent");
  const [guestEmail, setGuestEmail] = useState("sophia@wanderlust.com");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isOpen || !stay) return null;

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.abs(d2 - d1);
  const calculatedNights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1, 1);

  const pricePerNight = stay.price || 25000;
  const baseCost = pricePerNight * calculatedNights;
  const cleaningFee = stay.cleaningFee || 2500;
  const serviceFee = stay.serviceFee || 1800;
  const total = baseCost + cleaningFee + serviceFee;

  const bookingPayload = {
    stayId: stay.id,
    stayTitle: stay.title,
    stayCity: stay.city,
    stayCountry: stay.country,
    stayImage: stay.images?.[0] || "",
    checkIn,
    checkOut,
    nights: calculatedNights,
    guests,
    pricePerNight,
    cleaningFee,
    serviceFee,
    totalPrice: total,
    guestName: guestName || "Sophia Laurent",
    guestEmail: guestEmail || "sophia@wanderlust.com",
    specialRequests
  };

  const handleOpenPayment = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (confirmedBooking) => {
    setIsPaymentModalOpen(false);
    onClose();
    if (onBookingSuccess) onBookingSuccess(confirmedBooking);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
        <div 
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 sm:p-8 relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stay Summary Header */}
          <div className="flex gap-4 pb-5 border-b border-gray-100 items-center">
            <img
              src={stay.images?.[0]}
              alt={stay.title}
              className="w-20 h-20 rounded-2xl object-cover shadow-sm shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF385C]">
                {stay.type}
              </span>
              <h3 className="font-bold text-gray-900 text-base truncate">
                {stay.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {stay.city}, {stay.country}
              </p>
              <p className="text-xs font-bold text-gray-900 mt-1">
                ₹{pricePerNight?.toLocaleString('en-IN')} <span className="font-normal text-gray-500">/ night</span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleOpenPayment} className="mt-5 space-y-4">
            
            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FF385C]" /> Check-in
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full mt-1 bg-transparent text-xs font-bold text-gray-900 outline-none cursor-pointer"
                />
              </div>
              <div className="border-l border-gray-200 pl-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FF385C]" /> Check-out
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full mt-1 bg-transparent text-xs font-bold text-gray-900 outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Guests Selector */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#FF385C]" /> Guests
                </label>
                <p className="text-xs font-bold text-gray-900 mt-0.5">
                  {guests} {guests === 1 ? "Guest" : "Guests"} (Max {stay.maxGuests})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-xs hover:border-black cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold w-4 text-center">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(stay.maxGuests, guests + 1))}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-xs hover:border-black cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Primary Guest Full Name"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-black font-medium"
              />
              <input
                type="email"
                placeholder="Email Address for Confirmation"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-black font-medium"
              />
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>₹{pricePerNight?.toLocaleString('en-IN')} × {calculatedNights} nights</span>
                <span className="font-semibold">₹{baseCost?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Cleaning fee</span>
                <span className="font-semibold">₹{cleaningFee?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>WanderLust service fee</span>
                <span className="font-semibold">₹{serviceFee?.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                <span>Total Due</span>
                <span className="text-[#FF385C] text-base">₹{total?.toLocaleString('en-IN')} INR</span>
              </div>
            </div>

            {/* Security Tag */}
            <div className="flex items-center gap-2 text-[11px] text-gray-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-risk booking · Instant confirmation</span>
            </div>

            {/* Proceed to Payment Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white font-extrabold text-sm shadow-lg shadow-rose-500/30 hover:scale-101 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Payment (₹{total?.toLocaleString('en-IN')})</span>
            </button>
          </form>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        stay={stay}
        bookingDetails={bookingPayload}
        onPaymentComplete={handlePaymentSuccess}
      />
    </>
  );
};

export default BookingModal;
