import { useEffect, useState } from "react";
import AdminEvents from "./AdminEvents";
import AdminCoupons from "./AdminCoupons";
import AdminReports from "./AdminReports";
import AdminHeader from "./AdminHeader";
import AdminAccount from "./AdminAccount";
import { refreshJwtTokenAdmin } from "../services/authService";
export default function AdminDashboard() {
  // use state to set the content
  const [content, setContent] = useState<string>("events");

  /**
   * change the window content on the menu
   * @param contentName the name of the content to be displayed
   */
  const toggleContent = (contentName: string) => {
    setContent(contentName);
  };

  // refresh the token
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refreshJwtTokenAdmin();
      } catch (error) {
        console.error("Error refreshing token", error);
      }
    };
    refreshToken();
  }, [content]);

  return (
    <div className="min-h-screen bg-custom-black flex flex-col">
      <AdminHeader toggleContent={toggleContent} content={content} />
      {content === "events" && <AdminEvents />}
      {content === "coupons" && <AdminCoupons />}
      {content === "reports" && <AdminReports />}
      {content === "account" && <AdminAccount />}
    </div>
  );
}
