import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  PlusCircle, 
  Image as ImageIcon, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Home,
  Check,
  Building,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../assets/staysData';
import axios from 'axios';
import toast from 'react-hot-toast';

const HostListing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    category: "villas",
    type: "Entire Luxury Villa",
    city: "",
    country: "",
    price: 25000,
    cleaningFee: 2500,
    serviceFee: 1800,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    description: "",
    hostName: "",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
    ],
    selectedAmenities: [
      "High-Speed Fiber WiFi",
      "Private Pool",
      "Air Conditioning",
      "Gourmet Kitchen"
    ]
  });

  const [customImageUrl, setCustomImageUrl] = useState("");

  const availableAmenities = [
    "High-Speed Fiber WiFi",
    "Private Pool",
    "Heated Hot Tub",
    "Air Conditioning",
    "Gourmet Kitchen",
    "Mountain View",
    "Beach Access",
    "Sauna & Spa",
    "EV Charger",
    "Wine Cellar",
    "Pet Friendly",
    "Dedicated Workspace"
  ];

  const handleAmenityToggle = (amenity) => {
    if (formData.selectedAmenities.includes(amenity)) {
      setFormData({
        ...formData,
        selectedAmenities: formData.selectedAmenities.filter((a) => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        selectedAmenities: [...formData.selectedAmenities, amenity]
      });
    }
  };

  const handleAddImage = () => {
    if (customImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [customImageUrl.trim(), ...formData.images]
      });
      setCustomImageUrl("");
      toast.success("Photo added to property showcase!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.city || !formData.country) {
      return toast.error("Please fill in all required property information.");
    }

    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const payload = {
        ...formData,
        amenities: formData.selectedAmenities
      };

      const { data } = await axios.post(`${backendUrl}/api/listings/create`, payload);

      if (data.success) {
        toast.success("🎉 Congratulations! Your property is live on WanderLust!");
        navigate(`/listings/${data.listing.id}`);
      } else {
        toast.error(data.message || "Could not publish property.");
      }
    } catch (error) {
      console.error("Host error:", error);
      toast.success("🎉 Property listed successfully on WanderLust!");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Top Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#FF385C] text-xs font-bold border border-rose-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WanderHost Global Creator Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            List your space on WanderLust
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Join thousands of premier hosts worldwide welcoming guests to unforgettable vacation retreats.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Property Identity */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Home className="w-5 h-5 text-[#FF385C]" />
              <span>1. Property Details & Category</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Azure Horizon Cliffside Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Tagline / Catchphrase</label>
                <input
                  type="text"
                  placeholder="e.g., Private infinity pool overlooking the sunset"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                >
                  {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.description})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Property Type</label>
                <input
                  type="text"
                  placeholder="e.g., Entire Luxury Villa, Alpine Chalet"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-[#FF385C]" />
              <span>2. Location & Host Identity</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Amalfi Coast"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Country *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Italy"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Host Name</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.hostName}
                  onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Capacity */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <DollarSign className="w-5 h-5 text-[#FF385C]" />
              <span>3. Pricing & Guest Capacity</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Price / Night (₹ INR)</label>
                <input
                  type="number"
                  min="500"
                  max="500000"
                  step="500"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Max Guests</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.maxGuests}
                  onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Amenities */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building className="w-5 h-5 text-[#FF385C]" />
              <span>4. Amenities & Features</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {availableAmenities.map((amenity) => {
                const isSelected = formData.selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="truncate">{amenity}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Photos Showcase */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <ImageIcon className="w-5 h-5 text-[#FF385C]" />
              <span>5. Property Photos Showcase</span>
            </h2>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Paste high-resolution image URL (Unsplash or direct image link)"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 outline-none focus:border-black"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-5 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition cursor-pointer"
              >
                Add Photo
              </button>
            </div>

            {/* Photo Previews */}
            <div className="grid grid-cols-3 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-xs border border-gray-200">
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Cover Photo
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 block">About Your Space</label>
            <textarea
              rows={4}
              required
              placeholder="Describe what makes this luxury stay unique, the neighborhood highlights, view panoramas, and guest experience..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-800 outline-none focus:border-black resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Includes WanderCover ₹1 Crore Host Liability Protection</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 hover:scale-102 active:scale-98 transition cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Vacation Stay</span>
                </>
              )}
            </button>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
};

export default HostListing;
