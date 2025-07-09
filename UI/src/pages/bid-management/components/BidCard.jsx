import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const BidCard = ({ 
  bid, 
  isSelected, 
  evaluationNote, 
  onSelect, 
  onAccept, 
  onReject, 
  onMessage, 
  onAddNote 
}) => {
  const [showFullProposal, setShowFullProposal] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [noteText, setNoteText] = useState(evaluationNote || '');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success-600 bg-success-50';
    if (score >= 80) return 'text-accent-600 bg-accent-50';
    if (score >= 70) return 'text-warning-600 bg-warning-50';
    return 'text-error-600 bg-error-50';
  };

  const handleSaveNote = () => {
    onAddNote?.(noteText);
  };

  return (
    <div className={`
      bg-surface rounded-lg border p-6 transition-all duration-200
      ${isSelected ? 'border-primary bg-primary-50' : 'border-border hover:shadow-md'}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
              <AppImage
                src={bid?.providerAvatar}
                alt={bid?.providerName}
                className="w-full h-full object-cover"
                fallbackSrc="/assets/images/no_image.png"
              />
            </div>
            {bid?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-600 rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text-primary">
                {bid?.providerName}
              </h3>
              {bid?.isVerified && (
                <span className="text-xs text-success-600 bg-success-100 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} className="text-warning-500" />
                <span>{bid?.providerRating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="CheckCircle" size={14} />
                <span>{bid?.completedProjects} projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>Response: {bid?.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(bid?.score)}`}>
            {bid?.score}% Match
          </div>
          
          <button
            onClick={onSelect}
            className={`
              w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
              ${isSelected 
                ? 'bg-primary border-primary' :'border-border hover:border-primary'
              }
            `}
          >
            {isSelected && <Icon name="Check" size={16} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Pricing and Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-surface-hover rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {formatPrice(bid?.price)}
          </div>
          <div className="text-sm text-text-secondary">Total Budget</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {bid?.timeline}
          </div>
          <div className="text-sm text-text-secondary">Timeline</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-text-secondary mb-1">Submitted</div>
          <div className="text-sm font-medium text-text-primary">
            {getTimeAgo(bid?.submittedAt)}
          </div>
        </div>
      </div>

      {/* Proposal */}
      <div className="mb-4">
        <h4 className="font-semibold text-text-primary mb-2">Proposal</h4>
        <div className="text-text-secondary text-sm">
          {showFullProposal ? (
            <div>
              <p>{bid?.proposal}</p>
              <button
                onClick={() => setShowFullProposal(false)}
                className="text-primary hover:text-primary-600 mt-2"
              >
                Show less
              </button>
            </div>
          ) : (
            <div>
              <p>{bid?.proposal?.substring(0, 200)}...</p>
              <button
                onClick={() => setShowFullProposal(true)}
                className="text-primary hover:text-primary-600 mt-2"
              >
                Read more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="font-semibold text-text-primary mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {bid?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio Samples */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-text-primary">Portfolio</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => setShowPortfolio(!showPortfolio)}
          >
            {showPortfolio ? 'Hide' : 'View'} Portfolio
          </Button>
        </div>
        
        {showPortfolio && (
          <div className="grid grid-cols-2 gap-3">
            {bid?.portfolioSamples?.map((sample) => (
              <div key={sample.id} className="bg-surface-hover rounded-lg p-3">
                <div className="w-full h-24 bg-secondary-100 rounded mb-2 overflow-hidden">
                  <AppImage
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                    fallbackSrc="/assets/images/no_image.png"
                  />
                </div>
                <p className="text-xs text-text-secondary font-medium">
                  {sample.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evaluation Notes */}
      <div className="mb-4">
        <h4 className="font-semibold text-text-primary mb-2">Evaluation Notes</h4>
        <div className="flex gap-2">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your evaluation notes..."
            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm resize-none"
            rows="2"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveNote}
            disabled={noteText === evaluationNote}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageSquare"
            onClick={() => onMessage?.(bid?.providerId)}
          >
            Message
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => {/* View provider profile */}}
          >
            View Profile
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            onClick={() => onReject?.(bid?.id)}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          >
            Reject
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            iconName="Check"
            onClick={() => onAccept?.(bid?.id)}
          >
            Accept Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BidCard;