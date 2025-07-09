import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ConversationList = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect,
  searchQuery,
  onSearchChange,
  className = '' 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredConversations = conversations.filter(conversation =>
    conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) {
      return messageTime.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className={`flex flex-col h-full bg-surface border-r border-border ${className}`}>
      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              isSearchFocused ? 'text-primary' : 'text-text-muted'
            }`}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-sm text-text-secondary">
              {searchQuery 
                ? 'Try adjusting your search terms' :'Start a conversation when you have an active agreement'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation)}
                className={`w-full p-4 text-left hover:bg-surface-hover transition-colors duration-200 ${
                  activeConversation?.id === conversation.id ? 'bg-primary-50 border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation.participant.avatar}
                      alt={conversation.participant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-text-primary truncate">
                        {conversation.participant.name}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {conversation.unreadCount > 0 && (
                          <NotificationBadge 
                            count={conversation.unreadCount}
                            size="sm"
                            type="primary"
                          />
                        )}
                        <span className="text-xs text-text-muted">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-text-secondary truncate mb-1">
                      {conversation.projectTitle}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      {conversation.lastMessage.sender === 'You' && (
                        <Icon 
                          name={conversation.lastMessage.status === 'delivered' ? 'Check' : 'CheckCheck'} 
                          size={14} 
                          className={`flex-shrink-0 ${
                            conversation.lastMessage.status === 'read' ? 'text-primary' : 'text-text-muted'
                          }`}
                        />
                      )}
                      <p className="text-sm text-text-muted truncate">
                        {conversation.lastMessage.type === 'file' 
                          ? `📎 ${conversation.lastMessage.fileName}`
                          : truncateMessage(conversation.lastMessage.content)
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;