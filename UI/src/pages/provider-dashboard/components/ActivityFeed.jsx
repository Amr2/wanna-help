import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'new_request':
        return { name: 'FileText', color: 'text-accent' };
      case 'bid_response':
        return { name: 'MessageCircle', color: 'text-success' };
      case 'project_update':
        return { name: 'RefreshCw', color: 'text-warning' };
      default:
        return { name: 'Bell', color: 'text-text-secondary' };
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'new_request':
        return 'bg-accent-50';
      case 'bid_response':
        return 'bg-success-50';
      case 'project_update':
        return 'bg-warning-50';
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

  const handleActivityClick = (activity) => {
    if (activity.type === 'new_request') {
      navigate(`/service-request/${activity.id}`);
    } else if (activity.type === 'bid_response') {
      navigate(`/proposals/${activity.id}`);
    } else if (activity.type === 'project_update') {
      navigate(`/projects/${activity.id}`);
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Recent Activity
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          onClick={() => navigate('/activity')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities.map((activity) => {
            const icon = getActivityIcon(activity.type);
            const bgColor = getActivityBgColor(activity.type);
            
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${bgColor}
                `}>
                  <Icon 
                    name={icon.name} 
                    size={18} 
                    className={icon.color}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                      {getTimeAgo(activity.postedAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    {activity.category && (
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                        {activity.category}
                      </span>
                    )}
                    {activity.budget && (
                      <span className="text-xs text-text-secondary">
                        {activity.budget}
                      </span>
                    )}
                    {activity.status && (
                      <span className={`
                        text-xs px-2 py-1 rounded
                        ${activity.status === 'accepted' ?'bg-success-100 text-success-700' 
                          : activity.status === 'in_progress' ?'bg-warning-100 text-warning-700' :'bg-secondary-100 text-secondary-700'
                        }
                      `}>
                        {activity.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;