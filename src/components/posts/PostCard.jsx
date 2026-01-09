import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "@/utils/dateHelpers";
import { formatAlumniInfo, extractRollNumber, getInitials } from "@/utils/userInfoHelpers";
import { ROUTES } from "@/constants/constants";

export default function PostCard({
  post,
  onRepliesClick,
  onLike,
  onDelete,
  currentUserId,
  showFullBody = false,
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const isOwnPost = currentUserId === post.author.id;
  const isLiked = post.isLikedByCurrentUser;
  const isTruncated = !showFullBody && post.body.length > 200;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(post.id, isLiked);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post.id);
  };

  const handleRepliesClick = (e) => {
    e.stopPropagation();
    if (onRepliesClick) {
      onRepliesClick(post.id);
    } else {
      navigate(ROUTES.SINGLE_POST.replace(":id", post.id));
    }
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.USER_PROFILE.replace(":userId", post.author.id));
  };

  const handlePostClick = () => {
    navigate(ROUTES.SINGLE_POST.replace(":id", post.id));
  };

  const getAuthorInfo = () => {
    if (post.author.role === "alumni") {
      return formatAlumniInfo(
        post.author.currentPosition,
        post.author.currentCompany
      );
    } else if (post.author.role === "student") {
      return extractRollNumber(post.author.email);
    }
    return null;
  };

  const authorInfo = getAuthorInfo();

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={handlePostClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar
            className="w-10 h-10 cursor-pointer"
            onClick={handleAuthorClick}
          >
            <AvatarImage src={post.author?.profilePicture} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getInitials(post.author.firstName, post.author.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-medium cursor-pointer hover:underline"
                onClick={handleAuthorClick}
              >
                {post.author.firstName} {post.author.lastName}
              </span>
              <Badge
                variant={post.author.role === "student" ? "default" : "secondary"}
                className="text-xs"
              >
                {post.author.role === "student" ? "Student" : "Alumni"}
              </Badge>
            </div>
            {authorInfo && (
              <p className="text-sm text-primary font-medium mt-0.5">
                {authorInfo}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </div>

        <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <p
            className={`text-base whitespace-pre-wrap ${
              !showFullBody && !isExpanded ? "line-clamp-3" : ""
            }`}
          >
            {post.body}
          </p>
          {isTruncated && (
            <button
              className="text-primary font-semibold text-sm mt-1 hover:underline"
              onClick={toggleExpand}
            >
              {isExpanded ? "See less" : "See more..."}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${isLiked ? "text-destructive" : ""}`}
              onClick={handleLikeClick}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{post.likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleRepliesClick}
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {post.repliesCount} {post.repliesCount === 1 ? "reply" : "replies"}
              </span>
            </Button>
          </div>

          {isOwnPost && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleDeleteClick}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
