import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/Connection";
import Homepage from "./pages/Homepage";
import Inscription from "./pages/Inscription";
import NewPost from "./pages/NewPost";
import UserProfil from "./pages/UserProfil";
import { useState } from "react";
import { UserContext } from "./components/UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={value}>
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
    </UserContext.Provider>
  );
};

export default App;
