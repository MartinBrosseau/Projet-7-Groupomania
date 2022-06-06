import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/Connection";
import Homepage from "./pages/Homepage";
import Inscription from "./pages/Inscription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connection" element={<Connection />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="*" element={<Connection />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
