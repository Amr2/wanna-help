import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const UserRoleToggle = ({ 
  onRoleChange,
  className = '',
  defaultRole = 'requester'
}) => {
  const [activeRole, setActiveRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole || defaultRole;
  });

  const roles = [
    {
      id: 'requester',
      label: 'Requester',
      icon: 'Search',
      description: 'Looking for services'
    },
    {
      id: 'provider',
      label: 'Provider',
      icon: 'Briefcase',
      description: 'Offering services'
    }
  ];

  useEffect(() => {
    localStorage.setItem('userRole', activeRole);
    if (onRoleChange) {
      onRoleChange(activeRole);
    }
  }, [activeRole, onRoleChange]);

  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
  };

  return (
    <div className={`flex items-center bg-surface border border-border rounded-lg p-1 ${className}`}>
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => handleRoleChange(role.id)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
            transition-all duration-200 ease-out
            min-w-0 flex-shrink-0
            ${activeRole === role.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }
          `}
          aria-pressed={activeRole === role.id}
          title={role.description}
        >
          <Icon 
            name={role.icon} 
            size={16} 
            className="flex-shrink-0"
          />
          <span className="hidden sm:inline truncate">
            {role.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default UserRoleToggle;