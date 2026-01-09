import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";
import api from "./api";

export const postService = {
  getAllPosts: async () => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_ALL_POSTS),
      "Failed to fetch posts. Please try again"
    );
  },

  getUserPosts: async (userId) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_POSTS.replace(":id", userId)),
      "Failed to fetch user posts. Please try again"
    );
  },

  getPostById: async (id) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_POST_BY_ID.replace(":id", id)),
      "Failed to fetch the post. Please try again"
    );
  },

  createPost: async (data) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.CREATE_POST, data),
      "Failed to create post. Please Try again"
    );
  },

  deletePost: async (id) => {
    return handleApiCall(
      () => api.delete(API_ENDPOINTS.DELETE_POST.replace(":id", id)),
      "Failed to delete post. Please try again."
    );
  },
  likePost: async (id) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.LIKE_POST.replace(":id", id)),
      "Failed to like post. Please try again."
    );
  },

  // Unlike post
  unlikePost: async (id) => {
    return handleApiCall(
      () => api.delete(API_ENDPOINTS.UNLIKE_POST.replace(":id", id)),
      "Failed to unlike post. Please try again."
    );
  },

  getPostReplies: async (postId) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_POST_REPLIES.replace(":id", postId)),
      "Failed to fetch replies. Please try again."
    );
  },
};
