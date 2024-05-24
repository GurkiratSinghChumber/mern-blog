import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";

export default function DashSidebar({ handleSignOut }) {
  const dispatch = useDispatch();
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointor"
            onClick={() => handleSignOut(dispatch, signOutSuccess)}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
