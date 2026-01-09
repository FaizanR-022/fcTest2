import api from "./api";
import { handleApiCall } from "../utils/apiHandler";
import { API_ENDPOINTS } from "../constants/constants";

export const notificationService = {
  getNotifications: async (limit = 20) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_NOTIFICATIONS, { params: { limit } }),
      "Failed to fetch notifications"
    );
  },

  getUnreadCount: async () => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_UNREAD_COUNT),
      "Failed to fetch unread count"
    );
  },
  markAsRead: async (notificationId) => {
    return handleApiCall(
      () =>
        api.patch(
          API_ENDPOINTS.MARK_NOTIFICATION_AS_READ.replace(":id", notificationId)
        ),
      "Failed to mark notification as read"
    );
  },

  markAllAsRead: async () => {
    return handleApiCall(
      () => api.patch(API_ENDPOINTS.MARK_ALL_NOTIFICATIONS_AS_READ),
      "Failed to mark all as read"
    );
  },

  deleteNotification: async (notificationId) => {
    return handleApiCall(
      () =>
        api.delete(
          API_ENDPOINTS.DELETE_NOTIFICATION.replace(":id", notificationId)
        ),
      "Failed to delete notification"
    );
  },
};

export default notificationService;
