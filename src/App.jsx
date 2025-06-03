"use client";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { DadosJogadorProvider } from "./context/DadosJogadorContext";
import { useTheme } from "./context/ThemeContext";

import PageHome from "./pages/home/page";
import PagePromocoes from "./pages/promocoes/page";
import DoubleGame from "./pages/games/double/page";
import MinesGame from "./pages/games/mines/page";
import Login from "./pages/login/page";
import Cadastro from "./pages/cadastro/page";

function App() {
  const theme = useTheme();

  useEffect(() => {
    if (!theme) return;

    // Atualiza favicon
    const updateIcon = (rel, url) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (link && url) link.href = url;
    };

    updateIcon("icon", theme.faviconUrl);
    updateIcon("apple-touch-icon", theme.faviconUrl);
    updateIcon("mask-icon", theme.faviconUrl);

    // Atualiza título da página
    document.title = theme.titulo || "Meu Cassino";

    // Atualiza meta description
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = theme.descricao || "Bem-vindo ao melhor cassino onlines!";

    // Atualiza Open Graph tags
    const setOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setOgTag("og:title", theme.titulo || "Meu Cassino");
    setOgTag("og:description", theme.descricao || "Jogue e ganhe com estilo!");
    setOgTag("og:image", theme.imagemOg || "/default-og.jpg");
    setOgTag("og:url", window.location.href);
    setOgTag("twitter:card", "summary_large_image");

  }, [theme]);

  return (
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
                <PagePromocoes />
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
  );
}

export default App;
