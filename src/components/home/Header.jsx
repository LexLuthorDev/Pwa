"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useDadosJogador } from "@/context/DadosJogadorContext";
import {
  Gift,
  Menu,
  User,
  DollarSign,
  CreditCard,
  Users,
  Target,
  MessageCircle,
  Globe,
  Crown,
  UserPlus,
  Headphones,
  X,
} from "lucide-react";
import usePwaInstallPrompt from "@/hooks/usePwaInstallPrompt";


export default function Header({ offsetTop = 0 }) {
  const { showInstallModal, triggerInstall, setShowInstallModal } =
      usePwaInstallPrompt();
  
  const theme = useTheme();
  const { dadosJogador } = useDadosJogador();
  const saldoJogador = dadosJogador?.usuario?.jogador?.saldo_total ?? 0;
  const { isAuthenticated, logout } = useAuth();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const navigate = useNavigate();

  const irParaLogin = () => navigate("/login?tab=login");
  const irParaCadastro = () => navigate("/cadastro");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Itens do menu lateral
  const menuItems = [
    {
      icon: DollarSign,
      label: "Sacar",
      bgColor: "#22C55E",
      textColor: "#FFFFFF",
    },
    {
      icon: CreditCard,
      label: "Depositar",
      bgColor: "#000000",
      textColor: "#FFFFFF",
    },
    {
      icon: Users,
      label: "Indique e Ganhe",
      bgColor: "#22C55E",
      textColor: "#FFFFFF",
      badge: "💸 Banca Grátis!",
      is_span: false,
    },
    {
      icon: Gift,
      label: "Presentes",
      bgColor: theme?.bg_secundario,
      textColor: "#FFFFFF",
      badge: "🎁 Coletar agora!",
      is_span: true,
    },
    {
      icon: Target,
      label: "Missões",
      bgColor: "#22C55E",
      textColor: "#FFFFFF",
      notification: 2,
      is_span: false,
    },
    {
      icon: MessageCircle,
      label: "Mensagens!",
      bgColor: theme?.bg_secundario,
      textColor: "#FFFFFF",
      notification: 3,
      is_span: true,
    },
    {
      icon: Globe,
      label: "Alterar Idioma",
      bgColor: "#22C55E",
      textColor: "#FFFFFF",
      is_span: false,
    },
    {
      icon: Crown,
      label: "Quero ser VIP!",
      bgColor: "#EAB308",
      textColor: "#000000",
      is_span: false,
    },
    {
      icon: UserPlus,
      label: "Quero me Afiliar!",
      bgColor: "#22C55E",
      textColor: "#FFFFFF",
      is_span: false,
    },
    {
      icon: Headphones,
      label: "Suporte (24h)",
      bgColor: theme?.bg_secundario,
      textColor: "#FFFFFF",
      is_span: true,
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        style={{ backgroundColor: theme?.cor_secundaria, top: `${offsetTop}px`  }}
        className="sticky z-50 backdrop-blur-sm border-b border-zinc-700 w-full pr-2 pl-2"
      >
        <div className="container mx-auto px-1 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/assets/logo.svg"
                alt="Logo do Cassino"
                className="h-12 sm:h-16 max-w-full object-contain"
              />
            </a>
          </div>

          {/* NAVEGAÇÃO */}
          <div
            className={`w-[60%] ${
              isAuthenticated
                ? "flex flex-row items-center justify-start space-x-4"
                : "flex items-center justify-end space-x-1 md:flex"
            }`}
          >
            {isAuthenticated ? (
              <>
                <div
                  style={{ color: theme?.cor_texto_primaria }}
                  className="flex-grow"
                >
                  <span className="flex flex-col justify-center items-start">
                    Seu saldo:
                    <span className="font-bold">{saldoJogador}</span>
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <span className="w-full flex flex-col justify-center items-start mr-0 relative">
                    <button
                      onClick={handleLogout}
                      style={{
                        backgroundColor: theme?.cor_primaria,
                        color: theme?.cor_texto_primaria,
                      }}
                      className="px-1 py-1 rounded-md border border-transparent font-medium cursor-pointer transition-all duration-200 relative"
                    >
                      <Gift />
                      <span
                        style={{
                          backgroundColor: theme?.cor_tercearia,
                          color: theme?.cor_texto_dark,
                        }}
                        className="absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                      >
                        3
                      </span>
                    </button>
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setMenuMobileAberto((prev) => !prev)}
                    style={{ color: theme?.cor_texto_primaria }}
                    className="px-1 py-1 rounded-md border border-transparent font-medium cursor-pointer transition-all duration-200"
                  >
                    <Menu />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={irParaCadastro}
                    className="px-4 py-1 rounded-full border border-transparent text-white bg-green-500 font-medium cursor-pointer transition-all duration-200"
                  >
                    Registre-se
                  </button>
                  <span className="absolute -top-3 -right-0 bg-yellow-300 text-black text-xs font-bold px-3 py-0.5 rounded-full transform rotate-1">
                    <img
                      src="/assets/pix.svg"
                      alt="PIX"
                      className="inline-block w-4 h-4 mr-1"
                    />
                    PIX
                  </span>
                </div>
                <button
                  onClick={irParaLogin}
                  className="px-4 py-1 rounded-full border border-green-500 text-green-500 hover:bg-green-500/10 font-medium cursor-pointer transition-colors bg-[#1a1a1a]"
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {menuMobileAberto && (
        <div
          onClick={() => setMenuMobileAberto(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm backdrop-brightness-75 transition-all"
        ></div>
      )}

      {/* MENU LATERAL */}
      {menuMobileAberto && (
        <aside
          className={`fixed top-0 right-0 w-64 h-screen z-50 shadow-lg transform transition-transform duration-300 flex flex-col ${
            menuMobileAberto ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundColor: theme?.bg_card || "#18181B",
            color: theme?.cor_texto_primaria,
          }}
        >
          {/* Header do Menu */}
          <div className="flex justify-between items-center p-4 border-b border-zinc-700">
            <span
              style={{ backgroundColor: theme?.bg_secundario }}
              className="flex items-center gap-2 px-6 py-2 rounded-md"
            >
              <User style={{ color: theme?.cor_texto_primaria }} />{" "}
              <span
                style={{ color: theme?.cor_primaria }}
                className="font-bold mt-1"
              >
                Meu Perfil
              </span>
            </span>
            <button
              onClick={() => setMenuMobileAberto(false)}
              style={{ borderColor: theme?.cor_primaria }}
              className="text-xl px-1 py-2 rounded-md border border-transparent font-medium cursor-pointer transition-all duration-200"
            >
              <X />
            </button>
          </div>

          {/* Seção botões sacar e depositar */}
          <div className="flex gap-2 p-4 relative">
            {/* Botão Sacar */}
            <div className="relative w-full">
              <button
                className="w-full flex flex-col items-center justify-center gap-2 py-5 px-0 rounded-md font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
              >
                <DollarSign className="w-4 h-4" />
                Sacar
              </button>
              {/* Badge Sacar */}
              <span
                className="absolute flex items-center gap-1 -top-1 -right-1 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: theme?.cor_tercearia || "#F59E0B",
                  color: theme?.cor_texto_dark || "#000",
                }}
              >
                <img src="/assets/pix.svg" alt="PIX" className="w-4 h-4" />{" "}
                Disponível
              </span>
            </div>

            {/* Botão Depositar */}
            <div className="relative w-full">
              <button
                className="w-full flex flex-col items-center justify-center gap-2 py-5 px-0 rounded-md font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#6B7280", color: "#FFFFFF" }}
              >
                <CreditCard className="w-4 h-4" />
                Depositar
              </button>
              {/* Badge Depositar */}
              <span
                className="absolute flex items-center gap-1 -top-1 -right-1 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: theme?.cor_tercearia || "#F59E0B",
                  color: theme?.cor_texto_dark || "#000",
                }}
              >
                <img src="/assets/pix.svg" alt="PIX" className="w-4 h-4" /> Pix
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="p-2">
              {menuItems.slice(2).map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 py-3 mb-2 rounded-md font-medium text-sm transition-opacity hover:opacity-90 relative ${
                    item.is_span == true ? "px-3" : "px-4"
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                  }}
                >
                  {item.is_span ? (
                    <span className="flex bg-green-500 p-1 rounded-md items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </span>
                  ) : (
                    <item.icon className="w-5 h-5" />
                  )}

                  <span className="flex-1 text-left">{item.label}</span>

                  {/* Badge para "Indique e Ganhe" */}
                  {item.badge && (
                    <span
                      className="absolute -top-2 -right-1 text-xs font-bold px-2 py-1 rounded-full transform rotate-0"
                      style={{
                        backgroundColor: theme?.cor_tercearia,
                        color: theme?.cor_texto_dark,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Notificações */}
                  {item.notification && (
                    <span
                      className="absolute -top-1 -right-1 text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center"
                      style={{
                        backgroundColor: theme?.cor_tercearia,
                        color: theme?.cor_texto_dark,
                      }}
                    >
                      {item.notification}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer com informações */}
          <div className="p-4 border-t border-zinc-700">
            <div
              style={{ color: theme?.cor_primaria }}
              className="text-xs opacity-70 text-center"
            >
              <p>Plataforma Oficialmente</p>
              <p>Licenciada no BRASIL</p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
