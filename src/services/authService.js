import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const authService = {
  login: async (credentials) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.LOGIN, credentials),
      "Login Failed"
    );
  },

  signupStudent: async (studentData) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.SIGNUP_STUDENT, studentData),
      "Signup Failed"
    );
  },

  signupAlumni: async (alumniData) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.SIGNUP_ALUMNI, alumniData),
      "Signup Failed"
    );
  },

  verifySignupOTP: async (otp) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.VERIFY_SIGNUP_OTP, { otp }),
      "OTP Verification Failed"
    );
  },

  resendSignupOTP: async () => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.RESEND_SIGNUP_OTP),
      "Failed to Resend OTP"
    );
  },

  logout: () => {
    // You might not even need an API call for this
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  verifyEmail: async (token) => {
    throw new Error("Not implemented yet");
  },
};

export default authService;
