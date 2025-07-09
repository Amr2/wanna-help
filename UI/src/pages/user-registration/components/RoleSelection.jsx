import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelection = ({ selectedRoles, onRoleChange, className = '' }) => {
  const roles = [
    {
      id: 'requester',
      title: 'Service Requester',
      description: 'I need services and want to post requests',
      icon: 'Search',
      features: ['Post service requests', 'Receive bids from providers', 'Choose the best offer']
    },
    {
      id: 'provider',
      title: 'Service Provider',
      description: 'I offer services and want to bid on requests',
      icon: 'Briefcase',
      features: ['Browse service requests', 'Submit competitive bids', 'Grow your business']
    }
  ];

  const handleRoleToggle = (roleId) => {
    const newRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    onRoleChange(newRoles);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Choose Your Role</h3>
        <p className="text-sm text-text-secondary">Select one or both roles to get started</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => {
          const isSelected = selectedRoles.includes(role.id);
          
          return (
            <div
              key={role.id}
              onClick={() => handleRoleToggle(role.id)}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected
                  ? 'border-primary bg-primary-50 shadow-md'
                  : 'border-border bg-surface hover:border-primary-200 hover:bg-surface-hover'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-secondary-600'}
                `}>
                  <Icon name={role.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary mb-1">{role.title}</h4>
                  <p className="text-sm text-text-secondary mb-3">{role.description}</p>
                  
                  <ul className="space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-text-secondary">
                        <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelection;