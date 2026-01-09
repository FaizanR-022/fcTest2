import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import { replyService } from "../services/replyService";

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [error, setError] = useState("");
  const [repliesError, setRepliesError] = useState("");

  useEffect(() => {
    if (!postId) {
      return;
    }

    const fetchPostAndReplies = async () => {
      try {
        setLoading(true);
        setError("");
        const postData = await postService.getPostById(postId);
        setPost(postData.post);

        setRepliesLoading(true);
        setRepliesError("");
        const repliesData = await postService.getPostReplies(postId);
        setReplies(repliesData.replies);
      } catch (err) {
        if (!post) {
          setError(err.message);
        } else {
          setRepliesError(err.message);
        }
      } finally {
        setLoading(false);
        setRepliesLoading(false);
      }
    };

    fetchPostAndReplies();
  }, [postId]);

  const createReply = async (replyData) => {
    try {
      setRepliesError("");
      const data = await replyService.createReply(postId, replyData);
      setReplies((prevReplies) => [data.reply, ...prevReplies]);
    } catch (err) {
      setRepliesError(err.message);
      throw err;
    }
  };

  const deleteReply = async (replyId) => {
    try {
      setRepliesError("");
      await replyService.deleteReply(replyId);
      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );
    } catch (err) {
      setRepliesError(err.message);
      throw err;
    }
  };

  const likePost = async () => {
    if (!post) return;

    let previousPost;

    try {
      setError("");
      setPost((currentPost) => {
        previousPost = currentPost;
        return {
          ...currentPost,
          isLikedByCurrentUser: true,
          likesCount: currentPost.likesCount + 1,
        };
      });

      await postService.likePost(postId);
    } catch (err) {
      setError(err.message);
      setPost(previousPost);
      throw err;
    }
  };

  const unlikePost = async () => {
    if (!post) return;

    let previousPost;

    try {
      setError("");
      setPost((currentPost) => {
        previousPost = currentPost;
        return {
          ...currentPost,
          isLikedByCurrentUser: false,
          likesCount: currentPost.likesCount - 1,
        };
      });

      await postService.unlikePost(postId);
    } catch (err) {
      setError(err.message);
      setPost(previousPost);
      throw err;
    }
  };

  const deletePost = async () => {
    try {
      setError("");

      await postService.deletePost(postId);
      setPost(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
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
  };
};
