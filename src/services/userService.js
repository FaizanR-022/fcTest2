// services/userService.js
import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const userService = {
  getUserProfile: async () => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_PROFILE),
      "Failed to fetch user profile. Please try again."
    );
  },

  updateUserProfile: async (userData) => {
    return handleApiCall(
      () => api.put(API_ENDPOINTS.UPDATE_USER_PROFILE, userData),
      "Failed to update profile. Please try again."
    );
  },

  getUserById: async (userId) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_BY_ID.replace(":userId", userId)),
      "Failed to fetch user profile. Please try again."
    );
  },

  getUserPosts: async (userId) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_POSTS.replace(":userId", userId)),
      "Failed to fetch user posts. Please try again."
    );
  },

  getUserReplies: async (userId) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_REPLIES.replace(":userId", userId)),
      "Failed to fetch user replies. Please try again."
    );
  },

  deleteUserAccount: async () => {
    return handleApiCall(
      () => api.delete(API_ENDPOINTS.DELETE_USER_ACCOUNT),
      "Failed to delete account. Please try again."
    );
  },
};

export default userService;
