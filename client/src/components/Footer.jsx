import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Heart, Shield, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24 text-gray-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Destination Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Top Global Stays</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-black hover:underline">Santorini Cliffside Villas</Link></li>
              <li><Link to="/" className="hover:text-black hover:underline">Bali Black Bamboo Lodges</Link></li>
              <li><Link to="/" className="hover:text-black hover:underline">Swiss Alps Glass Chalets</Link></li>
              <li><Link to="/" className="hover:text-black hover:underline">Amalfi Coast Sea Estates</Link></li>
              <li><Link to="/" className="hover:text-black hover:underline">Kyoto Historic Machiyas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Hosting & Community</h4>
            <ul className="space-y-2">
              <li><Link to="/host" className="hover:text-black hover:underline">List your Home on WanderLust</Link></li>
              <li><Link to="/host" className="hover:text-black hover:underline">WanderCover Protection</Link></li>
              <li><Link to="/host" className="hover:text-black hover:underline">Host Community Resources</Link></li>
              <li><Link to="/host" className="hover:text-black hover:underline">Responsible Hosting Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">WanderAI Intelligence</h4>
            <ul className="space-y-2">
              <li><Link to="/ai-planner" className="hover:text-black hover:underline">AI Vacation Itinerary Planner</Link></li>
              <li><Link to="/ai-planner" className="hover:text-black hover:underline">Hidden Gems Concierge</Link></li>
              <li><Link to="/ai-planner" className="hover:text-black hover:underline">Custom Packing Lists</Link></li>
              <li><Link to="/ai-planner" className="hover:text-black hover:underline">Local Dining Recommendations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">About WanderLust</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-black cursor-pointer">Our Global Mission</span></li>
              <li><span className="hover:text-black cursor-pointer">Luxury Curation Standards</span></li>
              <li><span className="hover:text-black cursor-pointer">Careers & Press</span></li>
              <li><span className="hover:text-black cursor-pointer">Privacy & Cookie Policies</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FF385C] text-white flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">wanderlust</span>
            <span className="text-gray-400">© 2026 WanderLust Vacation Rentals, Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold text-gray-700">
            <div className="flex items-center gap-1.5 hover:underline cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </div>
            <div className="hover:underline cursor-pointer">
              <span>₹ INR</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF385C]">
              <Heart className="w-3.5 h-3.5 fill-[#FF385C]" />
              <span>Crafted for Travelers</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
