import { useEffect } from "react";
import { Bell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import useNotificationStore from "@/store/useNotificationStore";
import { formatDistanceToNow } from "@/utils/dateHelpers";
import { ROUTES } from "@/constants/constants";

export const NotificationWidget = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));
  };

  const handleViewAll = () => {
    navigate(ROUTES.NOTIFICATIONS);
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You'll see updates here when someone posts or replies
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {recentNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    onClick={() => handleNotificationClick(notification)}
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                      !notification.isRead ? "bg-primary/5" : ""
                    }`}
                  >
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={notification.actor?.profilePicture} />
                      <AvatarFallback>
                        {notification.actor?.name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm line-clamp-2 ${
                          !notification.isRead ? "font-semibold" : ""
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(notification.createdAt)}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </div>
                  {index !== recentNotifications.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full mt-4 text-primary"
              onClick={handleViewAll}
            >
              View All Notifications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationWidget;
