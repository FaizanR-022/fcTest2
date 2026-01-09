import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

function EmailVerificationRoute({ children }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.isEmailVerified) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}

export default EmailVerificationRoute;
