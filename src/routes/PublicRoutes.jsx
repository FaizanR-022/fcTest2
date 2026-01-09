import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function PublicRoute({ children, darkMode, toggleDarkMode }) {
  const { isAuthenticated, user } = useAuthStore();

  // If authenticated and email verified, redirect to home
  if (isAuthenticated && user?.isEmailVerified) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // If authenticated but email not verified, redirect to verify email
  if (isAuthenticated && !user?.isEmailVerified) {
    return <Navigate to={ROUTES.VERIFY_EMAIL} replace />;
  }

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
