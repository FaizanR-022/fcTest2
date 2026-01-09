import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "@/utils/dateHelpers";
import { formatAlumniInfo, getInitials } from "@/utils/userInfoHelpers";
import { ROUTES } from "@/constants/constants";

export default function ReplyCard({ reply, onDelete, currentUserId }) {
  const navigate = useNavigate();

  const isOwnReply = currentUserId === reply.author.id;

  const handleAuthorClick = () => {
    navigate(ROUTES.USER_PROFILE.replace(":userId", reply.author.id));
  };

  const handleDeleteClick = () => {
    onDelete(reply.id);
  };

  const authorInfo = formatAlumniInfo(
    reply.author.currentPosition,
    reply.author.currentCompany
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar
            className="w-10 h-10 cursor-pointer"
            onClick={handleAuthorClick}
          >
            <AvatarImage src={reply.author.profilePicture} />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
              {getInitials(reply.author.firstName, reply.author.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-medium cursor-pointer hover:underline"
                    onClick={handleAuthorClick}
                  >
                    {reply.author.firstName} {reply.author.lastName}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Alumni
                  </Badge>
                </div>
                {authorInfo && (
                  <p className="text-sm text-muted-foreground">{authorInfo}</p>
                )}
              </div>

              {isOwnReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteClick}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="text-base mb-3 whitespace-pre-wrap ml-13">{reply.body}</p>
        <p className="text-xs text-muted-foreground ml-13">
          {formatDistanceToNow(reply.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}
