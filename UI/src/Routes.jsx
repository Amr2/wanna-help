import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import ServiceRequestCreation from "pages/service-request-creation";
import ServiceRequestDashboard from "pages/service-request-dashboard";
import BidManagement from "pages/bid-management";
import ProviderDashboard from "pages/provider-dashboard";
import PrivateChatSystem from "pages/private-chat-system";
import AgreementWorkflow from "pages/agreement-workflow";
import UserProfileManagement from "pages/user-profile-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/service-request-creation" element={<ServiceRequestCreation />} />
        <Route path="/service-request-dashboard" element={<ServiceRequestDashboard />} />
        <Route path="/bid-management" element={<BidManagement />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/private-chat-system" element={<PrivateChatSystem />} />
        <Route path="/agreement-workflow" element={<AgreementWorkflow />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;