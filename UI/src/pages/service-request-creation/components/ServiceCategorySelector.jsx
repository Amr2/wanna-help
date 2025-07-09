import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCategorySelector = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    {
      id: 'home-services',
      name: 'Home Services',
      icon: 'Home',
      description: 'Repairs, cleaning, maintenance',
      subcategories: ['Plumbing', 'Electrical', 'Cleaning', 'Gardening', 'Painting']
    },
    {
      id: 'professional-services',
      name: 'Professional Services',
      icon: 'Briefcase',
      description: 'Business, legal, consulting',
      subcategories: ['Legal', 'Accounting', 'Consulting', 'Marketing', 'Design']
    },
    {
      id: 'creative-services',
      name: 'Creative Services',
      icon: 'Palette',
      description: 'Design, writing, photography',
      subcategories: ['Graphic Design', 'Writing', 'Photography', 'Video Editing', 'Web Design']
    },
    {
      id: 'tech-services',
      name: 'Tech Services',
      icon: 'Monitor',
      description: 'IT support, development',
      subcategories: ['Web Development', 'Mobile Apps', 'IT Support', 'Data Analysis', 'Software']
    },
    {
      id: 'personal-services',
      name: 'Personal Services',
      icon: 'User',
      description: 'Tutoring, fitness, wellness',
      subcategories: ['Tutoring', 'Fitness Training', 'Pet Care', 'Personal Assistant', 'Wellness']
    },
    {
      id: 'event-services',
      name: 'Event Services',
      icon: 'Calendar',
      description: 'Planning, catering, entertainment',
      subcategories: ['Event Planning', 'Catering', 'Photography', 'Entertainment', 'Decoration']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          What service do you need?
        </h2>
        <p className="text-text-secondary">
          Select the category that best matches your service request
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category)}
            className={`
              p-6 rounded-xl border-2 text-left transition-all duration-200
              hover:shadow-md hover:scale-105
              ${selectedCategory?.id === category.id
                ? 'border-primary bg-primary-50 shadow-md'
                : 'border-border bg-surface hover:border-primary-200'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg
                ${selectedCategory?.id === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary-50 text-primary'
                }
              `}>
                <Icon name={category.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-semibold mb-1
                  ${selectedCategory?.id === category.id
                    ? 'text-primary' :'text-text-primary'
                  }
                `}>
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <span
                      key={index}
                      className={`
                        px-2 py-1 text-xs rounded-full
                        ${selectedCategory?.id === category.id
                          ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-secondary-700'
                        }
                      `}
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-text-muted">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Selected: {selectedCategory.name}
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            You can provide more specific details about your {selectedCategory.name.toLowerCase()} needs in the next step.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceCategorySelector;