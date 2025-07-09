import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onImageUpload, onImageEdit }) => {
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={48} className="text-secondary-400" />
            )}
          </div>
          
          {/* Image Upload/Edit Button */}
          <button
            onClick={() => document.getElementById('profile-image-upload').click()}
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 shadow-md"
            title="Change profile photo"
          >
            <Icon name="Camera" size={16} />
          </button>
          
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary font-heading">
                {user.name}
              </h1>
              <p className="text-text-secondary mt-1">
                {user.email}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">
                    {user.rating}
                  </span>
                  <span className="text-sm text-text-secondary">
                    ({user.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {user.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => window.open('/profile-preview', '_blank')}
              >
                Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Share2"
              >
                Share Profile
              </Button>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">
                Profile Completion
              </span>
              <span className="text-sm font-medium text-accent-600">
                {user.completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-accent-200 rounded-full h-2">
              <div
                className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${user.completionPercentage}%` }}
              />
            </div>
            {user.completionPercentage < 100 && (
              <p className="text-xs text-text-secondary mt-2">
                Complete your profile to increase visibility and trust
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;