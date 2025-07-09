import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep, 
  requesterProgress, 
  providerProgress,
  isAgreementComplete 
}) => {
  const steps = [
    {
      id: 'scope',
      title: 'Project Scope',
      description: 'Define project requirements',
      icon: 'FileText'
    },
    {
      id: 'pricing',
      title: 'Pricing & Timeline',
      description: 'Set milestones and payments',
      icon: 'DollarSign'
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Review and accept terms',
      icon: 'FileCheck'
    },
    {
      id: 'signature',
      title: 'Digital Signature',
      description: 'Sign the agreement',
      icon: 'PenTool'
    },
    {
      id: 'complete',
      title: 'Agreement Complete',
      description: 'Project ready to start',
      icon: 'CheckCircle2'
    }
  ];

  const getStepStatus = (stepId) => {
    if (isAgreementComplete && stepId === 'complete') return 'completed';
    
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return step.icon;
    return 'Circle';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-50 border-success-200';
      case 'current':
        return 'text-primary bg-primary-50 border-primary-200';
      default:
        return 'text-text-secondary bg-background border-border';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="BarChart3" size={20} />
        <h3 className="text-lg font-semibold text-text-primary">Agreement Progress</h3>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <div className="flex items-center gap-4">
                {/* Step Icon */}
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${getStepClasses(status)}
                `}>
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={20} 
                  />
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${
                    status === 'completed' ? 'text-success' :
                    status === 'current'? 'text-primary' : 'text-text-secondary'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {status === 'completed' && (
                    <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full">
                      Complete
                    </span>
                  )}
                  {status === 'current' && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      In Progress
                    </span>
                  )}
                  {status === 'pending' && (
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connecting Line */}
              {!isLast && (
                <div className={`
                  absolute left-5 top-10 w-0.5 h-6 transition-all duration-200
                  ${status === 'completed' ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* User Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Requester Progress */}
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Search" size={16} className="text-primary" />
            <span className="font-medium text-primary">Requester Progress</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-700">Terms Accepted</span>
              <Icon 
                name={requesterProgress.termsAccepted ? "CheckCircle" : "Clock"} 
                size={16} 
                className={requesterProgress.termsAccepted ? "text-success" : "text-warning"}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-700">Agreement Signed</span>
              <Icon 
                name={requesterProgress.signed ? "CheckCircle" : "Clock"} 
                size={16} 
                className={requesterProgress.signed ? "text-success" : "text-warning"}
              />
            </div>
          </div>
        </div>

        {/* Provider Progress */}
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Briefcase" size={16} className="text-success" />
            <span className="font-medium text-success">Provider Progress</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-success-700">Terms Accepted</span>
              <Icon 
                name={providerProgress.termsAccepted ? "CheckCircle" : "Clock"} 
                size={16} 
                className={providerProgress.termsAccepted ? "text-success" : "text-warning"}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-success-700">Agreement Signed</span>
              <Icon 
                name={providerProgress.signed ? "CheckCircle" : "Clock"} 
                size={16} 
                className={providerProgress.signed ? "text-success" : "text-warning"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {isAgreementComplete && (
        <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="PartyPopper" size={20} className="text-success" />
            <div>
              <p className="text-sm text-success font-medium">
                🎉 Agreement Successfully Completed!
              </p>
              <p className="text-sm text-success-700">
                Both parties have completed all required steps. The project is now ready to begin with full platform features activated.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;