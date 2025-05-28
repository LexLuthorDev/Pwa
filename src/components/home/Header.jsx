import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
        <div className="md:flex flex items-center space-x-1">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-[8px] border border-red-500 text-red-500 hover:bg-red-500/10 font-medium cursor-pointer transition-colors bg-[#1a1a1a]"
            >
              Sair
            </button>
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
