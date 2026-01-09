import { useEffect, useState } from "react";
import { userService } from "../services/userService";

export const useUserProfile = (userId) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState("");
  const [postsError, setPostsError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await userService.getUserById(userId);
        setUser(data.user);
        setIsOwnProfile(data.isOwnProfile || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError("");

        const data = await userService.getUserPosts(userId);
        setPosts(data.posts || []);
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  return {
    user,
    posts,
    isOwnProfile,
    loading,
    postsLoading,
    error,
    postsError,
  };
};
