import React, { useState } from 'react';
import Button from 'components/ui/Button';


const BidFilters = ({ filterOptions, onFilterChange, sortBy, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'score', label: 'Best Match' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'response_time', label: 'Response Time' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-3000', label: '$1,000 - $3,000' },
    { value: '3000-5000', label: '$3,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-99999', label: '$10,000+' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.8', label: '4.8+ Stars' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' }
  ];

  const verificationOptions = [
    { value: 'all', label: 'All Providers' },
    { value: 'verified', label: 'Verified Only' },
    { value: 'unverified', label: 'Unverified Only' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange?.({
      ...filterOptions,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filterOptions).some(value => value !== 'all');

  const clearFilters = () => {
    onFilterChange?.({
      priceRange: 'all',
      rating: 'all',
      verificationStatus: 'all',
      responseTime: 'all'
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-text-secondary">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Toggle */}
      <Button
        variant="outline"
        size="sm"
        iconName="Filter"
        onClick={() => setShowFilters(!showFilters)}
        className={`relative ${hasActiveFilters ? 'bg-primary-50 border-primary-200' : ''}`}
      >
        Filters
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {Object.values(filterOptions).filter(v => v !== 'all').length}
          </span>
        )}
      </Button>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={clearFilters}
          className="text-text-muted hover:text-text-primary"
        >
          Clear
        </Button>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:w-full">
          {/* Mobile Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Filter Content */}
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:absolute lg:top-full lg:left-0 lg:right-0 lg:bottom-auto lg:mt-2 lg:border lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-semibold text-text-primary">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowFilters(false)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price Range
                </label>
                <select
                  value={filterOptions.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Rating
                </label>
                <select
                  value={filterOptions.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {ratingOptions.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification Status */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Verification
                </label>
                <select
                  value={filterOptions.verificationStatus}
                  onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {verificationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidFilters;