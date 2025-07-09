import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BasicInfoForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    website: user.website || '',
    socialLinks: user.socialLinks || {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      website: user.website || '',
      socialLinks: user.socialLinks || {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Basic Information
        </h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location
            </label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State, Country"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Website
            </label>
            <Input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bio/Description
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell others about yourself..."
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary placeholder-text-muted bg-surface disabled:bg-secondary-50 disabled:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <p className="text-xs text-text-secondary mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Social Media Links
            </label>
            <div className="space-y-3">
              {Object.entries(formData.socialLinks).map(([platform, url]) => (
                <div key={platform} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={platform === 'linkedin' ? 'Linkedin' : 
                            platform === 'twitter' ? 'Twitter' :
                            platform === 'facebook' ? 'Facebook' : 'Instagram'}
                      size={16}
                      className="text-text-secondary"
                    />
                  </div>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                    placeholder={`Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile URL`}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Visibility Settings */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Profile Visibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Show Email to Public
              </p>
              <p className="text-xs text-text-secondary">
                Allow others to see your email address
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                disabled={!isEditing}
                defaultChecked={user.showEmail}
              />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Show Phone to Public
              </p>
              <p className="text-xs text-text-secondary">
                Allow others to see your phone number
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                disabled={!isEditing}
                defaultChecked={user.showPhone}
              />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;