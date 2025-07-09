import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import RequestCard from './components/RequestCard';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import TabNavigation from './components/TabNavigation';
import AnalyticsWidget from './components/AnalyticsWidget';
import NotificationPanel from './components/NotificationPanel';

const ServiceRequestDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    category: 'all',
    status: 'all',
    dateRange: 'all'
  });
  const [analytics, setAnalytics] = useState({
    totalRequests: 0,
    activeBids: 0,
    averageResponseTime: 0,
    completionRate: 0
  });
  const [notifications, setNotifications] = useState([]);

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 1,
      title: 'Website Development for Small Business',
      description: 'Need a professional website for my consulting business',
      category: 'Web Development',
      status: 'active',
      budget: '$2,000 - $5,000',
      bidCount: 8,
      timeRemaining: '5 days',
      viewCount: 124,
      createdAt: '2024-01-15',
      image: '/assets/images/no_image.png'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Looking for a modern and user-friendly mobile app design',
      category: 'Design',
      status: 'active',
      budget: '$1,500 - $3,000',
      bidCount: 12,
      timeRemaining: '3 days',
      viewCount: 89,
      createdAt: '2024-01-20',
      image: '/assets/images/no_image.png'
    },
    {
      id: 3,
      title: 'Content Writing for Blog',
      description: 'Need quality content for technology blog',
      category: 'Writing',
      status: 'completed',
      budget: '$500 - $1,000',
      bidCount: 5,
      timeRemaining: 'Completed',
      viewCount: 67,
      createdAt: '2024-01-10',
      image: '/assets/images/no_image.png'
    },
    {
      id: 4,
      title: 'E-commerce Platform Setup',
      description: 'Setup and configure online store with payment integration',
      category: 'E-commerce',
      status: 'draft',
      budget: '$3,000 - $7,000',
      bidCount: 0,
      timeRemaining: 'Draft',
      viewCount: 0,
      createdAt: '2024-01-25',
      image: '/assets/images/no_image.png'
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'new_bid',
      title: 'New Bid Received',
      message: 'John Doe submitted a bid for "Website Development"',
      timestamp: '2 minutes ago',
      isRead: false,
      requestId: 1
    },
    {
      id: 2,
      type: 'bid_update',
      title: 'Bid Updated',
      message: 'Sarah Smith updated their proposal for "Mobile App Design"',
      timestamp: '1 hour ago',
      isRead: false,
      requestId: 2
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRequests(mockRequests);
        setNotifications(mockNotifications);
        setAnalytics({
          totalRequests: mockRequests.length,
          activeBids: mockRequests.reduce((sum, req) => sum + req.bidCount, 0),
          averageResponseTime: '2.5 hours',
          completionRate: '85%'
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter requests based on active tab, search, and filters
    let filtered = requests;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(req => {
        switch (activeTab) {
          case 'active':
            return req.status === 'active';
          case 'completed':
            return req.status === 'completed';
          case 'drafts':
            return req.status === 'draft';
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by options
    if (filterOptions.category !== 'all') {
      filtered = filtered.filter(req => req.category === filterOptions.category);
    }

    if (filterOptions.status !== 'all') {
      filtered = filtered.filter(req => req.status === filterOptions.status);
    }

    setFilteredRequests(filtered);
  }, [requests, activeTab, searchTerm, filterOptions]);

  const handleNewRequest = () => {
    navigate('/service-request-creation');
  };

  const handleViewBids = (requestId) => {
    navigate(`/bid-management?requestId=${requestId}`);
  };

  const handleEditRequest = (requestId) => {
    navigate(`/service-request-creation?edit=${requestId}`);
  };

  const handleMessageProvider = (requestId, providerId) => {
    navigate(`/private-chat-system?request=${requestId}&provider=${providerId}`);
  };

  const tabConfig = [
    { key: 'active', label: 'Active', count: requests.filter(r => r.status === 'active').length },
    { key: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length },
    { key: 'drafts', label: 'Drafts', count: requests.filter(r => r.status === 'draft').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Service Request Dashboard - Wanna Help</title>
        <meta name="description" content="Manage your service requests, view bids, and track project progress" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading">
                  Service Request Dashboard
                </h1>
                <p className="text-text-secondary mt-1">
                  Manage your service requests and track project progress
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Bell"
                  size="md"
                  className="relative"
                  onClick={() => {/* Handle notifications */}}
                >
                  <span className="sr-only">Notifications</span>
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </Button>
                
                <Button
                  variant="primary"
                  iconName="Plus"
                  size="md"
                  onClick={handleNewRequest}
                  className="whitespace-nowrap"
                >
                  New Request
                </Button>
              </div>
            </div>

            {/* Analytics Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <AnalyticsWidget
                title="Total Requests"
                value={analytics.totalRequests}
                icon="FileText"
                color="primary"
              />
              <AnalyticsWidget
                title="Active Bids"
                value={analytics.activeBids}
                icon="Users"
                color="success"
              />
              <AnalyticsWidget
                title="Avg Response Time"
                value={analytics.averageResponseTime}
                icon="Clock"
                color="warning"
              />
              <AnalyticsWidget
                title="Completion Rate"
                value={analytics.completionRate}
                icon="CheckCircle"
                color="accent"
              />
            </div>

            {/* Notifications Panel */}
            {notifications.filter(n => !n.isRead).length > 0 && (
              <NotificationPanel
                notifications={notifications.filter(n => !n.isRead)}
                onViewBids={handleViewBids}
                onDismiss={(id) => setNotifications(prev => 
                  prev.map(n => n.id === id ? { ...n, isRead: true } : n)
                )}
              />
            )}

            {/* Tab Navigation */}
            <TabNavigation
              tabs={tabConfig}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search requests by title, description, or category..."
                />
              </div>
              <FilterBar
                filterOptions={filterOptions}
                onFilterChange={setFilterOptions}
              />
            </div>

            {/* Requests Grid */}
            <div className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-lg border border-border">
                  <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {searchTerm || Object.values(filterOptions).some(v => v !== 'all') 
                      ? 'No matching requests' :'No requests yet'
                    }
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {searchTerm || Object.values(filterOptions).some(v => v !== 'all')
                      ? 'Try adjusting your search or filters' :'Create your first service request to get started'
                    }
                  </p>
                  {!searchTerm && !Object.values(filterOptions).some(v => v !== 'all') && (
                    <Button
                      variant="primary"
                      iconName="Plus"
                      onClick={handleNewRequest}
                    >
                      Create Request
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onViewBids={() => handleViewBids(request.id)}
                      onEditRequest={() => handleEditRequest(request.id)}
                      onMessageProvider={(providerId) => handleMessageProvider(request.id, providerId)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceRequestDashboard;