import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  type = 'default',
  className = '',
  maxCount = 99,
  showZero = false,
  size = 'md'
}) => {
  if (!showZero && (!count || count <= 0)) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs min-w-4',
    md: 'h-5 w-5 text-xs min-w-5',
    lg: 'h-6 w-6 text-sm min-w-6'
  };

  const typeClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    accent: 'bg-accent text-accent-foreground'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${typeClasses[type]}
        rounded-full
        font-medium
        leading-none
        transition-all duration-200 ease-out
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;