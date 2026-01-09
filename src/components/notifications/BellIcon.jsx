import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useNotificationStore from "@/store/useNotificationStore";
import { formatDistanceToNow } from "@/utils/dateHelpers";
import { ROUTES } from "@/constants/constants";

export default function BellIcon() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  const [open, setOpen] = useState(false);

  const handleOpen = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchNotifications();
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));
    setOpen(false);
  };

  const handleMarkAllAsRead = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await markAllAsRead();
  };

  const handleViewAll = () => {
    navigate(ROUTES.NOTIFICATIONS);
    setOpen(false);
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-primary gap-1"
              onClick={handleMarkAllAsRead}
            >
              <Check className="w-3 h-3" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {recentNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[400px]">
              {recentNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`px-4 py-3 cursor-pointer ${
                    !notification.isRead ? "bg-accent border-l-2 border-l-primary" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3 w-full">
                    <Avatar className="w-10 h-10 shrink-0">
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
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>

            <DropdownMenuSeparator />
            <div className="p-1">
              <Button
                variant="ghost"
                className="w-full text-primary"
                onClick={handleViewAll}
              >
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
