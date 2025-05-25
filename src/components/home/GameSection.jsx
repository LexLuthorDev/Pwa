import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ==================== COMPONENTE CARROSSEL DE JOGOS ====================
function CarrosselJogos({ jogos }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [itensVisiveis, setItensVisiveis] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  const navigate = useNavigate();

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
                ? "w-[calc(80%-6px)] sm:w-[calc(80%-8px)]"
                : itensVisiveis === 2
                ? "w-[calc(50%-6px)] sm:w-[calc(50%-8px)]"
                : "w-[calc(25%-8px)] sm:w-[calc(25%-11px)]"
            }`}
          >
            <div className="p-0 relative">
              <div className="relative h-36 sm:h-40 md:h-48 w-full">
                <img
                  src={jogo.imagem || "https://placehold.co/300x200"}
                  alt={jogo.titulo}
                  className="w-full h-full"
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
                  <button
                    onClick={() => navigate(`/games/${jogo.nome}`)}
                    className="px-4 py-2 rounded-[8px] border border-transparent text-white bg-[#1a1a1a] font-medium cursor-pointer transition-all duration-200"
                  >
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


export default function GameSection({ titulo, jogos }) {
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
