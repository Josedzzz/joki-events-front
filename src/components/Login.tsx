import { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import LoginCard from "./LoginCard";
import SignupCart from "./SingupCart";
import AboutCard from "./AboutCard";

export default function Login() {
  // use state to set the window card of the login
  const [card, setCard] = useState<string>("login");

  /**
   * change the window content on the menu based in the card name
   * @param cardName the name of the card to be displayed
   */
  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  return (
    <div className="min-h-screen bg-custom-black flex flex-col">
      <HeaderLogin toggleCard={toggleCard} card={card} />
      {card === "login" && <LoginCard />}
      {card === "singup" && <SignupCart />}
      {card === "aboutus" && <AboutCard />}
    </div>
  );
}
