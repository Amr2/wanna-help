import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ 
  onSendMessage, 
  onFileUpload,
  disabled = false,
  placeholder = "Type a message...",
  className = '' 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachmentMenu, setAttachmentMenu] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '👏'];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage({
        type: 'text',
        content: message.trim(),
        timestamp: new Date()
      });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onFileUpload) {
      files.forEach(file => {
        onFileUpload(file);
      });
    }
    e.target.value = '';
    setAttachmentMenu(false);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Start voice recording logic here
      setTimeout(() => {
        setIsRecording(false);
        // Handle voice message
      }, 3000);
    } else {
      setIsRecording(false);
      // Stop recording and send voice message
    }
  };

  return (
    <div className={`border-t border-border bg-surface p-4 ${className}`}>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowEmojiPicker(false)}
          ></div>
          <div className="absolute bottom-full left-4 mb-2 bg-surface border border-border rounded-lg shadow-lg p-3 z-20">
            <div className="grid grid-cols-6 gap-2">
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-surface-hover rounded text-lg transition-colors duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Attachment Menu */}
      {attachmentMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setAttachmentMenu(false)}
          ></div>
          <div className="absolute bottom-full left-4 mb-2 bg-surface border border-border rounded-lg shadow-lg py-2 z-20 min-w-48">
            <button
              onClick={() => {
                fileInputRef.current?.click();
                setAttachmentMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
            >
              <Icon name="Image" size={16} className="text-primary" />
              Photo & Video
            </button>
            
            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx';
                input.onchange = handleFileSelect;
                input.click();
                setAttachmentMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
            >
              <Icon name="FileText" size={16} className="text-accent" />
              Document
            </button>
            
            <button
              onClick={() => {
                // Handle location sharing
                setAttachmentMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-hover flex items-center gap-3"
            >
              <Icon name="MapPin" size={16} className="text-success" />
              Location
            </button>
          </div>
        </>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Paperclip"
          onClick={() => setAttachmentMenu(!attachmentMenu)}
          disabled={disabled}
          className="flex-shrink-0"
          title="Attach file"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-4 py-2 pr-12 bg-background border border-border rounded-2xl text-text-primary placeholder-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 min-h-10 max-h-32"
            rows={1}
          />
          
          {/* Emoji Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Smile"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            title="Add emoji"
          />
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <Button
            variant="primary"
            size="sm"
            iconName="Send"
            onClick={handleSend}
            disabled={disabled}
            className="flex-shrink-0 rounded-full w-10 h-10"
            title="Send message"
          />
        ) : (
          <Button
            variant={isRecording ? "error" : "ghost"}
            size="sm"
            iconName={isRecording ? "Square" : "Mic"}
            onClick={handleVoiceRecord}
            disabled={disabled}
            className={`flex-shrink-0 rounded-full w-10 h-10 ${
              isRecording ? 'animate-pulse' : ''
            }`}
            title={isRecording ? "Stop recording" : "Record voice message"}
          />
        )}
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center gap-2 mt-2 text-error">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;