"use client";

import { useState, useRef, useEffect } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./pages/home/page";
import DoubleGame from "./pages/games/double/page";
import MinesGame from "./pages/games/mines/page";
import Login from "./pages/login/page";

// ==================== COMPONENTE APP PRINCIPAL ====================
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games/doublex" element={<DoubleGame />} />
          <Route path="/games/mines" element={<MinesGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;