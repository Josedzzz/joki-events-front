import { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import LoginCard from "./LoginCard";
import SingupCard from "./SingupCart";
import AboutCard from "./AboutCard";

export default function Login() {
  const [card, setCard] = useState<string>("login");

  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  return (
    <div className="min-h-screen bg-custom-dark flex flex-col">
      <HeaderLogin toggleCard={toggleCard} card={card} />
      {card === "login" && <LoginCard />}
      {card === "singup" && <SingupCard />}
      {card === "aboutus" && <AboutCard />}
    </div>
  );
}
