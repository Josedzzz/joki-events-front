import { useState } from "react";
import UserHeader from "./UserHeader";
import UserEvents from "./UserEvents";
import UserCart from "./UserCart";
import UserAccount from "./UserAccount";
import UserHistory from "./UserHistory";

export default function UserDashboard() {
  // useState to set the content
  const [content, setContent] = useState<string>("events");

  /**
   * change the window content on the menu
   * @param contentName the name of the content to be displayed
   */
  const toggleContent = (contentName: string) => {
    setContent(contentName);
  };

  return (
    <div className="min-h-screen bg-custom-black flex flex-col">
      <UserHeader toggleContent={toggleContent} content={content} />
      {content === "events" && <UserEvents />}
      {content === "cart" && <UserCart />}
      {content === "history" && <UserHistory />}
      {content === "account" && <UserAccount />}
    </div>
  );
}
