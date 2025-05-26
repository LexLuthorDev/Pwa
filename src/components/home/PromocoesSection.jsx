import { useState, useRef } from "react";
import { Star } from "lucide-react";

export default function PromocoesSection() {
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
    <section className="container mx-auto px-1 py-3 sm:py-2">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-300 text-zinc-800 text-sm px-1 py-1 rounded-[5px]">
          <img src="/assets/estrela_black.svg" alt="Estrela" className="w-3" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold">Promoções</h2>
        </div>
        <div>
        <a
          href="#"
          className="text-xs sm:text-sm text-green-500 hover:underline"
        >
          Ver todas
        </a>
        </div>
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
