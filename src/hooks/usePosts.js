import { useEffect, useState } from "react";
import { postService } from "../services/postService";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add pagination
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const { posts: allPosts } = await postService.getAllPosts();

        setPosts(allPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (newPost) => {
    try {
      setLoading(true);
      setError("");

      const { post } = await postService.createPost(newPost);
      setPosts((posts) => [post, ...posts]);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    const origPosts = posts;

    try {
      setError("");

      // Ai said its optimistic approach so doing update first then api call
      setPosts((posts) =>
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLikedByCurrentUser: true,
                likesCount: post.likesCount + 1,
              }
            : post
        )
      );

      await postService.likePost(postId);
    } catch (err) {
      setError(err.message);
      setPosts(origPosts);
      throw err;
    }
  };

  const unlikePost = async (postId) => {
    const origPosts = posts;

    try {
      setError("");

      // Ai said its optimistic approach so doing update first then api call
      setPosts((posts) =>
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLikedByCurrentUser: false,
                likesCount: post.likesCount - 1,
              }
            : post
        )
      );

      await postService.unlikePost(postId);
    } catch (err) {
      setError(err.message);
      setPosts(origPosts);
      throw err;
    }
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      setError("");

      await postService.deletePost(postId);
      setPosts((posts) => posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    unlikePost,
    deletePost,
  };
};
