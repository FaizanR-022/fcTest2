import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  MessageSquare,
  MessageCircle,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  ChevronDown,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store/authStore";
import useNotificationStore from "@/store/useNotificationStore";
import { getInitials } from "@/utils/userInfoHelpers";
import BellIcon from "@/components/notifications/BellIcon";

export default function Header({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/alumni", label: "Alumni Directory", icon: Users },
    { path: "/posts", label: "Q&A Forum", icon: MessageSquare },
    { path: "/feedback", label: "Feedback", icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">FastConnect</span>
          </Link>

          {/* Navigation Links - Desktop */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive(path) ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Authenticated User Actions */}
            {isAuthenticated && user ? (
              <>
                {/* Notifications - Only for Alumni */}
                {user.role === "alumni" && <BellIcon />}

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 px-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.profilePicture} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2 border-b">
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {user.role === "student" ? "Student" : "Alumni"}
                      </Badge>
                    </div>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile/edit")}>
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </>
            ) : (
              /* Unauthenticated Actions */
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(path) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
