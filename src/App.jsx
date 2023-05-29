import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chats, Login } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Chat" element={<Chats />} />
      </Routes>
    </div>
  );
};

export default App;
