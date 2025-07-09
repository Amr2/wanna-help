import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarSection = ({ events }) => {
  const navigate = useNavigate();

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting':
        return { name: 'Video', color: 'text-accent' };
      case 'deadline':
        return { name: 'Clock', color: 'text-error' };
      case 'milestone':
        return { name: 'Flag', color: 'text-warning' };
      default:
        return { name: 'Calendar', color: 'text-text-secondary' };
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays < 7) return `In ${diffInDays} days`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventPriority = (type, dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return 'urgent';
    if (diffInHours < 72) return 'high';
    return 'normal';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-error';
      case 'high':
        return 'border-l-warning';
      default:
        return 'border-l-primary';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary font-heading">
          Upcoming Events
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          onClick={() => navigate('/calendar')}
        >
          View Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {events?.length > 0 ? (
          events.map((event) => {
            const icon = getEventIcon(event.type);
            const priority = getEventPriority(event.type, event.date);
            const priorityColor = getPriorityColor(priority);
            
            return (
              <div
                key={event.id}
                className={`
                  p-4 rounded-lg border border-border hover:border-border-dark 
                  transition-all duration-200 cursor-pointer
                  border-l-4 ${priorityColor}
                `}
                onClick={() => navigate(`/calendar/event/${event.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-50 flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={icon.name} 
                      size={16} 
                      className={icon.color}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-text-secondary mb-2">
                      {event.client}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Icon name="Calendar" size={12} />
                      <span>{formatEventDate(event.date)}</span>
                      <Icon name="Clock" size={12} className="ml-2" />
                      <span>{formatEventTime(event.date)}</span>
                    </div>
                    
                    {priority === 'urgent' && (
                      <div className="flex items-center gap-1 mt-2">
                        <Icon name="AlertCircle" size={12} className="text-error" />
                        <span className="text-xs text-error font-medium">Urgent</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No upcoming events</p>
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              onClick={() => navigate('/calendar/new')}
              className="mt-2"
            >
              Add Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;