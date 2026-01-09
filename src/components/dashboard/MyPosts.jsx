import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/posts/PostCard";

export const MyPosts = ({
  posts,
  loading,
  currentUserId,
  onRepliesClick,
  onLike,
  onDelete,
  onNewPostClick,
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-medium">My Posts</h2>
        <Button onClick={onNewPostClick} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : posts && posts.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-lg border">
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm">
            Start a conversation! Ask your first question to connect with alumni
            and get valuable insights.
          </p>
          <Button onClick={onNewPostClick}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Post
          </Button>
        </div>
      )}
    </div>
  );
};
