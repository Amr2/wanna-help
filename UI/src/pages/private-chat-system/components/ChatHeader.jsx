import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  conversation, 
  onBackClick,
  onProjectDetailsClick,
  onVideoCallClick,
  onMenuClick,
  className = '' 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!conversation) {
    return (
      <div className={`flex items-center justify-between p-4 border-b border-border bg-surface ${className}`}>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            onClick={onBackClick}
            className="md:hidden"
          />
          <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={20} className="text-text-muted" />
          </div>
          <div>
            <h2 className="font-medium text-text-primary">Select a conversation</h2>
            <p className="text-sm text-text-secondary">Choose a chat to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'completed': return 'text-primary';
      case 'disputed': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active Agreement';
      case 'in-progress': return 'Work in Progress';
      case 'completed': return 'Completed';
      case 'disputed': return 'Under Dispute';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 border-b border-border bg-surface ${className}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Back Button (Mobile) */}
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowLeft"
          onClick={onBackClick}
          className="md:hidden flex-shrink-0"
        />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Image
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation.participant.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-medium text-text-primary truncate">
              {conversation.participant.name}
            </h2>
            {conversation.participant.isVerified && (
              <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary truncate">
              {conversation.projectTitle}
            </span>
            <span className="text-text-muted">•</span>
            <span className={`font-medium ${getStatusColor(conversation.projectStatus)}`}>
              {getStatusText(conversation.projectStatus)}
            </span>
          </div>
          
          {conversation.participant.isTyping && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs text-text-muted">typing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Video Call Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Video"
          onClick={onVideoCallClick}
          className="hidden sm:flex"
          title="Start video call"
        />

        {/* Project Details Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="FileText"
          onClick={onProjectDetailsClick}
          className="hidden sm:flex"
          title="View project details"
        />

        {/* Menu Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowDropdown(!showDropdown)}
            title="More options"
          />

          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-20">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onProjectDetailsClick();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
                  >
                    <Icon name="FileText" size={16} />
                    Project Details
                  </button>
                  
                  <button
                    onClick={() => {
                      onVideoCallClick();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
                  >
                    <Icon name="Video" size={16} />
                    Video Call
                  </button>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  <button
                    onClick={() => {
                      // Handle search in conversation
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
                  >
                    <Icon name="Search" size={16} />
                    Search Messages
                  </button>
                  
                  <button
                    onClick={() => {
                      // Handle mute conversation
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
                  >
                    <Icon name="BellOff" size={16} />
                    Mute Notifications
                  </button>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  <button
                    onClick={() => {
                      // Handle report user
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 flex items-center gap-3"
                  >
                    <Icon name="Flag" size={16} />
                    Report User
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;