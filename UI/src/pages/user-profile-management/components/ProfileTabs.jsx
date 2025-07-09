import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange, userRole }) => {
  const tabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      icon: 'User',
      description: 'Personal information and contact details'
    },
    {
      id: 'professional',
      label: 'Professional',
      icon: 'Briefcase',
      description: 'Skills, experience, and services',
      providerOnly: true
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: 'Image',
      description: 'Work samples and testimonials',
      providerOnly: true
    },
    {
      id: 'verification',
      label: 'Verification',
      icon: 'Shield',
      description: 'Identity and credential verification'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'Star',
      description: 'Ratings and feedback from clients'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'Privacy, notifications, and account settings'
    }
  ];

  const filteredTabs = tabs.filter(tab => 
    !tab.providerOnly || userRole === 'provider'
  );

  return (
    <div className="bg-surface rounded-xl card-shadow">
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-border">
        {filteredTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-3 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200
              ${activeTab === tab.id
                ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }
            `}
            title={tab.description}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full appearance-none bg-surface border border-border rounded-lg px-4 py-3 pr-10 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {filteredTabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>
        </div>

        {/* Mobile Tab Description */}
        <div className="px-4 py-3 bg-surface-hover">
          <div className="flex items-center gap-2">
            <Icon
              name={filteredTabs.find(tab => tab.id === activeTab)?.icon}
              size={16}
              className="text-text-secondary"
            />
            <span className="text-sm text-text-secondary">
              {filteredTabs.find(tab => tab.id === activeTab)?.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;