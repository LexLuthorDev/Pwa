import { Handshake, Gift, Flag, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ==================== DADOS MOCKADOS ====================

const categoriaJogos = [
  {
    id: "indique_ganhe",
    nome: "Indique e Ganhe",
    icone: Handshake,
    is_span: false,
  },
  { id: "presentes", nome: "Presentes", icone: Gift, is_span: true },
  { id: "missoes", nome: "Missões", icone: Flag, is_span: false },
  { id: "mensagens", nome: "Mensagens", icone: Mail, is_span: true },
];

export default function SearchAndCategories() {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const categoriesRef = useRef(null);

  // Função para scroll horizontal com toque
  useEffect(() => {
    const categoriesEl = categoriesRef.current;
    if (!categoriesEl) return;

    let isDown = false;
    let isInteracting = false;
    let startX;
    let scrollLeft;
    let autoScroll;

    // Scroll por mouse
    const handleMouseDown = (e) => {
      isDown = true;
      isInteracting = true;
      startX = e.pageX - categoriesEl.offsetLeft;
      scrollLeft = categoriesEl.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      isInteracting = false;
    };

    const handleMouseUp = () => {
      isDown = false;
      isInteracting = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - categoriesEl.offsetLeft;
      const walk = (x - startX) * 2;
      categoriesEl.scrollLeft = scrollLeft - walk;
    };

    // Scroll por touch
    const handleTouchStart = (e) => {
      isDown = true;
      isInteracting = true;
      startX = e.touches[0].pageX - categoriesEl.offsetLeft;
      scrollLeft = categoriesEl.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDown = false;
      isInteracting = false;
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - categoriesEl.offsetLeft;
      const walk = (x - startX) * 2;
      categoriesEl.scrollLeft = scrollLeft - walk;
    };

    // Auto-scroll infinito
    const startAutoScroll = () => {
      autoScroll = setInterval(() => {
        if (!categoriesEl || isInteracting) return;
        categoriesEl.scrollLeft += 1;

        // Reset suave no meio (duplicado)
        if (categoriesEl.scrollLeft >= categoriesEl.scrollWidth / 2) {
          categoriesEl.scrollLeft = 0;
        }
      }, 30);
    };

    startAutoScroll();

    // Listeners
    categoriesEl.addEventListener("mousedown", handleMouseDown);
    categoriesEl.addEventListener("mouseleave", handleMouseLeave);
    categoriesEl.addEventListener("mouseup", handleMouseUp);
    categoriesEl.addEventListener("mousemove", handleMouseMove);

    categoriesEl.addEventListener("touchstart", handleTouchStart, { passive: false });
    categoriesEl.addEventListener("touchend", handleTouchEnd, { passive: false });
    categoriesEl.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      clearInterval(autoScroll);
      categoriesEl.removeEventListener("mousedown", handleMouseDown);
      categoriesEl.removeEventListener("mouseleave", handleMouseLeave);
      categoriesEl.removeEventListener("mouseup", handleMouseUp);
      categoriesEl.removeEventListener("mousemove", handleMouseMove);

      categoriesEl.removeEventListener("touchstart", handleTouchStart);
      categoriesEl.removeEventListener("touchend", handleTouchEnd);
      categoriesEl.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section className="container mx-auto px-1 py-0 sm:py-0">
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
            {[...categoriaJogos, ...categoriaJogos].map((categoria, index) => {
              const Icone = categoria.icone;
              return (
                <button
                  key={categoria.id + "_" + index}
                  className={`flex items-center px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    categoria.is_span === false
                      ? "bg-green-500 text-white"
                      : "bg-zinc-700 text-white hover:text-white"
                  }`}
                  onClick={() => setCategoriaAtiva(categoria.id)}
                >
                  {categoria.is_span ? (
                    <span className="mr-2 bg-green-500 p-1 rounded-sm">
                      <Icone className="w-4 h-4" />
                    </span>
                  ) : (
                    <Icone className="w-4 h-4 mr-2" />
                  )}
                  {categoria.nome}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
