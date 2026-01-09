import { Loader2, MessageSquare } from "lucide-react";
import PostCard from "./PostCard";

export const PostList = ({
  posts,
  loading,
  error,
  currentUserId,
  onRepliesClick,
  onLike,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Error Loading Posts
        </h3>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to start a discussion!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onRepliesClick={onRepliesClick}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
