import React from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon name="Search" size={20} className="text-text-muted" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
      />
      {value && (
        <button
          onClick={() => onChange?.('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary"
        >
          <Icon name="X" size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;