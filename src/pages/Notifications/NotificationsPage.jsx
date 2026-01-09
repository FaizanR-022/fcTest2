import { useEffect } from "react";
import { Bell, Check, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import useNotificationStore from "@/store/useNotificationStore";
import { formatDistanceToNow } from "@/utils/dateHelpers";
import { ROUTES } from "@/constants/constants";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearError,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDelete = async (notificationId, event) => {
    event.stopPropagation();
    await deleteNotification(notificationId);
  };

  // Loading State
  if (loading && notifications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={clearError} className="text-destructive hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-lg font-semibold mb-2">No notifications yet</h2>
              <p className="text-sm text-muted-foreground">
                When someone posts, replies, or likes your content, you'll see it here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex gap-3 p-4 cursor-pointer transition-colors hover:bg-muted ${
                    !notification.isRead
                      ? "bg-primary/5 border-l-4 border-primary"
                      : ""
                  }`}
                >
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarImage src={notification.actor?.profilePicture} />
                    <AvatarFallback>
                      {notification.actor?.name?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`mb-1 ${
                        !notification.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.isRead && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}

                    <button
                      onClick={(e) => handleDelete(notification.id, e)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {index !== notifications.length - 1 && <Separator />}
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
