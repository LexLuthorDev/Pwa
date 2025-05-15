"use client";

import { useState, useRef, useEffect } from "react";
import "./App.css";

import {
  AlertTriangle,
  BookOpen,
  Dices,
  Facebook,
  GamepadIcon,
  HelpCircle,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Twitter,
  Users,
  Zap,
} from "lucide-react";

// ==================== COMPONENTE APP PRINCIPAL ====================
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Cabeçalho */}
      <Header />

      <main className="flex-1">
        {/* Seção de Banner */}
        <BannerSection />

        {/* Seção de Promoções */}
        <PromocoesSection />

        {/* Pesquisa e Categorias */}
        <SearchAndCategories />

        {/* Jogos em Destaque */}
        <GameSection titulo="Jogos em Destaque" jogos={jogosDestaque} />

        {/* Jogos Populares */}
        <GameSection titulo="Mais Jogados" jogos={jogosPopulares} />

        {/* Jogos Novos */}
        <GameSection titulo="Lançamentos" jogos={jogosNovos} />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

// ==================== COMPONENTE CABEÇALHO ====================
function Header() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

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
          <button className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500/10 transition-colors">
            Entrar
          </button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white transition-colors">
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
          <button className="w-full px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500/10 transition-colors">
            Entrar
          </button>
          <button className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white transition-colors">
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
}

// ==================== COMPONENTE SEÇÃO DE BANNER ====================
function BannerSection() {
  return (
    <section className="relative h-[180px] sm:h-[250px] md:h-[400px] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-900/70"></div>
      <img
        src="https://placehold.co/300x200"
        alt="Banner do Cassino"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
    </section>
  );
}

// ==================== COMPONENTE PESQUISA E CATEGORIAS ====================
function SearchAndCategories() {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const categoriesRef = useRef(null);

  // Função para scroll horizontal com toque
  useEffect(() => {
    const categoriesEl = categoriesRef.current;
    if (!categoriesEl) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - categoriesEl.offsetLeft;
      scrollLeft = categoriesEl.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - categoriesEl.offsetLeft;
      const walk = (x - startX) * 2; // Velocidade do scroll
      categoriesEl.scrollLeft = scrollLeft - walk;
    };

    categoriesEl.addEventListener("mousedown", handleMouseDown);
    categoriesEl.addEventListener("mouseleave", handleMouseLeave);
    categoriesEl.addEventListener("mouseup", handleMouseUp);
    categoriesEl.addEventListener("mousemove", handleMouseMove);

    // Touch events
    categoriesEl.addEventListener(
      "touchstart",
      (e) => {
        isDown = true;
        startX = e.touches[0].pageX - categoriesEl.offsetLeft;
        scrollLeft = categoriesEl.scrollLeft;
      },
      { passive: false }
    );

    categoriesEl.addEventListener(
      "touchend",
      () => {
        isDown = false;
      },
      { passive: false }
    );

    categoriesEl.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - categoriesEl.offsetLeft;
        const walk = (x - startX) * 2;
        categoriesEl.scrollLeft = scrollLeft - walk;
      },
      { passive: false }
    );

    return () => {
      categoriesEl.removeEventListener("mousedown", handleMouseDown);
      categoriesEl.removeEventListener("mouseleave", handleMouseLeave);
      categoriesEl.removeEventListener("mouseup", handleMouseUp);
      categoriesEl.removeEventListener("mousemove", handleMouseMove);

      categoriesEl.removeEventListener("touchstart", handleMouseDown);
      categoriesEl.removeEventListener("touchend", handleMouseLeave);
      categoriesEl.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <section className="container mx-auto px-3 py-4 sm:py-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Pesquisar jogos..."
            className="w-full pl-9 py-2.5 text-sm sm:text-base rounded-md bg-zinc-800 border border-zinc-700 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
        </div>

        <div
          className="w-full overflow-x-auto pb-1 scrollbar-hide"
          ref={categoriesRef}
        >
          <div className="flex bg-zinc-800 gap-2 border border-zinc-700 rounded-md p-1 min-w-max">
            <button
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                categoriaAtiva === "todos"
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setCategoriaAtiva("todos")}
            >
              Todos os Jogos
            </button>
            {categoriaJogos.map((categoria) => (
              <button
                key={categoria.id}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  categoriaAtiva === categoria.id
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setCategoriaAtiva(categoria.id)}
              >
                {categoria.nome}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== COMPONENTE SEÇÃO DE JOGOS ====================
function GameSection({ titulo, jogos }) {
  return (
    <section className="container mx-auto px-3 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{titulo}</h2>
        <a
          href="#"
          className="text-xs sm:text-sm text-green-500 hover:underline"
        >
          Ver todos
        </a>
      </div>
      <CarrosselJogos jogos={jogos} />
    </section>
  );
}

// ==================== COMPONENTE CARROSSEL DE JOGOS ====================
function CarrosselJogos({ jogos }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [itensVisiveis, setItensVisiveis] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  // Ajusta o número de itens visíveis com base no tamanho da tela
  useEffect(() => {
    function atualizarTamanho() {
      if (window.innerWidth < 640) {
        setItensVisiveis(1);
      } else if (window.innerWidth < 1024) {
        setItensVisiveis(2);
      } else {
        setItensVisiveis(3);
      }
    }

    window.addEventListener("resize", atualizarTamanho);
    atualizarTamanho();

    return () => window.removeEventListener("resize", atualizarTamanho);
  }, []);

  const podeRolarEsquerda = indiceAtual > 0;
  const podeRolarDireita = indiceAtual < jogos.length - itensVisiveis;

  const handleAnterior = () => {
    if (podeRolarEsquerda) {
      setIndiceAtual(indiceAtual - 1);
    }
  };

  const handleProximo = () => {
    if (podeRolarDireita) {
      setIndiceAtual(indiceAtual + 1);
    }
  };

  // Rola o carrossel quando o índice muda
  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount =
        (containerRef.current.scrollWidth / jogos.length) * indiceAtual;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [indiceAtual, jogos.length]);

  // Funções para swipe em dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75 && podeRolarDireita) {
      // Swipe para a esquerda
      handleProximo();
    }

    if (touchStart - touchEnd < -75 && podeRolarEsquerda) {
      // Swipe para a direita
      handleAnterior();
    }
  };

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-3 sm:gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className={`flex-shrink-0 snap-start bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 active:scale-[0.98] ${
              itensVisiveis === 1
                ? "w-full"
                : itensVisiveis === 2
                ? "w-[calc(50%-6px)] sm:w-[calc(50%-8px)]"
                : "w-[calc(33.333%-8px)] sm:w-[calc(33.333%-11px)]"
            }`}
          >
            <div className="p-0 relative">
              <div className="relative h-36 sm:h-40 md:h-48 w-full">
                <img
                  src={jogo.imagem || "https://placehold.co/300x200"}
                  alt={jogo.titulo}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                {jogo.quente && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    QUENTE
                  </div>
                )}

                {jogo.novo && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    NOVO
                  </div>
                )}

                {/* Contador de jogadores online */}
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                  {Math.floor(Math.random() * 1000) + 100} online
                </div>
              </div>

              <div className="p-2.5 sm:p-3 text-start">
                <h3 className="font-bold text-sm sm:text-base mb-0.5 truncate">
                  {jogo.titulo}
                </h3>
                <p className="text-zinc-400 text-xs mb-2 truncate">
                  {jogo.fornecedor}
                </p>

                {/* Tags de categoria */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {["Slots", "Cassino", "Popular"]
                    .slice(0, Math.floor(Math.random() * 3) + 1)
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="text-[10px] px-1.5 py-0.5 bg-zinc-700 text-zinc-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill={i < jogo.avaliacao ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          i < jogo.avaliacao
                            ? "text-green-500"
                            : "text-zinc-600"
                        }
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <button className="px-2 py-1 text-xs rounded-md bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white active:scale-95 transition-transform">
                    Jogar
                  </button>
                </div>

                {/* Informações adicionais */}
                <div className="mt-2 pt-2 border-t border-zinc-700 grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 text-zinc-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {Math.floor(Math.random() * 30) + 5} min
                  </div>
                  <div className="flex items-center justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 text-zinc-500"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {Math.floor(Math.random() * 1000) + 500}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de paginação para mobile */}
      <div className="flex justify-center mt-2 sm:hidden">
        {Array.from({ length: Math.ceil(jogos.length / itensVisiveis) }).map(
          (_, i) => (
            <button
              key={i}
              className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                i === Math.floor(indiceAtual / itensVisiveis)
                  ? "bg-green-500"
                  : "bg-zinc-600"
              }`}
              onClick={() => setIndiceAtual(i * itensVisiveis)}
              aria-label={`Ir para página ${i + 1}`}
            />
          )
        )}
      </div>

      {/* Botões de navegação (visíveis apenas em telas maiores) */}
      <button
        className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-2 bg-zinc-800/80 border border-zinc-700 text-white items-center justify-center ${
          !podeRolarEsquerda
            ? "opacity-0 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100 transition-opacity"
        }`}
        onClick={handleAnterior}
        disabled={!podeRolarEsquerda}
        aria-label="Anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full p-2 bg-zinc-800/80 border border-zinc-700 text-white items-center justify-center ${
          !podeRolarDireita
            ? "opacity-0 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100 transition-opacity"
        }`}
        onClick={handleProximo}
        disabled={!podeRolarDireita}
        aria-label="Próximo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

// Vamos adicionar um componente de promoções para mobile
function PromocoesSection() {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const scrollRef = useRef(null);

  // Funções para swipe em dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);

    // Previne o scroll vertical durante o swipe horizontal
    if (Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!scrollRef.current) return;

    const scrollAmount = 280; // Largura aproximada de cada card + gap

    if (touchStart - touchEnd > 75) {
      // Swipe para a esquerda - avança
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    if (touchStart - touchEnd < -75) {
      // Swipe para a direita - volta
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-3 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-bold">Promoções</h2>
        <a
          href="#"
          className="text-xs sm:text-sm text-green-500 hover:underline"
        >
          Ver todas
        </a>
      </div>
      <div
        className="flex justify-between overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x snap-mandatory scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700"
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[32.3%] bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-900/70"></div>
            <img
              src="https://placehold.co/300x200"
              alt="Bônus de Boas-vindas"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[32.3%] bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-900/70"></div>
            <img
              src="https://placehold.co/300x200"
              alt="Giros Grátis"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[32.3%] bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-900/70"></div>
            <img
              src="https://placehold.co/300x200"
              alt="Cashback Semanal"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== COMPONENTE RODAPÉ ====================
function Footer() {
  return (
    <footer className="bg-zinc-800 border-t border-zinc-700 py-6 sm:py-8">
      <div className="container mx-auto px-3">
        {/* Versão desktop */}
        <div className="sm:grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-1 text-left sm:text-left mb-6 sm:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="https://zonebets.site/public/uploads/57125022025223826.png"
                alt="Logo do Cassino"
                className="h-12 sm:h-16 max-w-full object-contain"
              />
            </a>
            <p className="text-zinc-400 text-sm sm:text-base">
              A melhor experiência de cassino online com uma grande variedade de
              jogos e bônus emocionantes.
            </p>

            {/* Redes sociais */}
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-zinc-400 hover:text-green-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-green-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-green-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mb-6 sm:mb-0">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 flex items-center">
              <GamepadIcon className="w-4 h-4 mr-2 text-green-500" />
              Jogos
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-zinc-400 text-sm sm:text-base">
              {categoriaJogos.slice(0, 4).map((categoria) => (
                <li key={categoria.id}>
                  <a
                    href={`/jogos/${categoria.id}`}
                    className="hover:text-green-500 flex items-center"
                  >
                    <Dices className="w-3.5 h-3.5 mr-2 opacity-70" />
                    {categoria.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 sm:mb-0">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-green-500" />
              Suporte
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-zinc-400 text-sm sm:text-base">
              <li>
                <a
                  href="/faq"
                  className="hover:text-green-500 flex items-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="hover:text-green-500 flex items-center"
                >
                  <Mail className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  href="/termos"
                  className="hover:text-green-500 flex items-center"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Termos e Condições
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="hover:text-green-500 flex items-center"
                >
                  <Shield className="w-3.5 h-3.5 mr-2 opacity-70" />
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 text-left">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-green-500" />
              Jogo Responsável
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base mb-3 sm:mb-4">
              Promovemos o jogo responsável. Por favor, jogue com
              responsabilidade e estabeleça limites para si mesmo.
            </p>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md border border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              Auto-Exclusão
            </button>

            {/* Contato rápido */}
            <div className="mt-4 flex items-center text-zinc-400 text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>Suporte: (11) 9999-9999</span>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-zinc-700 text-center text-zinc-400">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Zone Bets. Todos os direitos
            reservados.
          </p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-yellow-500" />
            Este site é destinado a maiores de 18 anos. Jogue com
            responsabilidade.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== DADOS MOCKADOS ====================

// Categorias de jogos
const categoriaJogos = [
  { id: "slots", nome: "Caça-Níqueis" },
  { id: "mesa", nome: "Jogos de Mesa" },
  { id: "aovivo", nome: "Cassino ao Vivo" },
  { id: "esportes", nome: "Apostas Esportivas" },
  { id: "poker", nome: "Poker" },
  { id: "jackpot", nome: "Jackpots" },
];

// Jogos em destaque
const jogosDestaque = [
  {
    id: "jogo1",
    titulo: "Tigre da Fortuna",
    imagem: "https://placehold.co/300x200",
    fornecedor: "PG Soft",
    avaliacao: 4.8,
    quente: true,
  },
  {
    id: "jogo2",
    titulo: "Blackjack VIP",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Evolution Gaming",
    avaliacao: 4.7,
  },
  {
    id: "jogo3",
    titulo: "Mega Moolah",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Microgaming",
    avaliacao: 4.9,
    quente: true,
  },
  {
    id: "jogo4",
    titulo: "Livro dos Mortos",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Play'n GO",
    avaliacao: 4.6,
  },
  {
    id: "jogo5",
    titulo: "Sweet Bonanza",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.8,
    quente: true,
  },
  {
    id: "jogo6",
    titulo: "Roleta Relâmpago",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Evolution Gaming",
    avaliacao: 4.7,
  },
];

// Jogos populares
const jogosPopulares = [
  {
    id: "pop1",
    titulo: "Starburst",
    imagem: "https://placehold.co/300x200",
    fornecedor: "NetEnt",
    avaliacao: 4.5,
  },
  {
    id: "pop2",
    titulo: "A Busca de Gonzo",
    imagem: "https://placehold.co/300x200",
    fornecedor: "NetEnt",
    avaliacao: 4.6,
    quente: true,
  },
  {
    id: "pop3",
    titulo: "Crazy Time",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Evolution Gaming",
    avaliacao: 4.9,
    quente: true,
  },
  {
    id: "pop4",
    titulo: "Lobo Dourado",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.4,
  },
  {
    id: "pop5",
    titulo: "Portões do Olimpo",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.7,
    quente: true,
  },
  {
    id: "pop6",
    titulo: "Big Bass Bonanza",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.5,
  },
];

// Jogos novos
const jogosNovos = [
  {
    id: "novo1",
    titulo: "Money Train 3",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Relax Gaming",
    avaliacao: 4.8,
    novo: true,
  },
  {
    id: "novo2",
    titulo: "Wild West Gold Megaways",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.6,
    novo: true,
  },
  {
    id: "novo3",
    titulo: "Reactoonz 3",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Play'n GO",
    avaliacao: 4.7,
    novo: true,
  },
  {
    id: "novo4",
    titulo: "Immortal Romance II",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Microgaming",
    avaliacao: 4.5,
    novo: true,
  },
  {
    id: "novo5",
    titulo: "Cash Elevator",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.4,
    novo: true,
  },
  {
    id: "novo6",
    titulo: "Fruit Party 2",
    imagem: "https://placehold.co/300x200",
    fornecedor: "Pragmatic Play",
    avaliacao: 4.3,
    novo: true,
  },
];

export default App;
