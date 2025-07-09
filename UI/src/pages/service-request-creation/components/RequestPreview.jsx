import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RequestPreview = ({ 
  selectedCategory, 
  formData, 
  images 
}) => {
  const formatBudget = (min, max) => {
    if (!min && !max) return 'Budget not specified';
    if (min && max) return `$${min} - $${max}`;
    if (min) return `From $${min}`;
    if (max) return `Up to $${max}`;
  };

  const getUrgencyLabel = (urgency) => {
    const urgencyMap = {
      'flexible': 'Flexible timing',
      'within-week': 'Within a week',
      'within-3-days': 'Within 3 days',
      'urgent': 'Urgent'
    };
    return urgencyMap[urgency] || 'Not specified';
  };

  const getUrgencyColor = (urgency) => {
    const colorMap = {
      'flexible': 'bg-secondary-100 text-secondary-700',
      'within-week': 'bg-accent-100 text-accent-700',
      'within-3-days': 'bg-warning-100 text-warning-700',
      'urgent': 'bg-error-100 text-error-700'
    };
    return colorMap[urgency] || 'bg-secondary-100 text-secondary-700';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Review your request
        </h2>
        <p className="text-text-secondary">
          This is how your request will appear to service providers
        </p>
      </div>

      {/* Preview Card */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {selectedCategory && (
              <div className="p-2 bg-primary-50 rounded-lg">
                <Icon name={selectedCategory.icon} size={20} className="text-primary" />
              </div>
            )}
            <div>
              <span className="text-sm text-text-muted">
                {selectedCategory?.name || 'Category not selected'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(formData.urgency)}`}>
                  {getUrgencyLabel(formData.urgency)}
                </span>
                <span className="text-xs text-text-muted">
                  Posted just now
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium text-text-primary">
              {formatBudget(formData.minBudget, formData.maxBudget)}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          {formData.title || 'Service title not provided'}
        </h3>

        {/* Description */}
        <div className="mb-4">
          <p className="text-text-secondary whitespace-pre-wrap">
            {formData.description || 'No description provided'}
          </p>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image) => (
                <div key={image.id} className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary-100">
                    <Image
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MapPin" size={16} className="text-text-muted" />
          <span className="text-sm text-text-secondary">
            {formData.location || 'Location not specified'}
          </span>
          {formData.shareExactLocation && (
            <span className="text-xs text-success-600 bg-success-50 px-2 py-1 rounded-full">
              Exact location shared
            </span>
          )}
        </div>

        {/* Additional Requirements */}
        {formData.additionalRequirements && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">
              Additional Requirements:
            </h4>
            <p className="text-sm text-text-secondary">
              {formData.additionalRequirements}
            </p>
          </div>
        )}

        {/* Contact Preference */}
        {formData.contactPreference && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                Contact preference: {
                  formData.contactPreference === 'platform' ? 'Platform messaging only' :
                  formData.contactPreference === 'phone' ? 'Phone calls okay' :
                  formData.contactPreference === 'email'? 'Email preferred' : 'Not specified'
                }
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <div className="flex items-center gap-4">
              <span>0 bids received</span>
              <span>Active for 3 days</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} />
              <span>Expires in 3 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-primary-700 mb-2">
              What happens next?
            </h4>
            <ul className="text-sm text-primary-600 space-y-1">
              <li>• Your request will be visible to qualified service providers</li>
              <li>• You can receive up to 10 bids from interested providers</li>
              <li>• The request stays active for 3 days</li>
              <li>• You'll be notified when providers submit bids</li>
              <li>• You can review profiles and choose the best provider</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPreview;