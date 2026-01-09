import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { UserPosts } from "@/components/profile/UserPosts";
import { ContactModal } from "@/components/profile/ContactModal";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

import { useUserProfile } from "@/hooks/useUserProfile";
import { usePosts } from "@/hooks/usePosts";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();

  const {
    user,
    posts,
    isOwnProfile,
    loading,
    postsLoading,
    error,
    postsError,
  } = useUserProfile(userId);

  const { likePost, unlikePost, deletePost } = usePosts();

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  // Navigate to single post page for replies
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
      // Page will refresh or we can update state
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-muted-foreground">
            The user you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader
        user={user}
        isOwnProfile={isOwnProfile}
        onContactClick={handleContactClick}
      />

      <ProfileDetails user={user} isOwnProfile={isOwnProfile} />

      <UserPosts
        posts={posts}
        loading={postsLoading}
        error={postsError}
        user={user}
        currentUserId={currentUser?.id}
        onRepliesClick={handleRepliesClick}
        onLike={handleLike}
        onDelete={handleDeleteClick}
      />

      {/* Contact Modal - for alumni only */}
      <ContactModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        user={user}
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
  );
}
