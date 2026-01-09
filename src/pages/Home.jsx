import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import Dashboard from "./Home/Dashboard";

export default function Home({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
