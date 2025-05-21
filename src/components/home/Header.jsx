import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const navigate = useNavigate(); // ✅ necessário

  const irParaLogin = () => navigate("/login?tab=login");
const irParaCadastro = () => navigate("/login?tab=register");

  return (
    <header className="sticky top-0 z-50 bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-700">
      <div className="container mx-auto px-3 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://zonebets.site/public/uploads/57125022025223826.png"
              alt="Logo do Cassino"
              className="h-12 sm:h-16 max-w-full object-contain"
            />
          </a>
        </div>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={irParaLogin} className="px-4 py-2 rounded-[8px] border border-green-500 text-green-500 hover:bg-green-500/10 font-medium cursor-pointer transition-colors bg-[#1a1a1a]">
            Entrar
          </button>
          <button onClick={irParaCadastro} className="px-4 py-2 rounded-[8px] border border-transparent text-white bg-[#1a1a1a] font-medium cursor-pointer transition-all duration-200">
            Cadastrar
          </button>
        </div>

        {/* Botão do Menu Mobile */}
        <button
          className="md:hidden text-white p-1 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
          onClick={() => setMenuMobileAberto(!menuMobileAberto)}
          aria-label={menuMobileAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuMobileAberto}
        >
          {menuMobileAberto ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile - Animação de slide */}
      <div
        className={`md:hidden bg-zinc-800 border-b border-zinc-700 overflow-hidden transition-all duration-300 ease-in-out ${
          menuMobileAberto
            ? "max-h-24 py-3 opacity-100"
            : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-2">
          <button onClick={irParaLogin} className="w-full px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500/10 transition-colors">
            Entrar
          </button>
          <button onClick={irParaCadastro} className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white transition-colors">
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
}
