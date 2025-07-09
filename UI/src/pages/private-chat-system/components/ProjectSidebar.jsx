import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectSidebar = ({ 
  conversation, 
  onClose,
  onDisputeClick,
  onCompleteProject,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!conversation) return null;

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'files', label: 'Files', icon: 'Folder' },
    { id: 'milestones', label: 'Milestones', icon: 'CheckSquare' }
  ];

  const mockFiles = [
    {
      id: 1,
      name: "Project Requirements.pdf",
      type: "application/pdf",
      size: 2048576,
      uploadedBy: "John Doe",
      uploadedAt: new Date(Date.now() - 86400000),
      url: "https://example.com/file1.pdf"
    },
    {
      id: 2,
      name: "Design Mockups.zip",
      type: "application/zip",
      size: 15728640,
      uploadedBy: "Sarah Wilson",
      uploadedAt: new Date(Date.now() - 172800000),
      url: "https://example.com/file2.zip"
    },
    {
      id: 3,
      name: "Logo Assets.png",
      type: "image/png",
      size: 1024000,
      uploadedBy: "John Doe",
      uploadedAt: new Date(Date.now() - 259200000),
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    }
  ];

  const mockMilestones = [
    {
      id: 1,
      title: "Project Kickoff",
      description: "Initial meeting and requirement gathering",
      status: "completed",
      dueDate: new Date(Date.now() - 604800000),
      completedDate: new Date(Date.now() - 518400000)
    },
    {
      id: 2,
      title: "Design Phase",
      description: "Create wireframes and visual designs",
      status: "completed",
      dueDate: new Date(Date.now() - 259200000),
      completedDate: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      title: "Development Phase",
      description: "Build the application according to specifications",
      status: "in-progress",
      dueDate: new Date(Date.now() + 432000000),
      completedDate: null
    },
    {
      id: 4,
      title: "Testing & Deployment",
      description: "Quality assurance and final deployment",
      status: "pending",
      dueDate: new Date(Date.now() + 864000000),
      completedDate: null
    }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'Archive';
    return 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-text-muted';
      case 'overdue': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-100';
      case 'in-progress': return 'bg-warning-100';
      case 'pending': return 'bg-secondary-100';
      case 'overdue': return 'bg-error-100';
      default: return 'bg-secondary-100';
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Project Info */}
      <div>
        <h3 className="font-medium text-text-primary mb-3">Project Information</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-text-muted">Title</label>
            <p className="text-text-primary">{conversation.projectTitle}</p>
          </div>
          
          <div>
            <label className="text-sm text-text-muted">Status</label>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(conversation.projectStatus)} ${getStatusColor(conversation.projectStatus)}`}>
                {conversation.projectStatus.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-text-muted">Budget</label>
            <p className="text-text-primary font-medium">$2,500 - $5,000</p>
          </div>
          
          <div>
            <label className="text-sm text-text-muted">Timeline</label>
            <p className="text-text-primary">4-6 weeks</p>
          </div>
          
          <div>
            <label className="text-sm text-text-muted">Started</label>
            <p className="text-text-primary">{formatDate(new Date(Date.now() - 1209600000))}</p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div>
        <h3 className="font-medium text-text-primary mb-3">Participants</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src={conversation.participant.avatar}
              alt={conversation.participant.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-text-primary">{conversation.participant.name}</p>
                {conversation.participant.isVerified && (
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-muted">Service Provider</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-text-primary">4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="success"
          fullWidth
          iconName="CheckCircle"
          onClick={onCompleteProject}
          disabled={conversation.projectStatus !== 'in-progress'}
        >
          Mark as Complete
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Flag"
          onClick={onDisputeClick}
        >
          Report Issue
        </Button>
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-text-primary">Shared Files</h3>
        <span className="text-sm text-text-muted">{mockFiles.length} files</span>
      </div>
      
      <div className="space-y-3">
        {mockFiles.map((file) => (
          <div key={file.id} className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getFileIcon(file.type)} size={20} className="text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-primary truncate">{file.name}</p>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{file.uploadedBy}</span>
                <span>•</span>
                <span>{formatDate(file.uploadedAt)}</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => window.open(file.url, '_blank')}
              title="Download file"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderMilestonesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-text-primary">Project Milestones</h3>
        <span className="text-sm text-text-muted">
          {mockMilestones.filter(m => m.status === 'completed').length} of {mockMilestones.length} completed
        </span>
      </div>
      
      <div className="space-y-4">
        {mockMilestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {index < mockMilestones.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
            )}
            
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                milestone.status === 'completed' 
                  ? 'bg-success text-white' 
                  : milestone.status === 'in-progress' ?'bg-warning text-white' :'bg-secondary-200 text-text-muted'
              }`}>
                {milestone.status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : milestone.status === 'in-progress' ? (
                  <Icon name="Clock" size={16} />
                ) : (
                  <Icon name="Circle" size={16} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{milestone.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(milestone.status)} ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">{milestone.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    <span>Due: {formatDate(milestone.dueDate)}</span>
                  </div>
                  
                  {milestone.completedDate && (
                    <div className="flex items-center gap-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>Completed: {formatDate(milestone.completedDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`w-80 bg-surface border-l border-border flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-text-primary">Project Details</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-muted hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'files' && renderFilesTab()}
        {activeTab === 'milestones' && renderMilestonesTab()}
      </div>
    </div>
  );
};

export default ProjectSidebar;