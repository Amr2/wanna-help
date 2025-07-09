import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const BidComparison = ({ bids, onClose, onAccept, onMessage }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-accent-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getBestValue = (key) => {
    switch (key) {
      case 'price':
        return Math.min(...bids.map(b => b.price));
      case 'rating':
        return Math.max(...bids.map(b => b.providerRating));
      case 'score':
        return Math.max(...bids.map(b => b.score));
      default:
        return null;
    }
  };

  const isBestValue = (bid, key) => {
    const bestValue = getBestValue(key);
    switch (key) {
      case 'price':
        return bid.price === bestValue;
      case 'rating':
        return bid.providerRating === bestValue;
      case 'score':
        return bid.score === bestValue;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Compare Bids
            </h2>
            <p className="text-text-secondary text-sm">
              Comparing {bids.length} selected bids
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bids.map((bid) => (
              <div key={bid.id} className="bg-surface-hover rounded-lg p-4 border border-border">
                {/* Provider Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                      <AppImage
                        src={bid.providerAvatar}
                        alt={bid.providerName}
                        className="w-full h-full object-cover"
                        fallbackSrc="/assets/images/no_image.png"
                      />
                    </div>
                    {bid.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-600 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {bid.providerName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Icon name="Star" size={14} className="text-warning-500" />
                      <span>{bid.providerRating}</span>
                      {bid.isVerified && (
                        <span className="text-success-600">• Verified</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Price</span>
                    <span className={`font-semibold ${isBestValue(bid, 'price') ? 'text-success-600' : 'text-text-primary'}`}>
                      {formatPrice(bid.price)}
                      {isBestValue(bid, 'price') && (
                        <Icon name="TrendingDown" size={14} className="inline ml-1" />
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Timeline</span>
                    <span className="font-semibold text-text-primary">
                      {bid.timeline}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Rating</span>
                    <span className={`font-semibold ${isBestValue(bid, 'rating') ? 'text-success-600' : 'text-text-primary'}`}>
                      {bid.providerRating}
                      {isBestValue(bid, 'rating') && (
                        <Icon name="TrendingUp" size={14} className="inline ml-1" />
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Match Score</span>
                    <span className={`font-semibold ${getScoreColor(bid.score)}`}>
                      {bid.score}%
                      {isBestValue(bid, 'score') && (
                        <Icon name="TrendingUp" size={14} className="inline ml-1" />
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Experience</span>
                    <span className="font-semibold text-text-primary">
                      {bid.completedProjects} projects
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {bid.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {bid.skills.length > 4 && (
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                        +{bid.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Proposal Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Proposal</h4>
                  <p className="text-xs text-text-secondary line-clamp-3">
                    {bid.proposal}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => onMessage?.(bid.providerId)}
                    fullWidth
                  >
                    Message
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Check"
                    onClick={() => onAccept?.(bid.id)}
                    fullWidth
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>Best values are highlighted in green</span>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close Comparison
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BidComparison;