import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import BidCard from './components/BidCard';
import BidComparison from './components/BidComparison';
import BidFilters from './components/BidFilters';
import RequestSummary from './components/RequestSummary';
import EvaluationNotes from './components/EvaluationNotes';

const BidManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [bids, setBids] = useState([]);
  const [filteredBids, setFilteredBids] = useState([]);
  const [selectedBids, setSelectedBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('score');
  const [filterOptions, setFilterOptions] = useState({
    priceRange: 'all',
    rating: 'all',
    verificationStatus: 'all',
    responseTime: 'all'
  });
  const [showComparison, setShowComparison] = useState(false);
  const [evaluationNotes, setEvaluationNotes] = useState({});

  // Mock data for demonstration
  const mockRequest = {
    id: 1,
    title: 'Website Development for Small Business',
    description: 'Need a professional website for my consulting business with modern design and responsive layout.',
    budget: '$2,000 - $5,000',
    category: 'Web Development',
    deadline: '2024-03-01',
    requirements: [
      'Responsive design',
      'CMS integration',
      'SEO optimization',
      'Contact forms',
      'Analytics setup'
    ],
    createdAt: '2024-01-15'
  };

  const mockBids = [
    {
      id: 1,
      providerId: 'provider_1',
      providerName: 'John Smith',
      providerRating: 4.8,
      providerAvatar: '/assets/images/no_image.png',
      isVerified: true,
      price: 3500,
      timeline: '4 weeks',
      responseTime: '2 hours',
      proposal: 'I have 8+ years of experience in web development and have created over 100 websites for small businesses. I will create a modern, responsive website with all the features you need.',
      portfolioSamples: [
        { id: 1, title: 'E-commerce Site', image: '/assets/images/no_image.png' },
        { id: 2, title: 'Business Website', image: '/assets/images/no_image.png' }
      ],
      skills: ['React', 'Node.js', 'WordPress', 'SEO'],
      completedProjects: 127,
      score: 92,
      submittedAt: '2024-01-16T10:30:00Z',
      lastModified: '2024-01-16T10:30:00Z'
    },
    {
      id: 2,
      providerId: 'provider_2',
      providerName: 'Sarah Johnson',
      providerRating: 4.9,
      providerAvatar: '/assets/images/no_image.png',
      isVerified: true,
      price: 2800,
      timeline: '3 weeks',
      responseTime: '1 hour',
      proposal: 'I specialize in creating beautiful, conversion-focused websites for small businesses. I will deliver a website that not only looks great but also drives results.',
      portfolioSamples: [
        { id: 3, title: 'Restaurant Website', image: '/assets/images/no_image.png' },
        { id: 4, title: 'Consulting Site', image: '/assets/images/no_image.png' }
      ],
      skills: ['WordPress', 'Webflow', 'UI/UX', 'SEO'],
      completedProjects: 89,
      score: 95,
      submittedAt: '2024-01-16T14:15:00Z',
      lastModified: '2024-01-17T09:20:00Z'
    },
    {
      id: 3,
      providerId: 'provider_3',
      providerName: 'Mike Chen',
      providerRating: 4.6,
      providerAvatar: '/assets/images/no_image.png',
      isVerified: false,
      price: 4200,
      timeline: '5 weeks',
      responseTime: '4 hours',
      proposal: 'I offer comprehensive web development services including custom development, CMS integration, and ongoing support. Your website will be built with the latest technologies.',
      portfolioSamples: [
        { id: 5, title: 'Corporate Website', image: '/assets/images/no_image.png' },
        { id: 6, title: 'Portfolio Site', image: '/assets/images/no_image.png' }
      ],
      skills: ['React', 'PHP', 'MySQL', 'Laravel'],
      completedProjects: 45,
      score: 78,
      submittedAt: '2024-01-17T16:45:00Z',
      lastModified: '2024-01-17T16:45:00Z'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSelectedRequest(mockRequest);
        setBids(mockBids);
        setFilteredBids(mockBids);
      } catch (error) {
        console.error('Error fetching bid data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  useEffect(() => {
    // Filter and sort bids
    let filtered = [...bids];

    // Apply filters
    if (filterOptions.priceRange !== 'all') {
      const [min, max] = filterOptions.priceRange.split('-').map(Number);
      filtered = filtered.filter(bid => bid.price >= min && bid.price <= max);
    }

    if (filterOptions.rating !== 'all') {
      const minRating = parseFloat(filterOptions.rating);
      filtered = filtered.filter(bid => bid.providerRating >= minRating);
    }

    if (filterOptions.verificationStatus !== 'all') {
      const isVerified = filterOptions.verificationStatus === 'verified';
      filtered = filtered.filter(bid => bid.isVerified === isVerified);
    }

    // Sort bids
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.providerRating - a.providerRating;
        case 'response_time':
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        default:
          return 0;
      }
    });

    setFilteredBids(filtered);
  }, [bids, filterOptions, sortBy]);

  const handleBidSelect = (bidId) => {
    setSelectedBids(prev => {
      const isSelected = prev.includes(bidId);
      if (isSelected) {
        return prev.filter(id => id !== bidId);
      } else if (prev.length < 3) {
        return [...prev, bidId];
      }
      return prev;
    });
  };

  const handleAcceptBid = (bidId) => {
    const bid = bids.find(b => b.id === bidId);
    if (bid) {
      navigate(`/agreement-workflow?bidId=${bidId}&requestId=${requestId}`);
    }
  };

  const handleRejectBid = (bidId) => {
    setBids(prev => prev.filter(b => b.id !== bidId));
    setSelectedBids(prev => prev.filter(id => id !== bidId));
  };

  const handleMessageProvider = (providerId) => {
    navigate(`/private-chat-system?request=${requestId}&provider=${providerId}`);
  };

  const handleAddNote = (bidId, note) => {
    setEvaluationNotes(prev => ({
      ...prev,
      [bidId]: note
    }));
  };

  const getSelectedBidDetails = () => {
    return selectedBids.map(bidId => bids.find(b => b.id === bidId)).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading bids...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bid Management - {selectedRequest?.title} - Wanna Help</title>
        <meta name="description" content="Evaluate and compare bids for your service request" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/service-request-dashboard')}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading">
                    Bid Management
                  </h1>
                  <p className="text-text-secondary">
                    {filteredBids.length} bid{filteredBids.length !== 1 ? 's' : ''} for "{selectedRequest?.title}"
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {selectedBids.length > 0 && (
                  <Button
                    variant="outline"
                    iconName="GitCompare"
                    onClick={() => setShowComparison(true)}
                    className="whitespace-nowrap"
                  >
                    Compare ({selectedBids.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Request Summary */}
            <RequestSummary request={selectedRequest} />

            {/* Filters and Sorting */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <BidFilters
                  filterOptions={filterOptions}
                  onFilterChange={setFilterOptions}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>

            {/* Bids List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredBids.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-lg border border-border">
                  <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No bids match your criteria
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your filters to see more bids
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setFilterOptions({
                      priceRange: 'all',
                      rating: 'all',
                      verificationStatus: 'all',
                      responseTime: 'all'
                    })}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredBids.map((bid) => (
                  <BidCard
                    key={bid.id}
                    bid={bid}
                    isSelected={selectedBids.includes(bid.id)}
                    evaluationNote={evaluationNotes[bid.id]}
                    onSelect={() => handleBidSelect(bid.id)}
                    onAccept={() => handleAcceptBid(bid.id)}
                    onReject={() => handleRejectBid(bid.id)}
                    onMessage={() => handleMessageProvider(bid.providerId)}
                    onAddNote={(note) => handleAddNote(bid.id, note)}
                  />
                ))
              )}
            </div>

            {/* Evaluation Notes */}
            <EvaluationNotes
              notes={evaluationNotes}
              onUpdateNote={handleAddNote}
            />
          </div>
        </div>

        {/* Bid Comparison Modal */}
        {showComparison && (
          <BidComparison
            bids={getSelectedBidDetails()}
            onClose={() => setShowComparison(false)}
            onAccept={handleAcceptBid}
            onMessage={handleMessageProvider}
          />
        )}
      </div>
    </>
  );
};

export default BidManagement;