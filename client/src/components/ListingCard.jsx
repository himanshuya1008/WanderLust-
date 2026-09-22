import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ListingCard = ({ stay, showTaxes = false, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [liked, setLiked] = useState(isFavorite);

  const images = stay.images && stay.images.length > 0 ? stay.images : [
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    const nextState = !liked;
    setLiked(nextState);
    if (onToggleFavorite) {
      onToggleFavorite(stay.id, nextState);
    }
    if (nextState) {
      toast.success(`Saved "${stay.title}" to your wishlist! ❤️`);
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  };

  const displayedPrice = showTaxes 
    ? stay.price + Math.round(stay.cleaningFee / 5) + Math.round(stay.serviceFee / 5)
    : stay.price;

  return (
    <div 
      onClick={() => navigate(`/listings/${stay.id}`)}
      className="group cursor-pointer flex flex-col gap-3 rounded-2xl p-2 hover:bg-gray-50/80 transition-all duration-300"
    >
      {/* Image Showcase & Carousel */}
      <div className="relative aspect-[20/19] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xs">
        <img
          src={images[currentImgIdx]}
          alt={stay.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* Highlight Badge */}
        {stay.highlight && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-gray-100">
            <Sparkles className="w-3 h-3 text-[#FF385C]" />
            <span className="text-[11px] font-bold text-gray-900 tracking-tight">
              {stay.highlight}
            </span>
          </div>
        )}

        {/* Heart Wishlist Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full hover:scale-115 active:scale-90 transition-transform duration-200 z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-200 drop-shadow-md ${
              liked 
                ? "fill-[#FF385C] text-[#FF385C]" 
                : "fill-black/30 text-white stroke-[2]"
            }`}
          />
        </button>

        {/* Carousel Controls on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentImgIdx 
                      ? "w-2 h-2 bg-white scale-110" 
                      : "w-1.5 h-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Listing Meta Details */}
      <div className="flex flex-col gap-1 px-1">
        
        {/* City/Country & Rating */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base truncate">
            {stay.city}, {stay.country}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            <span className="text-sm font-semibold text-gray-900">
              {stay.rating ? stay.rating.toFixed(2) : "5.0"}
            </span>
          </div>
        </div>

        {/* Tagline / Distance */}
        <p className="text-xs text-gray-500 line-clamp-1 font-medium">
          {stay.tagline || stay.type}
        </p>

        {/* Available Dates */}
        <p className="text-xs text-gray-400">
          Available Oct 12 – 17 · {stay.bedrooms} beds
        </p>

        {/* Price */}
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-extrabold text-gray-900 text-base">
            ₹{displayedPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-gray-600 font-medium">
            {showTaxes ? "night total before taxes" : "night"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ListingCard;
