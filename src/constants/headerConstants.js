// constants/headerConstants.js
import { Home, Users, MessageSquare, MessagesSquare } from "lucide-react";
import { ROUTES } from "./constants";

export const NAV_ITEMS = [
  {
    label: "Home",
    icon: Home,
    path: ROUTES.HOME,
  },
  {
    label: "Alumni Directory",
    icon: Users,
    path: ROUTES.ALUMNI_LIST,
  },
  {
    label: "Q&A Forum",
    icon: MessagesSquare,
    path: ROUTES.ALL_POSTS,
  },
  {
    label: "Feedback",
    icon: MessageSquare,
    path: "/feedback",
  },
];

// If you want to add more navigation items later, just add them here:
// export const ADMIN_NAV_ITEMS = [
//   { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
//   { label: "Users", icon: UserCog, path: "/admin/users" },
// ];
