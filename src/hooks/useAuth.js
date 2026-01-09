import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/authStore";
import authService from "../services/authService";
import { ROUTES } from "../constants/constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    login: storeLogin,
    logout: storeLogout,
    isAuthenticated,
    markEmailVerified,
  } = useAuthStore();

  const [error, setError] = useState("");
  const returnUrl = searchParams.get("returnUrl");

  const login = async (credentials) => {
    try {
      setError("");

      const { token, user } = await authService.login(credentials);
      storeLogin(user, token);

      const dest = returnUrl ? decodeURIComponent(returnUrl) : ROUTES.HOME;
      navigate(dest, { replace: true });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signupStudent = async (studentData) => {
    try {
      setError("");

      const { token, user } = await authService.signupStudent(studentData);
      storeLogin(user, token);

      // navigate(ROUTES.HOME, { replace: true });
      navigate(ROUTES.VERIFY_EMAIL, { replace: true });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signupAlumni = async (alumniData) => {
    try {
      setError("");

      const { token, user } = await authService.signupAlumni(alumniData);
      storeLogin(user, token);

      // navigate(ROUTES.HOME, { replace: true });
      navigate(ROUTES.VERIFY_EMAIL, { replace: true });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const verifyOTP = async (otp) => {
    try {
      setError("");

      const { user } = await authService.verifySignupOTP(otp);
      markEmailVerified();
      return { success: true, data: user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const resendOTP = async () => {
    try {
      setError("");

      await authService.resendSignupOTP();

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    storeLogout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const clearError = () => setError("");

  return {
    login,
    signupStudent,
    signupAlumni,
    verifyOTP,
    resendOTP,
    logout,
    error,
    clearError,
    isAuthenticated,
  };
};
