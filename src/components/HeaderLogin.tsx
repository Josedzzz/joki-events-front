// Define a type for the props
type HeaderLoginProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function HeaderLogin({ toggleCard, card }: HeaderLoginProps) {
  /**
   * Depends on the link and name of the card give some tailwind classes
   * @param link the cardname 
   * @returns the tailwind css classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-blue-400 font-bold text-sm sm:text-md md:text-lg transition duration-300 ease-in-out ${
      card === link
        ? "border-b-2 border-blue-400 text-blue-400"
        : "text-white hover:text-blue-400 font-bold text-sm sm:text-md md:text-lg"
    }`;

  return (
    <header className="mt-3 h-12 w-full flex justify-between items-center max-w-3xl mx-auto p-2 appearr">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl text-slate-50 font-bold">
          Joki Events
        </h1>
        <i className="fa-solid fa-paper-plane text-xl sm:text-3xl md:text-4xl text-blue-400"></i>
      </div>
      <nav className="space-x-4 sm:space-x-8">
        <a
          onClick={() => toggleCard("aboutus")}
          className={linkClasses("aboutus")}
        >
          About us
        </a>
        <a
          onClick={() => toggleCard("singup")}
          className={linkClasses("singup")}
        >
          Singup
        </a>
        <a onClick={() => toggleCard("login")} className={linkClasses("login")}>
          Login
        </a>
      </nav>
    </header>
  );
}
