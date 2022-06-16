import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/Connection";
import Homepage from "./pages/Homepage";
import Inscription from "./pages/Inscription";
import NewPost from "./pages/NewPost";
import UserProfil from "./pages/UserProfil";
import { UserTokenComponent } from "./components/UserToken";

//high order component
const App = () => {
  return (
    <UserTokenComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/connection" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="*" element={<Connection />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/userprofil" element={<UserProfil />} />
        </Routes>
      </BrowserRouter>
    </UserTokenComponent>
  );
};

export default App;
