"use client";

import { useNavigate } from "react-router-dom";
import { Home, Gift, Menu, Smile, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#111827] border-t border-zinc-800 flex justify-around items-center h-16 z-50">
      <button onClick={() => navigate("/")} className="text-white flex flex-col items-center text-xs">
        <Home style={{ color: theme?.cor_primaria }} className="w-5 h-5" />
        Início
      </button>

      <button onClick={() => navigate("/bonus")} className="text-white flex flex-col items-center text-xs">
        <Gift style={{ color: theme?.cor_primaria }} className="w-5 h-5" />
        Bônus
      </button>

      {/* Botão Central - Destaque */}
      <div className="relative z-50 -mt-12">
        <button
          onClick={() => navigate("/jogar")}
          style={{ backgroundColor: theme?.cor_primaria }}
          className=" w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#111827] shadow-xl"
        >
          <Smile  className="text-white w-8 h-8" />
        </button>
      </div>

      <button onClick={() => navigate("/perfil")} className="text-white flex flex-col items-center text-xs">
        <User style={{ color: theme?.cor_primaria }} className="w-5 h-5" />
        Perfil
      </button>

      <button onClick={() => navigate("/menu")} className="text-white flex flex-col items-center text-xs">
        <Menu style={{ color: theme?.cor_primaria }} className="w-5 h-5" />
        Menu
      </button>
    </nav>
  );
}
