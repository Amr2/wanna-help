import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'bid_response':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'new_message':
        return { name: 'MessageCircle', color: 'text-accent' };
      case 'payment':
        return { name: 'DollarSign', color: 'text-primary' };
      case 'project_update':
        return { name: 'RefreshCw', color: 'text-warning' };
      case 'deadline':
        return { name: 'Clock', color: 'text-error' };
      default:
        return { name: 'Bell', color: 'text-text-secondary' };
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'bid_response':
        return 'bg-success-50';
      case 'new_message':
        return 'bg-accent-50';
      case 'payment':
        return 'bg-primary-50';
      case 'project_update':
        return 'bg-warning-50';
      case 'deadline':
        return 'bg-error-50';
      default:
        return 'bg-secondary-50';
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'bid_response') {
      navigate(`/proposals/${notification.id}`);
    } else if (notification.type === 'new_message') {
      navigate('/private-chat-system');
    } else if (notification.type === 'payment') {
      navigate('/earnings');
    } else if (notification.type === 'project_update') {
      navigate(`/projects/${notification.id}`);
    }
  };

  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 3);

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          onClick={() => navigate('/notifications/settings')}
        >
          Settings
        </Button>
      </div>

      <div className="space-y-3">
        {displayedNotifications?.length > 0 ? (
          displayedNotifications.map((notification) => {
            const icon = getNotificationIcon(notification.type);
            const bgColor = getNotificationBgColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`
                  flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${notification.read 
                    ? 'hover:bg-surface-hover' :'bg-accent-50 hover:bg-accent-100'
                  }
                `}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${bgColor}
                `}>
                  <Icon 
                    name={icon.name} 
                    size={16} 
                    className={icon.color}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-text-primary">
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <span className="text-xs text-text-secondary">
                        {getTimeAgo(notification.time)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No notifications</p>
          </div>
        )}
      </div>

      {notifications?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show ${notifications.length - 3} More`}
          </Button>
        </div>
      )}

      {notifications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="ExternalLink"
            onClick={() => navigate('/notifications')}
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;