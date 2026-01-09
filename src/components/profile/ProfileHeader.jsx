import { Edit, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "../../constants/constants";

export const ProfileHeader = ({ user, isOwnProfile, onContactClick }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(ROUTES.EDIT_PROFILE);
  };

  const getMetaText = () => {
    if (!user) return "";

    const parts = [];

    if (user.role === "student") {
      parts.push(user.department);
      parts.push(`Batch ${user.batch}`);
      parts.push(user.campus);
    } else if (user.role === "alumni") {
      parts.push(user.currentPosition);
      parts.push(user.currentCompany);
    }

    return parts.filter(Boolean).join(" • ");
  };

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="mb-4">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user?.profilePicture || ""} alt={user?.fullName || "User"} />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {user?.fullName || `${user?.firstName} ${user?.lastName}`}
          </h1>

          {/* Meta info */}
          <p className="text-muted-foreground mb-6">
            {getMetaText()}
          </p>

          {/* Action Button */}
          <div>
            {isOwnProfile ? (
              <Button onClick={handleEditProfile}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              user?.role === "alumni" && (
                <Button variant="outline" onClick={onContactClick}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
