import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Category', icon: 'Grid3x3' },
    { id: 2, title: 'Details', icon: 'FileText' },
    { id: 3, title: 'Photos', icon: 'Camera' },
    { id: 4, title: 'Review', icon: 'Eye' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-surface text-text-muted border-border';
      default:
        return 'bg-surface text-text-muted border-border';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center">
                <div className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${getStepClasses(status)}
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                
                {/* Step Label */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className={`
                    text-xs font-medium
                    ${status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-text-muted'}
                  `}>
                    {step.title}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    Step {step.id}
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div className={`
                    h-0.5 w-full transition-all duration-200
                    ${status === 'completed' ? 'bg-success' : 'bg-border'}
                  `} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-16 mb-4">
        <div className="flex items-center justify-between text-sm text-text-muted mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% complete</span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;