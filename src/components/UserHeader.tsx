import { useNavigate } from "react-router-dom";

// Define the type for the props
type UserHeaderProps = {
  toggleContent: (contentName: string) => void;
  content: string;
};

export default function UserHeader({
  toggleContent,
  content,
}: UserHeaderProps) {
  const navigate = useNavigate();

  /**
   * Depends on the link and name of the content give some tailwindcss classes
   * @param link the content
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-blue-400 hove:scale-105 font-bold text-sm sm:text-md md:text-lg transition duration-300 ease-in-out ${
      content === link
        ? "border-b-2 border-blue-400 text-blue-400"
        : "text-white hover:text-blue-400"
    }`;

  return (
    <header className="mt-3 h-12 w-full flex justify-between items-center max-w-5xl mx-auto p-2 fade-in">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl text-slate-50 font-bold">
          JokiEvents Menu
        </h1>
        <i className="fa-solid fa-paper-plane text-xl sm:text-3xl md:text-4xl text-blue-400"></i>
      </div>

      {/* Navigation links */}
      <nav className="flex overflow-x-auto space-x-4 sm:space-x-8">
        <a
          onClick={() => toggleContent("events")}
          className={linkClasses("events")}
        >
          Events
        </a>
        <a
          onClick={() => toggleContent("cart")}
          className={linkClasses("cart")}
        >
          Cart
        </a>
        <a
          onClick={() => toggleContent("history")}
          className={linkClasses("history")}
        >
          History
        </a>
        <a
          onClick={() => toggleContent("account")}
          className={linkClasses("account")}
        >
          Account
        </a>
        <a
          onClick={() => navigate("/login")}
          className={linkClasses("log-out")}
        >
          Logout
        </a>
      </nav>
    </header>
  );
}
