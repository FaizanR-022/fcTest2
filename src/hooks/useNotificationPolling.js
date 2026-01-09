import { useEffect, useRef } from "react";
import useNotificationStore from "../store/useNotificationStore";
import useAuthStore from "../store/authStore";

export const useNotificationPolling = () => {
  const { isAuthenticated } = useAuthStore();
  const { fetchUnreadCount } = useNotificationStore();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchUnreadCount();

    intervalRef.current = setInterval(() => {
      fetchUnreadCount();
    }, 60000); // 60 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, fetchUnreadCount]);
};

export default useNotificationPolling;
