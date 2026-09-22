import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Luggage, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Download,
  Building,
  Sparkles,
  Search
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyTrips = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const { data } = await axios.get(`${backendUrl}/api/bookings/my-trips`);
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("fetchTrips error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const { data } = await axios.post(`${backendUrl}/api/bookings/${bookingId}/cancel`);
      if (data.success) {
        toast.success("Reservation cancelled successfully.");
        fetchTrips();
      } else {
        toast.error(data.message || "Could not cancel reservation.");
      }
    } catch {
      // Local cancellation
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      toast.success("Reservation marked as cancelled.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#FF385C] text-xs font-bold border border-rose-100 mb-2">
              <Luggage className="w-3.5 h-3.5" />
              <span>Travel Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Trips & Reservations
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your upcoming luxury getaways, check-in instructions, and past vacations.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition cursor-pointer shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Find New Stays</span>
          </button>
        </div>

        {/* Trips Content */}
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 rounded-full border-3 border-[#FF385C] border-t-transparent animate-spin" />
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const isConfirmed = booking.status === 'confirmed';

              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                    isConfirmed ? "border-gray-200 hover:shadow-md" : "border-gray-200 opacity-60 bg-gray-50/50"
                  }`}
                >
                  {/* Image & Main Info */}
                  <div className="flex gap-5 items-center">
                    <img
                      src={booking.stayImage || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"}
                      alt={booking.stayTitle}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shrink-0 shadow-xs"
                    />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                          isConfirmed ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-500">
                          Ref: {booking.confirmationCode}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
                        {booking.stayTitle}
                      </h3>

                      <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF385C]" />
                        {booking.stayCity}{booking.stayCountry ? `, ${booking.stayCountry}` : ""}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-bold text-gray-700 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {booking.checkIn} → {booking.checkOut} ({booking.nights} nights)
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          {booking.guests} Guests
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions Column */}
                  <div className="flex flex-col md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="md:text-right">
                      <p className="text-xs text-gray-400 font-semibold uppercase">Total Paid</p>
                      <p className="text-2xl font-extrabold text-gray-900">₹{Number(booking.totalInr || booking.totalPrice || 0).toLocaleString('en-IN')}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => navigate(`/listings/${booking.stayId}`)}
                        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold hover:bg-gray-200 transition cursor-pointer"
                      >
                        View Stay
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Trips State */
          <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs border border-gray-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#FF385C] flex items-center justify-center mx-auto">
              <Luggage className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No trips booked... yet!</h3>
            <p className="text-sm text-gray-500">
              Time to dust off your bags and start planning your next great adventure. Explore luxury villas, mountain chalets, and beachfront escapes worldwide.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF385C] text-white text-xs font-bold shadow-md shadow-rose-500/25 hover:bg-[#E00B41] transition cursor-pointer"
            >
              <span>Explore Vacation Stays</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
