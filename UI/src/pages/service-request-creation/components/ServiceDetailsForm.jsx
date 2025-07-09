import React, { useState } from 'react';
import Input from '../../../components/ui/Input';


const ServiceDetailsForm = ({ 
  formData, 
  onFormDataChange, 
  selectedCategory 
}) => {
  const [charCount, setCharCount] = useState(formData.description?.length || 0);
  const maxChars = 2000;

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setCharCount(value.length);
      onFormDataChange({
        ...formData,
        description: value
      });
    }
  };

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const urgencyOptions = [
    { value: 'flexible', label: 'Flexible', description: 'No rush, can wait for the right provider' },
    { value: 'within-week', label: 'Within a week', description: 'Would like to start within 7 days' },
    { value: 'within-3-days', label: 'Within 3 days', description: 'Need to start soon' },
    { value: 'urgent', label: 'Urgent', description: 'Need immediate attention' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Tell us about your {selectedCategory?.name.toLowerCase()} needs
        </h2>
        <p className="text-text-secondary">
          The more details you provide, the better proposals you'll receive
        </p>
      </div>

      <div className="space-y-6">
        {/* Service Title */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Service Title *
          </label>
          <Input
            type="text"
            placeholder="e.g., Need a plumber to fix kitchen sink leak"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full"
            required
          />
          <p className="text-xs text-text-muted mt-1">
            Write a clear, specific title that describes what you need
          </p>
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Detailed Description *
          </label>
          <div className="relative">
            <textarea
              placeholder={`Describe your ${selectedCategory?.name.toLowerCase()} needs in detail...\n\nInclude:\n• What exactly needs to be done\n• Current situation/problem\n• Any specific requirements\n• Materials or tools needed\n• Access information`}
              value={formData.description || ''}
              onChange={handleDescriptionChange}
              className="w-full h-40 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-text-muted">
              {charCount}/{maxChars}
            </div>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Detailed descriptions help providers give accurate quotes and timelines
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Service Location *
          </label>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter your address or area"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full"
              required
            />
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="shareExactLocation"
                checked={formData.shareExactLocation || false}
                onChange={(e) => handleInputChange('shareExactLocation', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="shareExactLocation" className="text-sm text-text-secondary">
                Share exact address with providers (recommended for accurate quotes)
              </label>
            </div>
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Min budget"
                value={formData.minBudget || ''}
                onChange={(e) => handleInputChange('minBudget', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max budget"
                value={formData.maxBudget || ''}
                onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Optional: Helps providers tailor their proposals to your budget
          </p>
        </div>

        {/* Timeline/Urgency */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            When do you need this service? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {urgencyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange('urgency', option.value)}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${formData.urgency === option.value
                    ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200'
                  }
                `}
              >
                <div className="font-medium text-text-primary mb-1">
                  {option.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Requirements
          </label>
          <textarea
            placeholder="Any special requirements, preferences, or constraints..."
            value={formData.additionalRequirements || ''}
            onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
            className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Contact Preferences */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            How would you like providers to contact you?
          </label>
          <div className="space-y-2">
            {[
              { value: 'platform', label: 'Through platform messaging only' },
              { value: 'phone', label: 'Phone calls are okay' },
              { value: 'email', label: 'Email is preferred' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="contactPreference"
                  value={option.value}
                  checked={formData.contactPreference === option.value}
                  onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;