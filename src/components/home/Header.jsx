import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Gift, Menu } from "lucide-react";

export default function Header() {
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
    <header className="sticky top-0 z-50 bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-700">
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
              <div className="flex-grow">
                <span className="flex flex-col justify-center items-start">
                  Seu saldo:
                  <span className="font-bold">R$ 12.073,00</span>
                </span>
              </div>

              {/* Tamanho automático, não cresce */}
              <div className=" flex items-center justify-center">
                <span className="w-full flex flex-col justify-center items-start mr-0 relative">
                  <button
                    onClick={handleLogout}
                    className="px-1 py-1 rounded-md border border-transparent text-white bg-green-500 font-medium cursor-pointer transition-all duration-200 relative"
                  >
                    <Gift />
                    <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  </button>
                </span>
              </div>

              {/* Tamanho automático, não cresce */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setMenuMobileAberto(true)}
                  className="px-1 py-1 rounded-md border border-transparent text-white font-medium cursor-pointer transition-all duration-200"
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
