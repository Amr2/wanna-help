import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ 
  message, 
  isOwn, 
  showAvatar = true,
  onImageClick,
  onFileDownload,
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.startsWith('audio/')) return 'Music';
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'FileSpreadsheet';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'Archive';
    return 'File';
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            {message.content && (
              <div className="whitespace-pre-wrap break-words mb-2">
                {message.content}
              </div>
            )}
            <div 
              className="relative rounded-lg overflow-hidden cursor-pointer group max-w-xs"
              onClick={() => onImageClick && onImageClick(message.attachment.url)}
            >
              {!imageError ? (
                <Image
                  src={message.attachment.url}
                  alt={message.attachment.name}
                  className="w-full h-auto max-h-64 object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-32 bg-background border border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="ImageOff" size={24} className="text-text-muted mx-auto mb-2" />
                    <p className="text-xs text-text-muted">Image unavailable</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                />
              </div>
            </div>
            {message.attachment.name && (
              <p className="text-xs text-text-muted">{message.attachment.name}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="space-y-2">
            {message.content && (
              <div className="whitespace-pre-wrap break-words mb-2">
                {message.content}
              </div>
            )}
            <div 
              className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg cursor-pointer hover:bg-surface-hover transition-colors duration-200"
              onClick={() => onFileDownload && onFileDownload(message.attachment)}
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={getFileIcon(message.attachment.type)} 
                  size={20} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">
                  {message.attachment.name}
                </p>
                <p className="text-sm text-text-muted">
                  {formatFileSize(message.attachment.size)}
                </p>
              </div>
              <Icon name="Download" size={18} className="text-text-muted flex-shrink-0" />
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border rounded-full text-sm text-text-muted">
              <Icon name="Info" size={14} />
              {message.content}
            </div>
          </div>
        );

      default:
        return (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        );
    }
  };

  if (message.type === 'system') {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        {renderMessageContent()}
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${className}`}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <div className="flex-shrink-0">
          <Image
            src={message.sender.avatar}
            alt={message.sender.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
      {showAvatar && isOwn && <div className="w-8"></div>}

      {/* Message Content */}
      <div className={`flex flex-col max-w-xs sm:max-w-md ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender Name (for received messages) */}
        {!isOwn && showAvatar && (
          <p className="text-xs text-text-muted mb-1 px-1">
            {message.sender.name}
          </p>
        )}

        {/* Message Bubble */}
        <div
          className={`relative group ${
            isOwn
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface border border-border text-text-primary'
          } rounded-2xl px-4 py-2 shadow-sm`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {renderMessageContent()}

          {/* Message Actions */}
          {showActions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
              <Button
                variant="ghost"
                size="xs"
                iconName="MoreHorizontal"
                className="bg-surface border border-border shadow-sm"
                onClick={() => {
                  // Handle message actions (reply, forward, delete, etc.)
                }}
              />
            </div>
          )}
        </div>

        {/* Timestamp and Status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-text-muted">
            {formatTime(message.timestamp)}
          </span>
          
          {isOwn && (
            <Icon
              name={message.status === 'read' ? 'CheckCheck' : 'Check'}
              size={14}
              className={`${
                message.status === 'read' ? 'text-primary' : 'text-text-muted'
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;