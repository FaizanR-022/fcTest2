import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/constants";
import ProtectedRoute from "./ProtectedRoutes";
import EmailVerificationRoute from "./EmailVerificationRoute";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Auth Pages
import Login from "@/pages/Auth/Login";
import SignupStudent from "@/pages/Auth/SignupStudent";
import SignupAlumni from "@/pages/Auth/SignupAlumni";
import SignupChoice from "@/pages/Auth/SignupChoice";
import VerifyEmail from "@/pages/Auth/VerifyEmail";

// Main Pages
import LandingPage from "@/pages/Home/LandingPage";
import Dashboard from "@/pages/Home/Dashboard";
import AlumniList from "@/pages/Alumni/AlumniList";
import AllPosts from "@/pages/Posts/AllPosts";
import SinglePost from "@/pages/Posts/SinglePost";
import Profile from "@/pages/User/Profile";
import UserProfile from "@/pages/User/UserProfile";
import EditProfile from "@/pages/User/EditProfile";
import NotificationsPage from "@/pages/Notifications/NotificationsPage";
import FeedbackPage from "@/pages/Feedback/FeedbackPage";

function AppRoutes({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP_CHOICE} element={<SignupChoice />} />
          <Route path={ROUTES.SIGNUP_STUDENT} element={<SignupStudent />} />
          <Route path={ROUTES.SIGNUP_ALUMNI} element={<SignupAlumni />} />

          <Route
            path={ROUTES.VERIFY_EMAIL}
            element={
              <EmailVerificationRoute>
                <VerifyEmail />
              </EmailVerificationRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.ALUMNI_LIST}
            element={
              <ProtectedRoute>
                <AlumniList />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.USER_PROFILE}
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.EDIT_PROFILE}
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.ALL_POSTS}
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SINGLE_POST}
            element={
              <ProtectedRoute>
                <SinglePost />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.NOTIFICATIONS}
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default AppRoutes;
