import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Heart,
  MessageCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

import { useUserProfile } from "@/hooks/useUserProfile";
import { usePosts } from "@/hooks/usePosts";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";
import { formatDistanceToNow } from "@/utils/dateHelpers";

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();

  const { user, posts, isOwnProfile, loading, postsLoading, error } =
    useUserProfile(userId);

  const { deletePost } = usePosts();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const getInitials = () => {
    if (!user) return "";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  };

  const formatClassInfo = () => {
    if (user?.role === "student") {
      return `Batch ${user.batch} • ${user.campus}`;
    }
    return `Class of ${user.graduationYear} • ${user.campus}`;
  };

  const getLocation = () => {
    if (user?.role === "alumni" && user.currentCity) {
      return `${user.currentCity}${
        user.currentCountry ? `, ${user.currentCountry}` : ""
      }`;
    }
    return `${user?.campus}, Pakistan`;
  };

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">User not found</h3>
            <Button onClick={() => navigate(ROUTES.ALUMNI_LIST)}>
              Back to Directory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Header Card */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-medium mb-2">
                      {user.firstName} {user.lastName}
                    </h1>
                    {user.role === "alumni" && user.currentPosition && (
                      <p className="text-xl text-muted-foreground mb-2">
                        {user.currentPosition}
                        {user.currentCompany && ` at ${user.currentCompany}`}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">{getLocation()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {user.department} • {formatClassInfo()}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={user.role === "student" ? "default" : "secondary"}
                  >
                    {user.role === "student" ? "Student" : "Alumni"}
                  </Badge>
                </div>

                {isOwnProfile && (
                  <Button onClick={() => navigate(ROUTES.EDIT_PROFILE)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid - 2:1 ratio */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Section (Alumni Only) */}
            {user.role === "alumni" &&
              user.previousExperiences &&
              user.previousExperiences.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-medium">
                      <Briefcase className="w-5 h-5" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {user.previousExperiences.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{exp.position}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {exp.company}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exp.from} - {exp.to || "Present"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

            {/* Skills Section (Alumni Only) */}
            {user.role === "alumni" &&
              user.skills &&
              user.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-medium">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill.name || skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="font-medium">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No posts yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        className="p-3 rounded-lg border hover:border-primary cursor-pointer transition-colors"
                        onClick={() =>
                          navigate(`${ROUTES.ALL_POSTS}/${post.id}`)
                        }
                      >
                        <h4 className="font-medium mb-1 line-clamp-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likesCount || 0} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {post.repliesCount || 0} replies
                          </span>
                          <span>{formatDistanceToNow(post.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                    {posts.length > 5 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate(ROUTES.ALL_POSTS)}
                      >
                        See All
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-medium">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(isOwnProfile || user.role === "alumni") && user.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="text-sm break-all">{user.email}</p>
                    </div>
                  </div>
                )}

                {user.phone && (isOwnProfile || user.role === "alumni") && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        Phone
                      </p>
                      <p className="text-sm">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.role === "alumni" && user.linkedin && (
                  <div className="flex items-start gap-3">
                    <Linkedin className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        LinkedIn
                      </p>
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                )}

                {!isOwnProfile && user.role === "student" && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Contact information is private
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
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
  );
}
