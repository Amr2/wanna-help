import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import QuickStatsCards from "./components/QuickStatsCards";
import ActivityFeed from "./components/ActivityFeed";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import CalendarSection from "./components/CalendarSection";
import NotificationCenter from "./components/NotificationCenter";
import OpportunityList from "./components/OpportunityList";

const ProviderDashboard = () => {
  const [userRole, setUserRole] = useState("provider");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    quickStats: {
      pendingProposals: 12,
      activeProjects: 8,
      monthlyEarnings: 4850,
      proposalSuccessRate: 68,
    },
    recentActivity: [
      {
        id: 1,
        type: "new_request",
        title: "Web Development for E-commerce Site",
        description:
          "Looking for a skilled developer to build a modern e-commerce platform",
        budget: "$2,500 - $5,000",
        location: "San Francisco, CA",
        postedAt: "2024-01-15T10:30:00Z",
        category: "Web Development",
        urgency: "high",
      },
      {
        id: 2,
        type: "bid_response",
        title: "Mobile App UI/UX Design",
        description:
          "Your proposal has been accepted! Client wants to schedule a call.",
        status: "accepted",
        postedAt: "2024-01-15T09:15:00Z",
        category: "Design",
      },
      {
        id: 3,
        type: "project_update",
        title: "Restaurant Management System",
        description:
          "Client has requested minor changes to the dashboard layout",
        status: "in_progress",
        postedAt: "2024-01-14T16:45:00Z",
        category: "Web Development",
      },
    ],
    opportunities: [
      {
        id: 1,
        title: "React Developer for SaaS Platform",
        description:
          "We need an experienced React developer to help build our customer management platform...",
        budget: "$3,000 - $6,000",
        location: "Remote",
        postedAt: "2024-01-15T08:00:00Z",
        category: "Web Development",
        skills: ["React", "Node.js", "PostgreSQL"],
        clientRating: 4.8,
        proposalCount: 3,
        urgency: "medium",
      },
      {
        id: 2,
        title: "Mobile App Development - iOS/Android",
        description:
          "Looking for a mobile developer to create a fitness tracking app with social features...",
        budget: "$5,000 - $10,000",
        location: "New York, NY",
        postedAt: "2024-01-14T14:20:00Z",
        category: "Mobile Development",
        skills: ["React Native", "Firebase", "REST APIs"],
        clientRating: 4.9,
        proposalCount: 7,
        urgency: "high",
      },
    ],
    performance: {
      proposalSuccessRate: 68,
      clientSatisfaction: 4.7,
      averageProjectValue: 3200,
      totalEarnings: 48500,
      monthlyTrend: [
        { month: "Jul", earnings: 3200, projects: 6 },
        { month: "Aug", earnings: 4100, projects: 8 },
        { month: "Sep", earnings: 3800, projects: 7 },
        { month: "Oct", earnings: 4500, projects: 9 },
        { month: "Nov", earnings: 4200, projects: 8 },
        { month: "Dec", earnings: 4850, projects: 10 },
      ],
    },
    upcomingEvents: [
      {
        id: 1,
        title: "Client Meeting - E-commerce Project",
        date: "2024-01-16T14:00:00Z",
        type: "meeting",
        client: "TechCorp Inc.",
      },
      {
        id: 2,
        title: "Project Deadline - Mobile App",
        date: "2024-01-18T23:59:00Z",
        type: "deadline",
        client: "StartupXYZ",
      },
    ],
    notifications: [
      {
        id: 1,
        type: "bid_response",
        title: "Proposal Accepted",
        message:
          'Your proposal for "Web Development Project" has been accepted.',
        time: "2024-01-15T11:30:00Z",
        read: false,
      },
      {
        id: 2,
        type: "new_message",
        title: "New Message",
        message: "Client has sent you a message about the mobile app project.",
        time: "2024-01-15T10:45:00Z",
        read: false,
      },
      {
        id: 3,
        type: "payment",
        title: "Payment Received",
        message: "Payment of $2,500 has been received for completed project.",
        time: "2024-01-14T16:20:00Z",
        read: true,
      },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    console.log(role, token);
    if (!token) {
      navigate("/user-login");
      return;
    }

    if (role !== "provider") {
      navigate("/dashboard");
      return;
    }

    setUserRole(role);

    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-surface rounded-xl p-6 card-shadow"
                  >
                    <div className="h-4 bg-secondary-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-xl p-6 card-shadow">
                  <div className="h-6 bg-secondary-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 bg-secondary-200 rounded"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-6 card-shadow">
                  <div className="h-6 bg-secondary-200 rounded w-1/3 mb-4"></div>
                  <div className="h-64 bg-secondary-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary font-heading">
                Provider Dashboard
              </h1>
              <p className="text-text-secondary mt-2">
                Welcome back! Here's your business overview and latest
                opportunities.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="mb-8">
            <QuickStatsCards stats={dashboardData.quickStats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Feed */}
            <ActivityFeed activities={dashboardData.recentActivity} />

            {/* Performance Analytics */}
            <PerformanceAnalytics data={dashboardData.performance} />
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* New Opportunities */}
            <div className="lg:col-span-2">
              <OpportunityList opportunities={dashboardData.opportunities} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Calendar Section */}
              <CalendarSection events={dashboardData.upcomingEvents} />

              {/* Notification Center */}
              <NotificationCenter notifications={dashboardData.notifications} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
