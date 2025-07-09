import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompletionActions = ({ isAgreementComplete, projectId }) => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    // Navigate to project dashboard or tracking page
    navigate('/dashboard', { state: { projectId, status: 'active' } });
  };

  const handleOpenChat = () => {
    navigate('/private-chat-system', { state: { projectId } });
  };

  const handleViewProfile = () => {
    navigate('/user-profile-management');
  };

  const handleCreateNewRequest = () => {
    navigate('/service-request-creation');
  };

  if (!isAgreementComplete) {
    return (
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="text-center">
          <Icon name="Clock" size={48} className="text-warning mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Agreement In Progress
          </h3>
          <p className="text-text-secondary mb-6">
            Complete all required steps above to finalize the agreement and activate project features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="ArrowLeft"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              onClick={() => navigate('/service-request-creation')}
            >
              View Other Requests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle2" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Agreement Successfully Completed!
        </h3>
        <p className="text-text-secondary">
          Your project agreement is now active. All collaboration features have been unlocked.
        </p>
      </div>

      {/* Feature Activation Notice */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-success mb-3 flex items-center gap-2">
          <Icon name="Zap" size={16} />
          Activated Features
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-success-700">
            <Icon name="MessageCircle" size={14} />
            <span>Private Chat System</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-success-700">
            <Icon name="Upload" size={14} />
            <span>File Sharing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-success-700">
            <Icon name="BarChart3" size={14} />
            <span>Progress Tracking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-success-700">
            <Icon name="Calendar" size={14} />
            <span>Milestone Management</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="primary"
            size="lg"
            iconName="Play"
            onClick={handleStartProject}
            fullWidth
          >
            Start Project
          </Button>
          <Button
            variant="secondary"
            size="lg"
            iconName="MessageCircle"
            onClick={handleOpenChat}
            fullWidth
          >
            Open Chat
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            iconName="User"
            onClick={handleViewProfile}
            fullWidth
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            iconName="LayoutDashboard"
            onClick={() => navigate('/dashboard')}
            fullWidth
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            iconName="Plus"
            onClick={handleCreateNewRequest}
            fullWidth
          >
            New Request
          </Button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
          <Icon name="Lightbulb" size={16} />
          Next Steps
        </h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Start communicating with your project partner through the private chat</li>
          <li>• Review the project timeline and upcoming milestones</li>
          <li>• Set up regular check-ins to track progress</li>
          <li>• Upload any necessary project files or resources</li>
        </ul>
      </div>

      {/* Support Information */}
      <div className="mt-4 text-center">
        <p className="text-sm text-text-secondary">
          Need help? Contact our support team or visit the help center for guidance.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button className="text-sm text-primary hover:text-primary-600 transition-colors">
            Help Center
          </button>
          <button className="text-sm text-primary hover:text-primary-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionActions;