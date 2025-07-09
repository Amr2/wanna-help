import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ user }) => {
  const [reviews] = useState([
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-15",
      projectTitle: "E-commerce Website Development",
      review: `Excellent work! The website exceeded our expectations. Professional communication throughout the project and delivered on time. The attention to detail was remarkable and the final product was exactly what we needed for our business.`,
      response: `Thank you Sarah! It was a pleasure working with you and your team. I'm glad the website is helping your business grow. Looking forward to future collaborations!`,
      responseDate: "2024-01-16",
      helpful: 12
    },
    {
      id: 2,
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      date: "2024-01-10",
      projectTitle: "Mobile App UI Design",
      review: `Great designer with creative ideas. The app design looks modern and user-friendly. Communication was good, though there were a few minor revisions needed. Overall very satisfied with the outcome.`,
      response: null,
      helpful: 8
    },
    {
      id: 3,
      clientName: "Emily Rodriguez",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-05",
      projectTitle: "Content Writing for Blog",
      review: `Outstanding content quality! The articles were well-researched, engaging, and perfectly aligned with our brand voice. Fast turnaround time and excellent communication. Highly recommend!`,
      response: `Thank you Emily! I enjoyed working on your blog content. Your clear brief and feedback made the process smooth. Best of luck with your content marketing!`,
      responseDate: "2024-01-06",
      helpful: 15
    },
    {
      id: 4,
      clientName: "David Thompson",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 3,
      date: "2023-12-28",
      projectTitle: "Logo Design",
      review: `The logo design was decent but took longer than expected. The final result was good but required multiple revisions to get it right. Communication could have been better during the process.`,
      response: `Thank you for the feedback David. I apologize for the delays and will work on improving my communication. I'm glad you're happy with the final logo design.`,
      responseDate: "2023-12-29",
      helpful: 3
    }
  ]);

  const [showResponseForm, setShowResponseForm] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [filter, setFilter] = useState('all');

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / totalReviews) * 100
  }));

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter));

  const handleSubmitResponse = (reviewId) => {
    if (responseText.trim()) {
      // In a real app, this would make an API call
      console.log('Submitting response for review:', reviewId, responseText);
      setShowResponseForm(null);
      setResponseText('');
    }
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={`${
              star <= rating 
                ? 'text-warning fill-current' :'text-secondary-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Reviews & Ratings
        </h2>
        <div className="flex items-center gap-2">
          <Icon name="Star" size={20} className="text-warning fill-current" />
          <span className="text-lg font-semibold text-text-primary">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-text-secondary">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="text-center p-6 bg-surface-hover rounded-lg">
            <div className="text-4xl font-bold text-text-primary mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="mb-2">
              {renderStars(Math.round(averageRating), 20)}
            </div>
            <div className="text-sm text-text-secondary">
              Based on {totalReviews} reviews
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-text-primary">{rating}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            filter === 'all' ?'bg-primary text-primary-foreground' :'bg-surface-hover text-text-secondary hover:text-text-primary'
          }`}
        >
          All Reviews ({totalReviews})
        </button>
        {[5, 4, 3, 2, 1].map(rating => {
          const count = reviews.filter(review => review.rating === rating).length;
          if (count === 0) return null;
          
          return (
            <button
              key={rating}
              onClick={() => setFilter(rating.toString())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                filter === rating.toString()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {rating} Stars ({count})
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                  <Image
                    src={review.clientAvatar}
                    alt={review.clientName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {review.clientName}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {review.projectTitle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {renderStars(review.rating)}
                <p className="text-sm text-text-secondary mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-text-primary leading-relaxed">
                {review.review}
              </p>
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
                  <Icon name="ThumbsUp" size={16} />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
                  <Icon name="Flag" size={16} />
                  <span>Report</span>
                </button>
              </div>
              
              {!review.response && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  onClick={() => setShowResponseForm(review.id)}
                >
                  Respond
                </Button>
              )}
            </div>

            {/* Provider Response */}
            {review.response && (
              <div className="mt-4 ml-8 p-4 bg-primary-50 border-l-4 border-primary rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="User" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Response from {user.name}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {new Date(review.responseDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-text-primary text-sm leading-relaxed">
                  {review.response}
                </p>
              </div>
            )}

            {/* Response Form */}
            {showResponseForm === review.id && (
              <div className="mt-4 ml-8 p-4 bg-surface-hover rounded-lg">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Respond to this review
                </h4>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write a professional response to this review..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary placeholder-text-muted bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-3"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSubmitResponse(review.id)}
                    disabled={!responseText.trim()}
                  >
                    Submit Response
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowResponseForm(null);
                      setResponseText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No Reviews Yet
          </h3>
          <p className="text-text-secondary">
            Complete your first project to start receiving reviews from clients
          </p>
        </div>
      )}

      {/* Review Guidelines */}
      <div className="mt-8 p-4 bg-accent-50 border border-accent-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-800 mb-1">
              Review Response Guidelines
            </h4>
            <ul className="text-sm text-accent-700 space-y-1">
              <li>• Respond professionally and courteously to all reviews</li>
              <li>• Thank clients for positive feedback and address concerns constructively</li>
              <li>• Keep responses concise and relevant to the project</li>
              <li>• Use responses as an opportunity to showcase your professionalism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;