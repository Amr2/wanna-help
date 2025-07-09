import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ParticipantProfiles = ({ requester, provider }) => {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Icon name="Users" size={20} />
        Project Participants
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requester Profile */}
        <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border-light">
          <div className="relative">
            <Image
              src={requester.avatar}
              alt={requester.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Search" size={12} color="white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-text-primary truncate">{requester.name}</h3>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                Requester
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-text-secondary mb-2">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} />
                <span>{requester.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                <span>{requester.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>Member since {requester.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Provider Profile */}
        <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border-light">
          <div className="relative">
            <Image
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Briefcase" size={12} color="white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-text-primary truncate">{provider.name}</h3>
              <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                Provider
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-text-secondary mb-2">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} />
                <span>{provider.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Award" size={14} />
                <span>{provider.completedProjects} projects</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Icon name="Shield" size={14} />
              <span className="text-success">Verified Provider</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantProfiles;