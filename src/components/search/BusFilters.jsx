import React, { useState } from 'react';
import { Filter, Clock, Bus } from 'lucide-react';

const BusFilters = ({
  onFilterChange,
  minAvailablePrice = 200,
  maxAvailablePrice = 2000,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([minAvailablePrice, maxAvailablePrice]);
  const [departureTime, setDepartureTime] = useState([]);
  const [busTypes, setBusTypes] = useState([]);

  const departureTimeOptions = [
    { id: 'morning', label: 'Morning (6AM - 12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { id: 'evening', label: 'Evening (6PM - 12AM)' },
    { id: 'night', label: 'Night (12AM - 6AM)' },
  ];

  const busTypeOptions = [
    { id: 'ac_sleeper', label: 'AC Sleeper' },
    { id: 'non_ac_sleeper', label: 'Non-AC Sleeper' },
    { id: 'ac_seater', label: 'AC Seater' },
    { id: 'non_ac_seater', label: 'Non-AC Seater' },
    { id: 'volvo', label: 'Volvo' },
  ];

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const isMin = e.target.id === 'min-price';

    setPriceRange(([min, max]) =>
      isMin ? [Math.min(value, max - 50), max] : [min, Math.max(value, min + 50)]
    );
  };

  const toggleArrayItem = (arr, item) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const applyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      departureTime,
      busTypes,
    });
  };

  const resetFilters = () => {
    setPriceRange([minAvailablePrice, maxAvailablePrice]);
    setDepartureTime([]);
    setBusTypes([]);
    onFilterChange({
      minPrice: minAvailablePrice,
      maxPrice: maxAvailablePrice,
      departureTime: [],
      busTypes: [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Mobile Toggle */}
      <div className="flex justify-between items-center md:hidden mb-2">
        <h3 className="font-medium">Filters</h3>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-gray-900">Price Range</h4>
          <div className="flex justify-between items-center">
            <div className="w-[45%]">
              <label htmlFor="min-price" className="block text-xs text-gray-500 mb-1">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  id="min-price"
                  type="number"
                  min={minAvailablePrice}
                  max={priceRange[1] - 50}
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="input pl-7 py-1 text-sm"
                />
              </div>
            </div>

            <span className="text-gray-400">to</span>

            <div className="w-[45%]">
              <label htmlFor="max-price" className="block text-xs text-gray-500 mb-1">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  id="max-price"
                  type="number"
                  min={priceRange[0] + 50}
                  max={maxAvailablePrice}
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="input pl-7 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Departure Time */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Departure Time
          </h4>
          <div className="space-y-2">
            {departureTimeOptions.map((opt) => (
              <label key={opt.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={departureTime.includes(opt.id)}
                  onChange={() => setDepartureTime((prev) => toggleArrayItem(prev, opt.id))}
                  className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bus Type */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Bus className="h-4 w-4 mr-2" />
            Bus Type
          </h4>
          <div className="space-y-2">
            {busTypeOptions.map((opt) => (
              <label key={opt.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={busTypes.includes(opt.id)}
                  onChange={() => setBusTypes((prev) => toggleArrayItem(prev, opt.id))}
                  className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <button className="btn bg-[#D84E55] py-1 px-4 btn-primary w-full" onClick={applyFilters}>
            Apply Filters
          </button>
          <button className="btn  btn-outline w-full" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusFilters;
