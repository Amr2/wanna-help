import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const RequestCard = ({ request, onViewBids, onEditRequest, onMessageProvider }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'draft':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary-100 flex-shrink-0">
            <AppImage
              src={request?.image}
              alt={request?.title}
              className="w-full h-full object-cover"
              fallbackSrc="/assets/images/no_image.png"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-lg mb-1 truncate">
              {request?.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
              {getStatusText(request?.status)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {request?.status !== 'draft' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageSquare"
              onClick={() => onMessageProvider?.()}
              className="text-text-secondary hover:text-text-primary"
            >
              <span className="sr-only">Message providers</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEditRequest?.()}
            className="text-text-secondary hover:text-text-primary"
          >
            <span className="sr-only">Edit request</span>
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-text-secondary text-sm mb-2">
          {request?.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
            {request?.category}
          </span>
          <span>•</span>
          <span>Created {new Date(request?.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Icon name="DollarSign" size={16} className="text-text-muted" />
            <span className="text-xs text-text-muted">Budget</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {request?.budget}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Icon name="Users" size={16} className="text-text-muted" />
            <span className="text-xs text-text-muted">Bids</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {request?.bidCount || 0}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Icon name="Clock" size={16} className="text-text-muted" />
            <span className="text-xs text-text-muted">Time</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            {request?.timeRemaining}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={16} />
            {request?.viewCount || 0} views
          </span>
          {request?.bidCount > 0 && (
            <span className="flex items-center gap-1">
              <Icon name="MessageSquare" size={16} />
              {request?.bidCount} bids
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {request?.status === 'draft' ? (
            <Button
              variant="primary"
              size="sm"
              iconName="Send"
              onClick={() => onEditRequest?.()}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              iconName="Eye"
              onClick={() => onViewBids?.()}
              disabled={request?.bidCount === 0}
            >
              View Bids ({request?.bidCount || 0})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;