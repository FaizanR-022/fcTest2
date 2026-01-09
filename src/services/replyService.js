import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const replyService = {
  createReply: async (postId, replyData) => {
    return handleApiCall(
      () =>
        api.post(API_ENDPOINTS.CREATE_REPLY.replace(":id", postId), replyData),
      "Failed to create reply. Please try again."
    );
  },

  deleteReply: async (replyId) => {
    return handleApiCall(
      () => api.delete(API_ENDPOINTS.DELETE_REPLY.replace(":id", replyId)),
      "Failed to delete reply. Please try again."
    );
  },
};

export default replyService;
