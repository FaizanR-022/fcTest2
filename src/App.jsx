import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import useNotificationPolling from "./hooks/useNotificationPolling";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useNotificationPolling();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
}

export default App;
