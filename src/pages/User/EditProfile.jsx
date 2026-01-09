// pages/User/EditProfile.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import StudentProfile from "@/pages/Student/StudentProfile";
import AlumniProfile from "@/pages/Alumni/AlumniProfile";
import { ROUTES } from "@/constants/constants";
import Loader from "@/components/common/Loader";

export default function EditProfile() {
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

  // Render the appropriate profile edit page based on user role
  if (user.role === "student") {
    return <StudentProfile />;
  } else if (user.role === "alumni") {
    return <AlumniProfile />;
  }

  return null;
}
