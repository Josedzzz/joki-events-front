import { useState } from "react";
import AdminLeftPanel from "./AdminLeftPanel";
import AdminEvents from "./AdminEvents";
import AdminCoupons from "./AdminCoupons";
import AdminReports from "./AdminReports";
export default function AdminDashboard() {
  // use state to set the content
  const [content, setContent] = useState<string>("event");

  /**
   * change the window content on the menu
   * @param contentName the name of the content to be displayed
   */
  const toggleContent = (contentName: string) => {
    setContent(contentName);
  };

  return (
    <div className="min-h-screen bg-custom-black flex flex-row">
      <AdminLeftPanel toggleContent={toggleContent} content={content} />
      {content === "event" && <AdminEvents />}
      {content === "coupon" && <AdminCoupons />}
      {content === "report" && <AdminReports />}
    </div>
  );
}
