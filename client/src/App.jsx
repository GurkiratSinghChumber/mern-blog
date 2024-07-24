import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Project from "./pages/Project";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Footer from "./components/FooterCom";
import Header from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
("use client");

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "./redux/user/userSlice";
import { checkAuth } from "./utils/VarifyToken";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth(dispatch, signOutSuccess);
  });
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Route>
          <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>}>
            <Route
              path="/create-post"
              element={<CreatePost></CreatePost>}
            ></Route>
          </Route>
          <Route path="/project" element={<Project></Project>}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
