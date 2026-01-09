import { create } from "zustand";
import notificationService from "../services/notificationService";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    try {
      set({ loading: true, error: null });

      const data = await notificationService.getNotifications();

      set({
        notifications: data.notifications || [],
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching notifications:", error);
    }
  },

  fetchUnreadCount: async () => {
    try {
      const data = await notificationService.getUnreadCount();

      set({ unreadCount: data.unreadCount || 0 });
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  },

  markAsRead: async (notificationId) => {
    try {
      // Optimistic update
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));

      await notificationService.markAsRead(notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // Revert on error
      get().fetchNotifications();
      get().fetchUnreadCount();
    }
  },

  markAllAsRead: async () => {
    try {
      // Optimistic update
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));

      await notificationService.markAllAsRead();
    } catch (error) {
      console.error("Error marking all as read:", error);
      // Revert on error
      get().fetchNotifications();
      get().fetchUnreadCount();
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      // Optimistic update
      const notification = get().notifications.find(
        (n) => n.id === notificationId
      );
      const wasUnread = notification && !notification.isRead;

      set((state) => ({
        notifications: state.notifications.filter(
          (n) => n.id !== notificationId
        ),
        unreadCount: wasUnread
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }));

      await notificationService.deleteNotification(notificationId);
    } catch (error) {
      console.error("Error deleting notification:", error);
      // Revert on error
      get().fetchNotifications();
      get().fetchUnreadCount();
    }
  },
  clearError: () => set({ error: null }),
}));

export default useNotificationStore;
