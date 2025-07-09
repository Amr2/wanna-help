import React, { useState } from 'react';
import Button from 'components/ui/Button';


const FilterBar = ({ filterOptions, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile App', label: 'Mobile App' },
    { value: 'Design', label: 'Design' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Consulting', label: 'Consulting' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
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
      category: 'all',
      status: 'all',
      dateRange: 'all'
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        size="md"
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

      {/* Clear Filters Button */}
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

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
          {/* Mobile Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Filter Panel */}
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:absolute lg:top-full lg:right-0 lg:bottom-auto lg:left-auto lg:w-80 lg:mt-2 lg:border lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-semibold text-text-primary">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowFilters(false)}
              />
            </div>
            
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category
                </label>
                <select
                  value={filterOptions.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={filterOptions.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date Range
                </label>
                <select
                  value={filterOptions.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
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
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;