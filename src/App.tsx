import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SIP from "./pages/sipConroller";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sip/:address" element={<SIP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
