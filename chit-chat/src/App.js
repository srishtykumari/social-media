import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import MainHome from "./components/MainHome";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import AddEditPost from "./pages/AddEditPost";
import View from "./pages/View";
import ListFriend from "./pages/ListFriend";
import UploadPic from "./pages/UploadPic";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer theme="colored" />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/addeditpost" element={<AddEditPost />} />
        <Route path="/view" element={<View />} />
        <Route path="/profile" element={<Profile />} />
       <Route path="/listfriends" element={<ListFriend /> }/>
       <Route path="/uploadpic" element={<UploadPic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
