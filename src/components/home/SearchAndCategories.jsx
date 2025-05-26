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

  useEffect(() => {
  const categoriesEl = categoriesRef.current;
  if (!categoriesEl) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // ======= HANDLERS ========
  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - categoriesEl.offsetLeft;
    scrollLeft = categoriesEl.scrollLeft;
  };

  const handleMouseUp = () => (isDown = false);
  const handleMouseLeave = () => (isDown = false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - categoriesEl.offsetLeft;
    const walk = (x - startX) * 2;
    categoriesEl.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    isDown = true;
    startX = e.touches[0].pageX - categoriesEl.offsetLeft;
    scrollLeft = categoriesEl.scrollLeft;
  };

  const handleTouchEnd = () => (isDown = false);

  const handleTouchMove = (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - categoriesEl.offsetLeft;
    const walk = (x - startX) * 2;
    categoriesEl.scrollLeft = scrollLeft - walk;
  };

  // ======= BIND EVENTS ========
  categoriesEl.addEventListener("mousedown", handleMouseDown);
  categoriesEl.addEventListener("mouseup", handleMouseUp);
  categoriesEl.addEventListener("mouseleave", handleMouseLeave);
  categoriesEl.addEventListener("mousemove", handleMouseMove);

  categoriesEl.addEventListener("touchstart", handleTouchStart, {
    passive: false,
  });
  categoriesEl.addEventListener("touchend", handleTouchEnd, {
    passive: false,
  });
  categoriesEl.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });

  // ======= AUTO SCROLL ========
  const passo = 1;
  const intervalo = 20;
  const autoScroll = setInterval(() => {
    if (
      categoriesEl.scrollLeft + categoriesEl.clientWidth >=
      categoriesEl.scrollWidth
    ) {
      categoriesEl.scrollLeft = 0;
    } else {
      categoriesEl.scrollLeft += passo;
    }
  }, intervalo);

  // ======= CLEANUP ========
  return () => {
    clearInterval(autoScroll);
    categoriesEl.removeEventListener("mousedown", handleMouseDown);
    categoriesEl.removeEventListener("mouseup", handleMouseUp);
    categoriesEl.removeEventListener("mouseleave", handleMouseLeave);
    categoriesEl.removeEventListener("mousemove", handleMouseMove);

    categoriesEl.removeEventListener("touchstart", handleTouchStart);
    categoriesEl.removeEventListener("touchend", handleTouchEnd);
    categoriesEl.removeEventListener("touchmove", handleTouchMove);
  };
}, []);


  return (
    <section className="container mx-auto px-1 py-0 sm:py-0">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Campo de busca */}
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

        {/* Lista de categorias com auto-slide */}
        <div
          className="w-full overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          ref={categoriesRef}
        >
          <div className="flex bg-zinc-800 gap-2 border border-zinc-700 rounded-md p-1 min-w-max">
            {categoriaJogos.map((categoria) => {
              const Icone = categoria.icone;
              const ativa = categoriaAtiva === categoria.id;

              return (
                <button
                  key={categoria.id}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors snap-start ${
                    categoria.is_span ? "bg-zinc-700 text-white" : "bg-green-500 text-white"
                      
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
