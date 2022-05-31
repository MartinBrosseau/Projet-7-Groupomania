import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/Connection";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Connection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
