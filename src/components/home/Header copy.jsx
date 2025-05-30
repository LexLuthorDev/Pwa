import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { useDadosJogador } from "@/context/DadosJogadorContext";

import { Gift, Menu } from "lucide-react";

export default function Header() {
  const theme = useTheme();
  
  const { dadosJogador } = useDadosJogador();

  console.log("Tema:", theme);


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

  return (
    <header style={{ backgroundColor: theme?.cor_secundaria }} className="sticky top-0 z-50  backdrop-blur-sm border-b border-zinc-700">
      <div className="container mx-auto px-1 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/assets/logo.svg"
              //src="https://winrico.site/public/uploads/12411032025090050.png"
              alt="Logo do Cassino"
              className="h-12 sm:h-16 max-w-full object-contain"
            />
          </a>
        </div>

        {/* Navegação Desktop */}
        <div
          className={`w-[60%] ${
            isAuthenticated
              ? "flex flex-row items-center justify-start space-x-4"
              : "flex items-center justify-end space-x-1 md:flex"
          }`}
        >
          {isAuthenticated ? (
            <>
              {/* Ocupa mais espaço com flex-grow */}
              <div style={{color: theme?.cor_texto_primaria}} className="flex-grow">
                <span className="flex flex-col justify-center items-start">
                  Seu saldo:
                  <span className="font-bold">{saldoJogador}</span>
                </span>
              </div>

              {/* Tamanho automático, não cresce */}
              <div className=" flex items-center justify-center">
                <span className="w-full flex flex-col justify-center items-start mr-0 relative">
                  <button
                    onClick={handleLogout}
                    style={{ backgroundColor: theme?.cor_primaria, color: theme?.cor_texto_primaria }}
                    className="px-1 py-1 rounded-md border border-transparent  font-medium cursor-pointer transition-all duration-200 relative"
                  >
                    <Gift />
                    <span style={{ backgroundColor: theme?.cor_tercearia, color: theme?.cor_texto_dark }} className="absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  </button>
                </span>
              </div>

              {/* Tamanho automático, não cresce */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setMenuMobileAberto(true)}
                  style={{color: theme?.cor_texto_primaria}}
                  className="px-1 py-1 rounded-md border border-transparent  font-medium cursor-pointer transition-all duration-200"
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
                {/* Badge PIX */}
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
  );
}
