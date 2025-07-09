import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpportunityList = ({ opportunities }) => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-error-50';
      case 'medium':
        return 'bg-warning-50';
      case 'low':
        return 'bg-success-50';
      default:
        return 'bg-secondary-50';
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleSubmitProposal = (opportunityId) => {
    navigate(`/proposal-submission/${opportunityId}`);
  };

  const filteredOpportunities = opportunities?.filter(opp => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return opp.urgency === 'high';
    if (filter === 'recent') {
      const postedDate = new Date(opp.postedAt);
      const daysDiff = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24));
      return daysDiff <= 1;
    }
    return true;
  });

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          New Opportunities
        </h2>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Opportunities</option>
            <option value="urgent">Urgent Only</option>
            <option value="recent">Recent Posts</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => navigate('/opportunities')}
          >
            View All
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredOpportunities?.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="border border-border rounded-lg p-6 hover:border-border-dark transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-text-primary">
                      {opportunity.title}
                    </h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${getUrgencyBg(opportunity.urgency)}
                      ${getUrgencyColor(opportunity.urgency)}
                    `}>
                      {opportunity.urgency} priority
                    </span>
                  </div>
                  <p className="text-text-secondary line-clamp-2 mb-3">
                    {opportunity.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="DollarSign" size={14} />
                      <span>{opportunity.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{getTimeAgo(opportunity.postedAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-4">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">
                    {opportunity.clientRating}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-50 text-primary text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={14} />
                    <span>{opportunity.proposalCount} proposals</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Tag" size={14} />
                    <span>{opportunity.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Send"
                    onClick={() => handleSubmitProposal(opportunity.id)}
                  >
                    Submit Proposal
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No opportunities match your current filters</p>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => setFilter('all')}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityList;