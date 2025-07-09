import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProjectScopeSection = ({ initialScope, onScopeChange, isEditable = true }) => {
  const [scope, setScope] = useState(initialScope);
  const [isEditing, setIsEditing] = useState(false);

  const handleScopeUpdate = () => {
    onScopeChange(scope);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setScope(initialScope);
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Project Scope & Requirements
        </h3>
        
        {isEditable && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit Scope
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project Title
          </label>
          {isEditing ? (
            <Input
              type="text"
              value={scope.title}
              onChange={(e) => setScope({ ...scope, title: e.target.value })}
              placeholder="Enter project title"
              className="w-full"
            />
          ) : (
            <p className="text-text-primary bg-background p-3 rounded-lg border border-border-light">
              {scope.title}
            </p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Detailed Description
          </label>
          {isEditing ? (
            <textarea
              value={scope.description}
              onChange={(e) => setScope({ ...scope, description: e.target.value })}
              placeholder="Provide detailed project description..."
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          ) : (
            <div className="text-text-primary bg-background p-4 rounded-lg border border-border-light whitespace-pre-wrap">
              {scope.description}
            </div>
          )}
        </div>

        {/* Key Deliverables */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Key Deliverables
          </label>
          <div className="space-y-2">
            {scope.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border-light">
                <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                <span className="text-text-primary">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Requirements */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Technical Requirements
          </label>
          <div className="flex flex-wrap gap-2">
            {scope.technicalRequirements.map((requirement, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
              >
                {requirement}
              </span>
            ))}
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              size="sm"
              iconName="Save"
              onClick={handleScopeUpdate}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectScopeSection;