import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConversationList from './components/ConversationList';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import ProjectSidebar from './components/ProjectSidebar';

const PrivateChatSystem = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      participant: {
        id: 101,
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        isVerified: true,
        isTyping: false
      },
      projectTitle: "E-commerce Website Development",
      projectStatus: "in-progress",
      lastMessage: {
        id: 1001,
        content: "I\'ve completed the homepage design. Could you please review it and let me know your thoughts?",
        timestamp: new Date(Date.now() - 300000),
        sender: "Sarah Wilson",
        type: "text",
        status: "delivered"
      },
      unreadCount: 2,
      messages: [
        {
          id: 1001,
          content: "Hi John! I\'m excited to start working on your e-commerce project.",
          timestamp: new Date(Date.now() - 86400000),
          sender: {
            id: 101,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 1002,
          content: "Great! I\'m looking forward to seeing what you create. I\'ve attached the brand guidelines and product catalog.",
          timestamp: new Date(Date.now() - 86000000),
          sender: {
            id: 1,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          type: "file",
          attachment: {
            name: "Brand_Guidelines.pdf",
            type: "application/pdf",
            size: 2048576,
            url: "https://example.com/brand-guidelines.pdf"
          },
          status: "read"
        },
        {
          id: 1003,
          content: "Perfect! I\'ll review these and start with the wireframes.",
          timestamp: new Date(Date.now() - 85800000),
          sender: {
            id: 101,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 1004,
          content: "Here's the initial homepage mockup. What do you think?",
          timestamp: new Date(Date.now() - 3600000),
          sender: {
            id: 101,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          type: "image",
          attachment: {
            name: "Homepage_Mockup.png",
            type: "image/png",
            size: 1024000,
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          },
          status: "read"
        },
        {
          id: 1005,
          content: "This looks amazing! I love the clean design and the color scheme matches our brand perfectly. Can we add a testimonials section below the hero area?",
          timestamp: new Date(Date.now() - 1800000),
          sender: {
            id: 1,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 1006,
          content: "Absolutely! I\'ll add a testimonials section and send you the updated version by tomorrow.",
          timestamp: new Date(Date.now() - 900000),
          sender: {
            id: 101,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 1007,
          content: "I\'ve completed the homepage design. Could you please review it and let me know your thoughts?",
          timestamp: new Date(Date.now() - 300000),
          sender: {
            id: 101,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "delivered"
        }
      ]
    },
    {
      id: 2,
      participant: {
        id: 102,
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        isVerified: true,
        isTyping: false
      },
      projectTitle: "Mobile App UI/UX Design",
      projectStatus: "completed",
      lastMessage: {
        id: 2001,
        content: "Thank you for the great work! The app design exceeded my expectations.",
        timestamp: new Date(Date.now() - 172800000),
        sender: "You",
        type: "text",
        status: "read"
      },
      unreadCount: 0,
      messages: [
        {
          id: 2001,
          content: "Hi! I\'m ready to start working on your mobile app design project.",
          timestamp: new Date(Date.now() - 604800000),
          sender: {
            id: 102,
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 2002,
          content: "Excellent! I\'ve prepared a detailed brief with all the requirements.",
          timestamp: new Date(Date.now() - 604700000),
          sender: {
            id: 1,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 2003,
          content: "Project completed successfully! Here are the final designs.",
          timestamp: new Date(Date.now() - 259200000),
          sender: {
            id: 102,
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          type: "system",
          status: "read"
        },
        {
          id: 2004,
          content: "Thank you for the great work! The app design exceeded my expectations.",
          timestamp: new Date(Date.now() - 172800000),
          sender: {
            id: 1,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        }
      ]
    },
    {
      id: 3,
      participant: {
        id: 103,
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        isVerified: false,
        isTyping: true
      },
      projectTitle: "Content Writing & SEO",
      projectStatus: "active",
      lastMessage: {
        id: 3001,
        content: "I\'ll have the first draft ready by Friday. Should I focus more on technical SEO or content optimization?",
        timestamp: new Date(Date.now() - 7200000),
        sender: "Emily Rodriguez",
        type: "text",
        status: "delivered"
      },
      unreadCount: 1,
      messages: [
        {
          id: 3001,
          content: "Hello! I\'m excited to help you with your content writing and SEO project.",
          timestamp: new Date(Date.now() - 432000000),
          sender: {
            id: 103,
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 3002,
          content: "Great! I need help with blog content and improving our search rankings.",
          timestamp: new Date(Date.now() - 431900000),
          sender: {
            id: 1,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "read"
        },
        {
          id: 3003,
          content: "I\'ll have the first draft ready by Friday. Should I focus more on technical SEO or content optimization?",
          timestamp: new Date(Date.now() - 7200000),
          sender: {
            id: 103,
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          },
          type: "text",
          status: "delivered"
        }
      ]
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark messages as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // Hide conversation list on mobile
    if (window.innerWidth < 768) {
      setShowConversationList(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversationList(true);
    setActiveConversation(null);
    setShowSidebar(false);
  };

  const handleSendMessage = (messageData) => {
    if (!activeConversation) return;

    const newMessage = {
      id: Date.now(),
      content: messageData.content,
      timestamp: messageData.timestamp,
      sender: {
        id: 1,
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: messageData.type,
      attachment: messageData.attachment,
      status: "delivered"
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: {
                id: newMessage.id,
                content: newMessage.content,
                timestamp: newMessage.timestamp,
                sender: "You",
                type: newMessage.type,
                status: newMessage.status
              }
            }
          : conv
      )
    );

    // Update active conversation
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      type: file.type.startsWith('image/') ? 'image' : 'file',
      content: '',
      timestamp: new Date(),
      attachment: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }
    };

    handleSendMessage(fileMessage);
  };

  const handleImageClick = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  const handleProjectDetailsClick = () => {
    setShowSidebar(!showSidebar);
  };

  const handleVideoCallClick = () => {
    // Handle video call functionality
    console.log('Starting video call...');
  };

  const handleCompleteProject = () => {
    if (!activeConversation) return;
    
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversation.id
          ? { ...conv, projectStatus: 'completed' }
          : conv
      )
    );
    
    setActiveConversation(prev => ({
      ...prev,
      projectStatus: 'completed'
    }));
  };

  const handleDisputeClick = () => {
    navigate('/dispute-resolution');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Conversation List */}
        <div className={`${
          showConversationList ? 'flex' : 'hidden'
        } md:flex w-full md:w-80 flex-shrink-0`}>
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={handleConversationSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            className="w-full"
          />
        </div>

        {/* Chat Area */}
        <div className={`${
          !showConversationList || activeConversation ? 'flex' : 'hidden'
        } md:flex flex-1 flex-col`}>
          {/* Chat Header */}
          <ChatHeader
            conversation={activeConversation}
            onBackClick={handleBackToConversations}
            onProjectDetailsClick={handleProjectDetailsClick}
            onVideoCallClick={handleVideoCallClick}
          />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation ? (
              <>
                {activeConversation.messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.sender.id === 1}
                    showAvatar={
                      index === 0 || 
                      activeConversation.messages[index - 1].sender.id !== message.sender.id
                    }
                    onImageClick={handleImageClick}
                    onFileDownload={(attachment) => window.open(attachment.url, '_blank')}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Welcome to Private Chat
                </h3>
                <p className="text-text-secondary max-w-md">
                  Select a conversation from the sidebar to start messaging with your project collaborators.
                </p>
              </div>
            )}
          </div>

          {/* Message Input */}
          {activeConversation && (
            <MessageInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={activeConversation.projectStatus === 'completed'}
              placeholder={
                activeConversation.projectStatus === 'completed'
                  ? "This project has been completed"
                  : "Type a message..."
              }
            />
          )}
        </div>

        {/* Project Sidebar */}
        {showSidebar && activeConversation && (
          <ProjectSidebar
            conversation={activeConversation}
            onClose={() => setShowSidebar(false)}
            onDisputeClick={handleDisputeClick}
            onCompleteProject={handleCompleteProject}
            className="hidden lg:flex"
          />
        )}
      </div>

      {/* Image Preview Modal */}
      {imagePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-75 z-10"
            />
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Mobile Project Sidebar */}
      {showSidebar && activeConversation && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute right-0 top-0 h-full w-80 max-w-full">
            <ProjectSidebar
              conversation={activeConversation}
              onClose={() => setShowSidebar(false)}
              onDisputeClick={handleDisputeClick}
              onCompleteProject={handleCompleteProject}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateChatSystem;