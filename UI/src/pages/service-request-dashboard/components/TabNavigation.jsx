import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange?.(tab.key)}
            className={`
              flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`
                inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full
                ${activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary-100 text-secondary-700'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;