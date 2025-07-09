import React from 'react';
import Icon from 'components/AppIcon';

const RequestSummary = ({ request }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(request?.deadline);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            {request?.title}
          </h2>
          <p className="text-text-secondary mb-4">
            {request?.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Budget</p>
                <p className="font-semibold text-text-primary">
                  {request?.budget}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Deadline</p>
                <p className="font-semibold text-text-primary">
                  {formatDate(request?.deadline)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Time Remaining</p>
                <p className="font-semibold text-text-primary">
                  {daysRemaining > 0 ? `${daysRemaining} days` : 'Expired'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                <Icon name="Tag" size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Category</p>
                <p className="font-semibold text-text-primary">
                  {request?.category}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="bg-surface-hover rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-2">Requirements</h3>
            <ul className="space-y-1">
              {request?.requirements?.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Icon name="Check" size={14} className="text-success-600" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSummary;