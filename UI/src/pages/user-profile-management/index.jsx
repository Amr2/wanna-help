import React, { useState, useEffect } from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import BasicInfoForm from './components/BasicInfoForm';
import ProfessionalInfoForm from './components/ProfessionalInfoForm';
import PortfolioSection from './components/PortfolioSection';
import VerificationSection from './components/VerificationSection';
import ReviewsSection from './components/ReviewsSection';
import SettingsSection from './components/SettingsSection';

const UserProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [userRole, setUserRole] = useState('provider');
  const [user, setUser] = useState({
    id: 1,
    name: "Alexandra Thompson",
    email: "alexandra.thompson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA, USA",
    bio: `Experienced full-stack developer with 8+ years of expertise in React, Node.js, and cloud technologies. I specialize in building scalable web applications and have successfully delivered 50+ projects for clients ranging from startups to Fortune 500 companies.\n\nMy approach focuses on clean code, user experience, and delivering solutions that drive business growth. I'm passionate about staying current with emerging technologies and best practices in software development.`,
    website: "https://alexandrathompson.dev",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    completionPercentage: 85,
    showEmail: true,
    showPhone: false,
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexandrathompson",
      twitter: "https://twitter.com/alexthompsondev",
      facebook: "",
      instagram: ""
    },
    professionalInfo: {
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      experience: "8",
      hourlyRate: "75",
      availability: "part-time",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL", "Docker", "Python"],
      services: ["Web Development", "Mobile Development", "Technical Consulting", "Code Review"],
      languages: ["English", "Spanish", "French"],
      education: [
        {
          degree: "Bachelor of Computer Science",
          institution: "Stanford University",
          year: "2016"
        }
      ]
    },
    portfolio: [
      {
        id: 1,
        title: "E-commerce Platform Redesign",
        description: `Complete redesign and development of a multi-vendor e-commerce platform serving 10,000+ daily users. Implemented modern React architecture with TypeScript, integrated payment gateways, and optimized performance resulting in 40% faster load times.\n\nKey achievements:\n• Increased conversion rate by 25%\n• Reduced bounce rate by 35%\n• Implemented real-time inventory management\n• Built responsive design for all devices`,
        category: "Web Development",
        images: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
        ],
        link: "https://demo-ecommerce.alexandrathompson.dev",
        completedDate: "2024-01-15",
        createdAt: "2024-01-20T10:00:00Z"
      },
      {
        id: 2,
        title: "Healthcare Management System",
        description: `Developed a comprehensive healthcare management system for a medical practice with 50+ doctors. The system includes patient management, appointment scheduling, billing, and reporting features.\n\nTechnologies used: React, Node.js, PostgreSQL, AWS\nFeatures: HIPAA compliance, real-time notifications, automated billing`,
        category: "Web Development",
        images: [
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
        ],
        link: "https://healthcare-demo.alexandrathompson.dev",
        completedDate: "2023-12-10",
        createdAt: "2023-12-15T14:30:00Z"
      },
      {
        id: 3,
        title: "Mobile Banking App UI/UX",
        description: `Designed and developed the user interface for a mobile banking application with focus on security and user experience. Created intuitive navigation and implemented biometric authentication.\n\nDelivered pixel-perfect designs and interactive prototypes that improved user satisfaction scores by 45%.`,
        category: "Mobile App",
        images: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
        ],
        link: "",
        completedDate: "2023-11-20",
        createdAt: "2023-11-25T09:15:00Z"
      }
    ],
    verification: {
      identity: {
        status: 'verified',
        documents: [
          {
            id: 1,
            name: "passport_scan.pdf",
            size: 2048000,
            type: "application/pdf",
            uploadedAt: "2024-01-01T10:00:00Z",
            status: 'verified'
          }
        ]
      },
      business: {
        status: 'pending',
        documents: [
          {
            id: 2,
            name: "business_license.pdf",
            size: 1536000,
            type: "application/pdf",
            uploadedAt: "2024-01-10T15:30:00Z",
            status: 'pending'
          }
        ]
      },
      skills: {
        status: 'verified',
        certificates: [
          {
            id: 3,
            name: "aws_certification.pdf",
            size: 1024000,
            type: "application/pdf",
            uploadedAt: "2024-01-05T12:00:00Z",
            status: 'verified'
          }
        ]
      },
      background: {
        status: 'verified',
        completed: true,
        startedAt: "2023-12-01T10:00:00Z",
        completedAt: "2023-12-15T16:00:00Z"
      }
    },
    settings: {
      notifications: {
        email: {
          newMessages: true,
          bidUpdates: true,
          projectUpdates: true,
          marketing: false,
          weeklyDigest: true
        },
        push: {
          newMessages: true,
          bidUpdates: true,
          projectUpdates: true
        },
        sms: {
          urgentOnly: false,
          projectDeadlines: true
        }
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        allowDirectMessages: true,
        showContactInfo: false
      },
      security: {
        twoFactorEnabled: true,
        loginAlerts: true,
        sessionTimeout: 30
      },
      preferences: {
        language: 'en',timezone: 'America/Los_Angeles',currency: 'USD',dateFormat: 'MM/DD/YYYY'
      }
    }
  });

  useEffect(() => {
    // Get user role from localStorage or context
    const savedRole = localStorage.getItem('userRole') || 'provider';
    setUserRole(savedRole);
  }, []);

  const handleSave = async (updatedData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({
        ...prev,
        ...updatedData
      }));
      
      console.log('Profile updated successfully:', updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleImageUpload = async (file) => {
    try {
      // Simulate image upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const imageUrl = URL.createObjectURL(file);
      setUser(prev => ({
        ...prev,
        profileImage: imageUrl
      }));
      
      console.log('Profile image updated');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <BasicInfoForm
            user={user}
            onSave={handleSave}
          />
        );
      case 'professional':
        return (
          <ProfessionalInfoForm
            user={user}
            onSave={handleSave}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection
            user={user}
            onSave={handleSave}
          />
        );
      case 'verification':
        return (
          <VerificationSection
            user={user}
            onSave={handleSave}
          />
        );
      case 'reviews':
        return (
          <ReviewsSection
            user={user}
          />
        );
      case 'settings':
        return (
          <SettingsSection
            user={user}
            onSave={handleSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          onImageUpload={handleImageUpload}
        />

        {/* Profile Navigation Tabs */}
        <div className="mt-8">
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userRole={userRole}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfileManagement;