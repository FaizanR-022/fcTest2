import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PostList } from "@/components/posts/PostList";
import { CreatePost } from "@/components/posts/CreatePost";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

import { usePosts } from "@/hooks/usePosts";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

export default function AllPosts() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    posts,
    loading,
    error,
    createPost,
    likePost,
    unlikePost,
    deletePost,
  } = usePosts();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleCreatePost = async (data) => {
    await createPost(data);
    setCreateModalOpen(false);
  };

  // Navigate to single post page
  const handleRepliesClick = (postId) => {
    navigate(`${ROUTES.ALL_POSTS}/${postId}`);
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setDeleting(true);
      await deletePost(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleLike = async (postId, isLiked) => {
    if (isLiked) {
      await unlikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-medium mb-2">Q&A Forum</h1>
            <p className="text-muted-foreground text-lg">
              Ask questions, share knowledge, and connect with the community
            </p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Ask a Question
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
        )}

        {/* Posts List */}
        <PostList
          posts={posts}
          loading={loading}
          error={error}
          currentUserId={user?.id}
          onRepliesClick={handleRepliesClick}
          onLike={handleLike}
          onDelete={handleDeleteClick}
        />

        {/* Create Post Modal */}
        <CreatePost
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />

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
  );
}
