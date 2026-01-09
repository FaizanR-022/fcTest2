import { MessageSquare, Loader2 } from "lucide-react";
import PostCard from "../posts/PostCard";

export const UserPosts = ({
  posts,
  loading,
  error,
  user,
  currentUserId,
  onRepliesClick,
  onLike,
  onDelete,
}) => {
  return (
    <div className="container max-w-4xl mx-auto px-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Posts</h2>
        <span className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Error Loading Posts
          </h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No posts yet
          </h3>
          <p className="text-sm text-muted-foreground">
            {user?.firstName} hasn't posted anything yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                author: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  role: user.role,
                  profilePicture: user.profilePicture,
                },
              }}
              currentUser={currentUserId}
              onRepliesClick={onRepliesClick}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
