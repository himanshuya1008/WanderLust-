import React from 'react';
import { 
  Compass, 
  Waves, 
  Crown, 
  Trees, 
  Building2, 
  Castle, 
  Tent, 
  Anchor, 
  Palmtree, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { CATEGORIES } from '../assets/staysData';

const iconMap = {
  Compass,
  Waves,
  Crown,
  Trees,
  Building2,
  Castle,
  Tent,
  Anchor,
  Palmtree
};

const CategoriesFilter = ({ 
  activeCategory, 
  onSelectCategory, 
  showTaxes, 
  onToggleTaxes,
  onOpenFilterModal,
  activeFilterCount = 0 
}) => {
  return (
    <div className="bg-white border-b border-gray-100 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Horizontal Category Scroller */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 scroll-smooth flex-1">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Compass;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-1.5 pb-2 min-w-fit px-1 border-b-2 transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? "border-black text-black font-bold"
                    : "border-transparent text-gray-500 hover:text-black hover:border-gray-300 font-medium"
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110 text-[#FF385C]" : "group-hover:scale-105"}`} />
                <span className="text-xs whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Filter & Total Taxes Toggle */}
        <div className="hidden md:flex items-center gap-3 shrink-0 pl-2">
          
          {/* Filter Modal Button */}
          <button
            onClick={onOpenFilterModal}
            className="flex items-center gap-2 border border-gray-200 rounded-xl py-2 px-3.5 text-xs font-semibold text-gray-700 hover:border-black transition hover:shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Taxes Toggle Switch */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl py-2 px-3.5 text-xs font-semibold text-gray-700">
            <span className="whitespace-nowrap">Display total before taxes</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showTaxes}
                onChange={(e) => onToggleTaxes(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CategoriesFilter;
