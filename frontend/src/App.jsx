import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePassword from "./views/auth/CreatePassword";
import ForgotPassword from "./views/auth/ForgotPassword";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Register from "./views/auth/Register";
import Category from "./views/core/Category";
import Detail from "./views/core/Detail";
import Index from "./views/core/Index";
import Search from "./views/core/Search";
import AddPost from "./views/dashboard/AddPost";
import Comments from "./views/dashboard/Comments";
import Dashboard from "./views/dashboard/Dashboard";
import EditPost from "./views/dashboard/EditPost";
import Notifications from "./views/dashboard/Notifications";
import Posts from "./views/dashboard/Posts";
import Profile from "./views/dashboard/Profile";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";

import MainWrapper from "../src/layouts/MainWrapper";
function App() {
  return (
    <>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:slug/" element={<Detail />} />
            <Route path="/category/:slug/" element={<Category />} />
            <Route path="/search/" element={<Search />} />

            {/* Authentication */}
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/logout/" element={<Logout />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/create-password/" element={<CreatePassword />} />

            {/* Dashboard */}
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/posts/" element={<Posts />} />
            <Route path="/add-post/" element={<AddPost />} />
            <Route path="/edit-post/:id/" element={<EditPost />} />
            <Route path="/comments/" element={<Comments />} />
            <Route path="/notifications/" element={<Notifications />} />
            <Route path="/profile/" element={<Profile />} />

            {/* Pages */}
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
          </Routes>
        </MainWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
