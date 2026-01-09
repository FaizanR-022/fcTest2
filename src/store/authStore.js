import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    set({
      user: userData,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  markEmailVerified: () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      const updatedUser = { ...currentUser, isEmailVerified: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }
  },
}));

export default useAuthStore;
