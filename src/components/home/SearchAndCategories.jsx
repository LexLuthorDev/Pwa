import { Handshake, Gift, Flag, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ==================== DADOS MOCKADOS ====================

// Categorias de jogos
const categoriaJogos = [
  { id: "presentes", nome: "Presentes", icone: Gift },
  { id: "missoes", nome: "Missões", icone: Flag },
  { id: "mensagens", nome: "Mensagens", icone: Mail },
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
              className={`flex px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                categoriaAtiva === "todos"
                  ? "bg-green-500 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setCategoriaAtiva("todos")}
            >
              <Handshake className="mr-2 w-4" />
              Indique e Ganhe
            </button>
            {categoriaJogos.map((categoria) => {
              const Icone = categoria.icone;
              return (
                <button
                  key={categoria.id}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    categoriaAtiva === categoria.id
                      ? "bg-green-500 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={() => setCategoriaAtiva(categoria.id)}
                >
                  <Icone className="w-4 h-4 mr-2" />
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
