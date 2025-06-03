"use client";

import { useState, useRef, useEffect } from "react";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import { DadosJogadorProvider } from "./context/DadosJogadorContext";

import PageHome from "./pages/home/page";
import PagePromocoes from "./pages/promocoes/page";
import DoubleGame from "./pages/games/double/page";
import MinesGame from "./pages/games/mines/page";
import Login from "./pages/login/page";
import Cadastro from "./pages/cadastro/page";

import { useTheme } from "./context/ThemeContext";

// ==================== COMPONENTE APP PRINCIPAL ====================
function App() {
  const theme = useTheme();
  useEffect(() => {
    const iconLink = document.querySelector("link[rel='icon']");
    if (iconLink && theme?.faviconUrl) {
      iconLink.href = theme.faviconUrl;
    }

    const appleTouchIcon = document.querySelector(
      "link[rel='apple-touch-icon']"
    );
    if (appleTouchIcon && theme?.faviconUrl) {
      appleTouchIcon.href = theme.faviconUrl;
    }

    const maskIcon = document.querySelector("link[rel='mask-icon']");
    if (maskIcon && theme?.faviconUrl) {
      maskIcon.href = theme.faviconUrl;
    }
  }, [theme?.faviconUrl]);
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DadosJogadorProvider>
                  <PageHome />
                </DadosJogadorProvider>
              }
            />
            <Route
              path="/promocoes"
              element={
                <DadosJogadorProvider>
                  <PagePromocoes />{" "}
                </DadosJogadorProvider>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/games/doublex"
              element={
                <PrivateRoute>
                  <DoubleGame />
                </PrivateRoute>
              }
            />
            <Route
              path="/games/mines"
              element={
                <PrivateRoute>
                  <MinesGame />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
