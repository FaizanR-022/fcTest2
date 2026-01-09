import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import useAuthStore from "../store/authStore";
import { postService } from "../services/postService";

export const useDashboard = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(true);
  const [postsError, setPostsError] = useState("");
  const [repliesError, setRepliesError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    const { id, firstName, lastName, role, profilePicture } = user;

    const fetchUserPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError("");
        const data = await userService.getUserPosts(user.id);
        console.log(data);
        // data.posts = data.posts.map((post) => {
        //   return {
        //     ...post,
        //     author: { id, firstName, lastName, role, profilePicture },
        //   };
        // });
        console.log(data + "posts");
        setPosts(data.posts || []);
      } catch (err) {
        setPostsError(err.message);
        setPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    const fetchUserReplies = async () => {
      // Only fetch replies for alumni
      if (user.role !== "alumni") {
        setRepliesLoading(false);
        return;
      }

      try {
        setRepliesLoading(true);
        setRepliesError("");
        const data = await userService.getUserReplies(user.id);
        setReplies(data.replies || []);
        console.log(data + "replies");
      } catch (err) {
        setRepliesError(err.message);
        setReplies([]);
        console.log("error replies");
      } finally {
        setRepliesLoading(false);
      }
    };

    fetchUserPosts();
    fetchUserReplies();
  }, [user?.id, user?.role]);

  const createPost = async (postData) => {
    try {
      const { id, firstName, lastName, role, profilePicture } = user;

      const response = await postService.createPost(postData);
      const newPost = response.post;

      const postWithAuthor = {
        ...newPost,
        author: {
          id,
          firstName,
          lastName,
          role,
          profilePicture,
        },
        repliesCount: 0,
        isLikedByCurrentUser: false,
      };

      setPosts((prevPosts) => [postWithAuthor, ...prevPosts]);

      return { success: true, post: postWithAuthor };
    } catch (err) {
      console.error("Failed to create post:", err);
      return { success: false, error: err.message };
    }
  };

  const removePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const updatePostLikes = (postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLikedByCurrentUser: isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );
  };

  return {
    posts,
    replies,
    postsLoading,
    repliesLoading,
    postsError,
    repliesError,
    createPost,
    removePost,
    updatePostLikes,
  };
};
