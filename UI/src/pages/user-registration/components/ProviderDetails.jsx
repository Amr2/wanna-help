import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProviderDetails = ({ formData, onInputChange, errors, className = '' }) => {
  const serviceCategories = [
    { id: 'home-services', label: 'Home Services', icon: 'Home' },
    { id: 'professional', label: 'Professional Services', icon: 'Briefcase' },
    { id: 'creative', label: 'Creative & Design', icon: 'Palette' },
    { id: 'technology', label: 'Technology & IT', icon: 'Monitor' },
    { id: 'education', label: 'Education & Training', icon: 'GraduationCap' },
    { id: 'health-wellness', label: 'Health & Wellness', icon: 'Heart' },
    { id: 'automotive', label: 'Automotive', icon: 'Car' },
    { id: 'events', label: 'Events & Entertainment', icon: 'Calendar' }
  ];

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = formData.serviceCategories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    onInputChange('serviceCategories', newCategories);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Provider Information</h3>
        <p className="text-sm text-text-secondary">Tell us about your business and services</p>
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-text-primary mb-2">
          Business Name *
        </label>
        <Input
          id="businessName"
          type="text"
          placeholder="Enter your business or professional name"
          value={formData.businessName || ''}
          onChange={(e) => onInputChange('businessName', e.target.value)}
          required
          className={errors.businessName ? 'border-error' : ''}
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.businessName}
          </p>
        )}
      </div>

      {/* Service Categories */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Service Categories * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {serviceCategories.map((category) => {
            const isSelected = (formData.serviceCategories || []).includes(category.id);
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all duration-200
                  ${isSelected
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary-200 hover:bg-surface-hover'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon name={category.icon} size={20} />
                  <span className="text-xs font-medium">{category.label}</span>
                </div>
              </div>
            );
          })}
        </div>
        {errors.serviceCategories && (
          <p className="mt-2 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.serviceCategories}
          </p>
        )}
      </div>

      {/* Business Description */}
      <div>
        <label htmlFor="businessDescription" className="block text-sm font-medium text-text-primary mb-2">
          Business Description *
        </label>
        <textarea
          id="businessDescription"
          rows={4}
          placeholder="Briefly describe your services, experience, and what makes you unique..."
          value={formData.businessDescription || ''}
          onChange={(e) => onInputChange('businessDescription', e.target.value)}
          className={`
            w-full px-3 py-2 border rounded-lg resize-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${errors.businessDescription ? 'border-error' : 'border-border'}
            bg-surface text-text-primary placeholder-text-muted
          `}
          required
        />
        <div className="flex justify-between items-center mt-1">
          {errors.businessDescription ? (
            <p className="text-sm text-error flex items-center gap-1">
              <Icon name="AlertCircle" size={14} />
              {errors.businessDescription}
            </p>
          ) : (
            <p className="text-xs text-text-muted">
              Minimum 50 characters ({(formData.businessDescription || '').length}/50)
            </p>
          )}
        </div>
      </div>

      {/* Years of Experience */}
      <div>
        <label htmlFor="yearsExperience" className="block text-sm font-medium text-text-primary mb-2">
          Years of Experience
        </label>
        <Input
          id="yearsExperience"
          type="number"
          placeholder="0"
          min="0"
          max="50"
          value={formData.yearsExperience || ''}
          onChange={(e) => onInputChange('yearsExperience', e.target.value)}
          className={errors.yearsExperience ? 'border-error' : ''}
        />
        {errors.yearsExperience && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors.yearsExperience}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProviderDetails;