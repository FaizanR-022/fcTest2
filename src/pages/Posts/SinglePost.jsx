import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PostDetailView } from "@/components/posts/PostDetailView";
import { CreateReply } from "@/components/replies/CreateReply";
import { ReplyList } from "@/components/replies/ReplyList";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

import { usePost } from "@/hooks/usePost";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    post,
    replies,
    loading,
    repliesLoading,
    error,
    repliesError,
    createReply,
    deleteReply,
    likePost,
    unlikePost,
    deletePost,
  } = usePost(id);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLike = async () => {
    if (post.isLikedByCurrentUser) {
      await unlikePost();
    } else {
      await likePost();
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deletePost();
      navigate(ROUTES.ALL_POSTS);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleBack = () => {
    navigate(ROUTES.ALL_POSTS);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-4 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Button>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-medium text-muted-foreground mb-4">
            Post not found
          </h2>
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Button>
        </div>
      </div>
    );
  }

  const isOwnPost = post.author.id === user?.id;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={handleBack} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Button>

          {/* Post Detail */}
          <PostDetailView
            post={post}
            onLike={handleLike}
            onDelete={handleDeleteClick}
            showDelete={isOwnPost}
          />

          {/* Create Reply Section */}
          <div className="mt-6">
            <CreateReply onSubmit={createReply} currentUser={user} />
          </div>

          {/* Replies List */}
          <div className="mt-6">
            <ReplyList
              replies={replies}
              loading={repliesLoading}
              error={repliesError}
              currentUser={user}
              onDelete={deleteReply}
            />
          </div>

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            open={deleteDialogOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            title="Delete Post"
            message="Are you sure you want to delete this post?"
            confirmText="Delete"
            cancelText="Cancel"
            loading={deleting}
          />
        </div>
      </div>
    </div>
  );
}
