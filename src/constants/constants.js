export const USER_ROLES = {
  STUDENT: "student",
  ALUMNI: "alumni",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP_CHOICE: "/signup",
  SIGNUP_STUDENT: "/signup/student",
  SIGNUP_ALUMNI: "/signup/alumni",
  VERIFY_EMAIL: "/verify-email",
  DASHBOARD: "/dashboard",
  ALUMNI_LIST: "/alumni",
  ALUMNI_PROFILE: "/alumni/:id",
  PROFILE: "/profile",
  USER_PROFILE: "/user/:userId",
  EDIT_PROFILE: "/profile/edit",

  ALL_POSTS: "/posts",
  SINGLE_POST: "/posts/:id",
  NOTIFICATIONS: "/notifications",
  // MY_POSTS: "/my-posts",
  // CREATE_POST: "/posts/create",
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  SIGNUP_STUDENT: "/auth/signup/student",
  SIGNUP_ALUMNI: "/auth/signup/alumni",
  VERIFY_EMAIL: "/auth/verify-email",
  VERIFY_SIGNUP_OTP: "/auth/verify-signup-otp", // ← ADD THIS
  RESEND_SIGNUP_OTP: "/auth/resend-signup-otp", // ← ADD THIS

  // User
  GET_USER_PROFILE: "/user",
  GET_USER_BY_ID: "/user/:userId",
  UPDATE_USER_PROFILE: "/user",
  DELETE_USER_PROFILE: "/user",
  GET_USER_POSTS: "/user/:userId/posts",
  GET_USER_REPLIES: "/user/:userId/replies",

  // Alumni
  GET_ALL_ALUMNI: "/alumni",
  GET_ALUMNI_BY_ID: "/alumni/:id",
  UPDATE_ALUMNI_PROFILE: "/alumni/profile",

  // Student
  GET_STUDENT_PROFILE: "/student/profile",
  UPDATE_STUDENT_PROFILE: "/student/profile",

  // Notifications
  GET_NOTIFICATIONS: "/notifications",
  GET_UNREAD_COUNT: "/notifications/unread-count",
  MARK_NOTIFICATION_AS_READ: "/notifications/:id/read",
  MARK_ALL_NOTIFICATIONS_AS_READ: "/notifications/read-all",
  DELETE_NOTIFICATION: "/notifications/:id",

  // Posts
  GET_ALL_POSTS: "/posts",
  GET_POST_BY_ID: "/posts/:id", // Not implemented in backend as theres no option on Frontend to open a single post
  CREATE_POST: "/posts",
  DELETE_POST: "/posts/:id",
  LIKE_POST: "/posts/:id/like",
  UNLIKE_POST: "/posts/:id/like",

  //Replies
  GET_POST_REPLIES: "/posts/:id/replies",
  CREATE_REPLY: "/posts/:id/replies",
  DELETE_REPLY: "/replies/:id",
};

export const EMAIL_DOMAINS = {
  STUDENT: "@nu.edu.pk",
};

export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  STUDENT_EMAIL_REQUIRED: "Please use your @nu.edu email address",
  PASSWORD_MIN: "Password must be at least 6 characters",
  PASSWORD_MISMATCH: "Passwords do not match",
  PHONE_INVALID: "Please enter a valid phone number",
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/faizan-raza-302360245/",
  github: "https://github.com/FaizanR-022",
  whatsapp: "https://wa.me/923248209792",
  instagram: "https://www.instagram.com/faizanraza022/",
};
