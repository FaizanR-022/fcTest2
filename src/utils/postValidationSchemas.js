import * as yup from "yup";

export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters")
    .trim(),

  body: yup
    .string()
    .required("Post content is required")
    .min(10, "Post content must be at least 10 characters")
    .max(5000, "Post content must not exceed 5000 characters")
    .trim(),
});

export const createReplySchema = yup.object().shape({
  body: yup
    .string()
    .required("Reply is required")
    .min(5, "Reply must be at least 5 characters")
    .max(5000, "Reply must not exceed 5000 characters")
    .trim(),
});
