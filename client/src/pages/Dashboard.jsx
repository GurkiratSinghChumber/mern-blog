import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashComments from "../components/DashComments";
import DashPost from "../components/DashPost";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

import DashUsers from "../components/DashUsers";
import { handleSignOut } from "../utils/SignOutFunction";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar handleSignOut={handleSignOut}></DashSidebar>
      </div>
      {/* Profile */}
      {tab === "profile" && (
        <DashProfile handleSignOut={handleSignOut}></DashProfile>
      )}

      {tab === "post" && <DashPost></DashPost>}

      {tab == "users" && <DashUsers></DashUsers>}

      {tab == "comments" && <DashComments></DashComments>}
    </div>
  );
}
