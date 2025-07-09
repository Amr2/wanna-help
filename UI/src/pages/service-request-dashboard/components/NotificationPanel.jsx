import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotificationPanel = ({ notifications, onViewBids, onDismiss }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_bid':
        return 'UserPlus';
      case 'bid_update':
        return 'Edit';
      case 'message':
        return 'MessageSquare';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_bid':
        return 'text-success-600';
      case 'bid_update':
        return 'text-primary-600';
      case 'message':
        return 'text-accent-600';
      default:
        return 'text-text-muted';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-primary-700 flex items-center gap-2">
          <Icon name="Bell" size={16} />
          Recent Activity
        </h3>
      </div>
      
      <div className="space-y-3">
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 p-3 bg-surface rounded-lg border border-border"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-surface-hover ${getNotificationColor(notification.type)}`}>
              <Icon name={getNotificationIcon(notification.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">
                {notification.title}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {notification.timestamp}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {notification.type === 'new_bid' && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewBids?.(notification.requestId)}
                  className="text-primary hover:text-primary-600"
                >
                  View
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => onDismiss?.(notification.id)}
                className="text-text-muted hover:text-text-primary"
              >
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {notifications.length > 3 && (
        <div className="text-center mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-600"
          >
            View All ({notifications.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;