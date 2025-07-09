import React from 'react';
import Icon from 'components/AppIcon';

const AnalyticsWidget = ({ title, value, icon, color = 'primary' }) => {
  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      error: 'bg-error-50 text-error-600',
      accent: 'bg-accent-50 text-accent-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;