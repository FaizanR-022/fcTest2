import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";

export const UserInfoCard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const getInitials = () => {
    if (!user) return "";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <h3 className="text-xl font-medium mb-1">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
          <Badge variant={user?.role === "student" ? "default" : "secondary"}>
            {user?.role === "student" ? "Student" : "Alumni"}
          </Badge>

          <div className="mt-4 pt-4 border-t space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>{user?.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campus:</span>
              <span>{user?.campus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {user?.role === "student" ? "Batch:" : "Graduated:"}
              </span>
              <span>
                {user?.role === "student" ? user?.batch : user?.graduationYear}
              </span>
            </div>
            {user?.role === "alumni" && user?.currentCompany && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="truncate ml-2">{user?.currentCompany}</span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => navigate(`/user/${user?.publicId || user?.id}`)}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
