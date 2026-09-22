import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { INITIAL_STAYS } from '../assets/staysData';
import { 
  Star, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Bed, 
  Bath, 
  CheckCircle, 
  CreditCard,
  MessageSquarePlus,
  ArrowLeft,
  Tv,
  Wifi,
  Wind,
  Coffee,
  Car,
  Waves
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Quick dates for sticky booking widget
  const [checkIn, setCheckIn] = useState("2026-10-12");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    // Find in initial stays or try backend
    const found = INITIAL_STAYS.find((s) => s.id === id);
    if (found) {
      setStay(found);
    } else {
      // Fetch from backend
      const fetchBackendListing = async () => {
        try {
          const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
          const { data } = await axios.get(`${backendUrl}/api/listings/${id}`);
          if (data.success && data.listing) {
            setStay(data.listing);
          } else {
            setStay(INITIAL_STAYS[0]); // Safe fallback
          }
        } catch {
          setStay(INITIAL_STAYS[0]);
        }
      };
      fetchBackendListing();
    }

    // Check wishlist
    try {
      const favs = JSON.parse(localStorage.getItem("wanderlust_favorites") || "[]");
      setIsFavorite(favs.includes(id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  if (!stay) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-3 border-[#FF385C] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Calculate pricing
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.abs(d2 - d1);
  const nights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1, 1);
  const baseCost = stay.price * nights;
  const cleaningFee = stay.cleaningFee || 2500;
  const serviceFee = stay.serviceFee || 1800;
  const totalCost = baseCost + cleaningFee + serviceFee;

  const handleToggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("wanderlust_favorites") || "[]");
      let next;
      if (isFavorite) {
        next = favs.filter(favId => favId !== stay.id);
        toast("Removed from wishlist", { icon: "💔" });
      } else {
        next = Array.from(new Set([...favs, stay.id]));
        toast.success(`Saved "${stay.title}" to your wishlist! ❤️`);
      }
      setIsFavorite(!isFavorite);
      localStorage.setItem("wanderlust_favorites", JSON.stringify(next));
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Listing link copied to clipboard! 📋");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    try {
      setSubmittingReview(true);
      const newRev = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor || "Wanderer Guest",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        date: "Today",
        rating: Number(newReviewRating),
        comment: newReviewComment
      };

      const updatedReviews = [newRev, ...(stay.reviews || [])];
      setStay({
        ...stay,
        reviews: updatedReviews,
        reviewsCount: updatedReviews.length
      });

      setNewReviewAuthor("");
      setNewReviewComment("");
      toast.success("Thank you! Your review has been posted. ⭐");
    } finally {
      setSubmittingReview(false);
    }
  };

  const images = stay.images && stay.images.length > 0 ? stay.images : [
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Back Link & Title Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black mb-3 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to explore all stays</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {stay.highlight && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#FF385C] text-xs font-bold border border-rose-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {stay.highlight}
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {stay.type}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                {stay.title}
              </h1>
              <p className="text-sm font-semibold text-gray-600 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF385C]" />
                {stay.city}, {stay.country}
              </p>
            </div>

            {/* Share & Save Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handleToggleFavorite}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-[#FF385C] text-[#FF385C]" : ""}`} />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5-Photo Showcase Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-3xl overflow-hidden mb-12 shadow-sm aspect-[16/9] max-h-[520px]">
          {/* Main Large Hero Image */}
          <div 
            onClick={() => setSelectedPhoto(images[0])}
            className="md:col-span-2 h-full cursor-pointer relative group overflow-hidden bg-gray-100"
          >
            <img
              src={images[0]}
              alt={stay.title}
              className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
          </div>

          {/* 4 Supporting Photo Grid */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-2.5 h-full">
            {images.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(imgUrl)}
                className="h-full cursor-pointer relative group overflow-hidden bg-gray-100"
              >
                <img
                  src={imgUrl}
                  alt={`${stay.title} view ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Details & Sticky Booking Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details, Host, Amenities, Description */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Specs Summary */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200 text-sm font-bold text-gray-700 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#FF385C]" /> {stay.maxGuests} Guests
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#FF385C]" /> {stay.bedrooms} Bedrooms
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#FF385C]" /> {stay.beds} Beds
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#FF385C]" /> {stay.baths} Baths
              </span>
            </div>

            {/* Host Profile Box */}
            <div className="flex items-center justify-between gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={stay.host?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"}
                  alt={stay.host?.name}
                  className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#FF385C]/20"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Hosted by {stay.host?.name || "WanderLust Verified Host"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {stay.host?.isSuperhost ? "🌟 Superhost · " : ""}{stay.host?.hostingYears || 5} years hosting · {stay.host?.responseRate || "100%"} response rate
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100/70 text-[#FF385C] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> WanderCover Protected
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">About this luxury space</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {stay.description}
              </p>
            </div>

            {/* Key Amenities */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {stay.amenities?.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl border border-gray-100 text-sm font-medium text-gray-800">
                    <CheckCircle className="w-4 h-4 text-[#FF385C] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-8 border-t border-gray-200 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-black text-black" />
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {stay.rating ? stay.rating.toFixed(2) : "5.0"} · {stay.reviewsCount || stay.reviews?.length || 0} Reviews
                  </h3>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stay.reviews?.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-xs text-gray-900">{review.author}</p>
                        <p className="text-[10px] text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array(review.rating || 5).fill(0).map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-black text-black" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Write Review Box */}
              <form onSubmit={handleAddReview} className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-3">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquarePlus className="w-4 h-4 text-[#FF385C]" />
                  Leave a Review for this Stay
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 outline-none"
                  />
                  <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl text-xs">
                    <span className="text-gray-500 font-semibold">Rating:</span>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(e.target.value)}
                      className="bg-transparent font-bold text-gray-800 outline-none"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5.0 - Exceptional)</option>
                      <option value="4">⭐⭐⭐⭐ (4.0 - Great)</option>
                      <option value="3">⭐⭐⭐ (3.0 - Good)</option>
                    </select>
                  </div>
                </div>
                <textarea
                  placeholder="Share your experience staying at this luxury property..."
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2.5 bg-[#FF385C] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#E00B41] transition cursor-pointer"
                >
                  Post Review
                </button>
              </form>

            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div>
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 space-y-5">
              
              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-gray-900">₹{stay.price?.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-500 font-medium ml-1">/ night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span>{stay.rating ? stay.rating.toFixed(2) : "5.0"}</span>
                  <span className="text-gray-400">({stay.reviewsCount || stay.reviews?.length || 0})</span>
                </div>
              </div>

              {/* Date & Guest Selectors */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden divide-y divide-gray-200">
                <div className="grid grid-cols-2 divide-x divide-gray-200 p-2.5 bg-gray-50/50">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-gray-500">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none mt-0.5"
                    />
                  </div>
                  <div className="pl-2.5">
                    <label className="text-[10px] font-extrabold uppercase text-gray-500">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-gray-50/50">
                  <label className="text-[10px] font-extrabold uppercase text-gray-500">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none mt-0.5"
                  >
                    {Array.from({ length: stay.maxGuests || 4 }, (_, idx) => idx + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Reserve Now</span>
              </button>

              <p className="text-[11px] text-center text-gray-400">
                You won't be charged yet · Instant confirmation
              </p>

              {/* Price Calculation Details */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span className="underline">₹{stay.price?.toLocaleString('en-IN')} × {nights} nights</span>
                  <span className="font-semibold text-gray-800">₹{baseCost?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="underline">Cleaning fee</span>
                  <span className="font-semibold text-gray-800">₹{cleaningFee?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="underline">WanderLust service fee</span>
                  <span className="font-semibold text-gray-800">₹{serviceFee?.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-extrabold text-gray-900">
                  <span>Total before taxes</span>
                  <span className="text-[#FF385C]">₹{totalCost?.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Booking Modal */}
      <BookingModal
        stay={stay}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedPhoto}
            alt="Full Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ListingDetail;
