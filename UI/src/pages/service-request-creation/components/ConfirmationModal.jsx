import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isSubmitting,
  requestData 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1050 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-surface rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Icon name="Send" size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Post Service Request
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <Icon name="X" size={20} className="text-text-muted" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-text-secondary">
                You're about to post your service request. Here's what will happen:
              </p>
              
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-primary-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Your request will be visible to qualified service providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>You can receive up to <strong>10 bids</strong> from providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Request stays active for <strong>3 days</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>You'll receive notifications when providers submit bids</span>
                  </li>
                </ul>
              </div>
              
              {/* Request Summary */}
              <div className="bg-surface-hover rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Request Summary:</h4>
                <div className="space-y-1 text-sm text-text-secondary">
                  <div><strong>Title:</strong> {requestData.title}</div>
                  <div><strong>Category:</strong> {requestData.category}</div>
                  <div><strong>Location:</strong> {requestData.location}</div>
                  {requestData.budget && (
                    <div><strong>Budget:</strong> {requestData.budget}</div>
                  )}
                </div>
              </div>
              
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-warning-700">
                    <strong>Important:</strong> Once posted, you cannot edit your request. 
                    Make sure all details are correct before proceeding.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Review Again
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Posting...' : 'Post Request'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;