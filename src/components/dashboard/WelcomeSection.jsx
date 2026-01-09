import useAuthStore from "@/store/authStore";

export const WelcomeSection = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
        <h1 className="text-3xl font-medium mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-muted-foreground">
          {user?.role === "student"
            ? "Explore the alumni directory and connect with professionals in your field"
            : "Share your knowledge and help students achieve their career goals"}
        </p>
      </div>
    </div>
  );
};
