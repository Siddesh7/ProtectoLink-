import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SIP from "./pages/sipConroller";

const App = () => {
  return (
    <div className="bg-base-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sip/:address" element={<SIP />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
