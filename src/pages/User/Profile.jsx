// pages/User/Profile.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import StudentProfile from "@/pages/Student/StudentProfile";
import AlumniProfile from "@/pages/Alumni/AlumniProfile";
import { ROUTES } from "@/constants/constants";
import Loader from "@/components/common/Loader";

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return <Loader />;
  }

  if (user.role === "student") {
    return <StudentProfile />;
  } else if (user.role === "alumni") {
    return <AlumniProfile />;
  }

  return null;
}
