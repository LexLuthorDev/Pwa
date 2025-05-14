"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"

// ==================== COMPONENTE APP PRINCIPAL ====================
// Vamos modificar o componente App para incluir as novas seções
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

        {/* Seção de Download do App */}
        <DownloadAppSection />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  )
}

// ==================== COMPONENTE CABEÇALHO ====================
// Vamos melhorar o componente Header para ser mais mobile-friendly
// Modificar o Header para ter um design mais compacto em dispositivos móveis
function Header() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-700">
      <div className="container mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/favicon.svg" alt="Logo do Cassino" width={32} height={32} className="mr-2 sm:w-10 sm:h-10" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
              Cassino Sorte Grande
            </span>
          </a>
        </div>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500/10">
            Entrar
          </button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white">
            Cadastrar
          </button>
        </div>

        {/* Botão do Menu Mobile */}
        <button className="md:hidden text-white p-1" onClick={() => setMenuMobileAberto(!menuMobileAberto)}>
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
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuMobileAberto && (
        <div className="md:hidden bg-zinc-800 border-b border-zinc-700 py-3">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <button className="w-full px-4 py-2 rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500/10">
              Entrar
            </button>
            <button className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white">
              Cadastrar
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

// ==================== COMPONENTE SEÇÃO DE BANNER ====================
// Vamos melhorar o BannerSection para ser mais otimizado para mobile
function BannerSection() {
  return (
    <section className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-red-900/80 z-10"></div>
      <img
        src="https://placehold.co/1200x400"
        alt="Banner do Cassino"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
          Bem-vindo ao{" "}
          <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            Cassino Sorte Grande
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 max-w-2xl">
          Experimente a emoção de ganhar com nossa ampla seleção de jogos e bônus exclusivos.
        </p>
        <button className="w-fit px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white">
          Jogar Agora
        </button>
      </div>
    </section>
  )
}

// ==================== COMPONENTE PESQUISA E CATEGORIAS ====================
// Vamos melhorar o SearchAndCategories para ser mais responsivo em mobile
function SearchAndCategories() {
  const [termoPesquisa, setTermoPesquisa] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos")

  return (
    <section className="container mx-auto px-4 py-4 sm:py-6">
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
            className="w-full pl-9 py-2 text-sm sm:text-base rounded-md bg-zinc-800 border border-zinc-700 text-white"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
        </div>

        <div className="w-full overflow-x-auto pb-1">
          <div className="flex bg-zinc-800 border border-zinc-700 rounded-md p-1 min-w-max">
            <button
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                categoriaAtiva === "todos" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setCategoriaAtiva("todos")}
            >
              Todos os Jogos
            </button>
            {categoriaJogos.map((categoria) => (
              <button
                key={categoria.id}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  categoriaAtiva === categoria.id ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
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
  )
}

// ==================== COMPONENTE SEÇÃO DE JOGOS ====================
// Vamos melhorar o GameSection para ser mais compacto em mobile
function GameSection({ titulo, jogos }) {
  return (
    <section className="container mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{titulo}</h2>
        <a href="#" className="text-xs sm:text-sm text-amber-500 hover:underline">
          Ver todos
        </a>
      </div>
      <CarrosselJogos jogos={jogos} />
    </section>
  )
}

// ==================== COMPONENTE CARROSSEL DE JOGOS ====================
// Vamos melhorar o CarrosselJogos para ser mais otimizado para mobile
function CarrosselJogos({ jogos }) {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [itensVisiveis, setItensVisiveis] = useState(3)
  const containerRef = useRef(null)

  // Ajusta o número de itens visíveis com base no tamanho da tela
  useEffect(() => {
    function atualizarTamanho() {
      if (window.innerWidth < 640) {
        setItensVisiveis(1)
      } else if (window.innerWidth < 1024) {
        setItensVisiveis(2)
      } else {
        setItensVisiveis(3)
      }
    }

    window.addEventListener("resize", atualizarTamanho)
    atualizarTamanho()

    return () => window.removeEventListener("resize", atualizarTamanho)
  }, [])

  const podeRolarEsquerda = indiceAtual > 0
  const podeRolarDireita = indiceAtual < jogos.length - itensVisiveis

  const handleAnterior = () => {
    if (podeRolarEsquerda) {
      setIndiceAtual(indiceAtual - 1)
    }
  }

  const handleProximo = () => {
    if (podeRolarDireita) {
      setIndiceAtual(indiceAtual + 1)
    }
  }

  // Rola o carrossel quando o índice muda
  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = (containerRef.current.scrollWidth / jogos.length) * indiceAtual
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [indiceAtual, jogos.length])

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-3 sm:gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className={`flex-shrink-0 snap-start bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 ${
              itensVisiveis === 1
                ? "w-full"
                : itensVisiveis === 2
                  ? "w-[calc(50%-6px)] sm:w-[calc(50%-8px)]"
                  : "w-[calc(33.333%-8px)] sm:w-[calc(33.333%-11px)]"
            }`}
          >
            <div className="p-0 relative">
              <div className="relative h-40 sm:h-48 w-full">
                <img
                  src={jogo.imagem || "https://placehold.co/300x200"}
                  alt={jogo.titulo}
                  className="w-full h-full object-cover"
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
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1 truncate">{jogo.titulo}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mb-2">{jogo.fornecedor}</p>

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
                        className={i < jogo.avaliacao ? "text-amber-500" : "text-zinc-600"}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <button className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-md bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white">
                    Jogar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de paginação para mobile */}
      <div className="flex justify-center mt-2 sm:hidden">
        {Array.from({ length: Math.ceil(jogos.length / itensVisiveis) }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${
              i === Math.floor(indiceAtual / itensVisiveis) ? "bg-amber-500" : "bg-zinc-600"
            }`}
            onClick={() => setIndiceAtual(i * itensVisiveis)}
          />
        ))}
      </div>

      {/* Botões de navegação (visíveis apenas em telas maiores) */}
      <button
        className={`hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-2 bg-zinc-800/80 border border-zinc-700 text-white opacity-0 group-hover:opacity-100 transition-opacity ${
          !podeRolarEsquerda && "opacity-0 cursor-not-allowed"
        }`}
        onClick={handleAnterior}
        disabled={!podeRolarEsquerda}
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
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        className={`hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full p-2 bg-zinc-800/80 border border-zinc-700 text-white opacity-0 group-hover:opacity-100 transition-opacity ${
          !podeRolarDireita && "opacity-0 cursor-not-allowed"
        }`}
        onClick={handleProximo}
        disabled={!podeRolarDireita}
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
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  )
}

// ==================== COMPONENTE RODAPÉ ====================
// Vamos melhorar o Footer para ser mais compacto em mobile
function Footer() {
  return (
    <footer className="bg-zinc-800 border-t border-zinc-700 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Cassino Sorte Grande</h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              A melhor experiência de cassino online com uma grande variedade de jogos e bônus emocionantes.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Jogos</h3>
            <ul className="space-y-1 sm:space-y-2 text-zinc-400 text-sm sm:text-base">
              {categoriaJogos.slice(0, 4).map((categoria) => (
                <li key={categoria.id}>
                  <a href={`/jogos/${categoria.id}`} className="hover:text-amber-500">
                    {categoria.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Suporte</h3>
            <ul className="space-y-1 sm:space-y-2 text-zinc-400 text-sm sm:text-base">
              <li>
                <a href="/faq" className="hover:text-amber-500">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-amber-500">
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="/termos" className="hover:text-amber-500">
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="/privacidade" className="hover:text-amber-500">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Jogo Responsável</h3>
            <p className="text-zinc-400 text-sm sm:text-base mb-3 sm:mb-4">
              Promovemos o jogo responsável. Por favor, jogue com responsabilidade e estabeleça limites para si mesmo.
            </p>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500/10">
              Auto-Exclusão
            </button>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-zinc-700 text-center text-zinc-400">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} Cassino Sorte Grande. Todos os direitos reservados.
          </p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm">
            Este site é destinado a maiores de 18 anos. Jogue com responsabilidade.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Vamos adicionar um componente de promoções para mobile
// Adicione este componente após a seção de banner e antes da seção de pesquisa
function PromocoesSection() {
  return (
    <section className="container mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-bold">Promoções</h2>
        <a href="#" className="text-xs sm:text-sm text-amber-500 hover:underline">
          Ver todas
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <img
              src="https://placehold.co/600x200/orange/white"
              alt="Bônus de Boas-vindas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="text-white font-bold text-lg">Bônus de Boas-vindas</h3>
              <p className="text-white text-sm">100% até R$500</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <img
              src="https://placehold.co/600x200/purple/white"
              alt="Giros Grátis"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="text-white font-bold text-lg">Giros Grátis</h3>
              <p className="text-white text-sm">50 giros no Sweet Bonanza</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="relative h-24 sm:h-32">
            <img
              src="https://placehold.co/600x200/red/white"
              alt="Cashback Semanal"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="text-white font-bold text-lg">Cashback Semanal</h3>
              <p className="text-white text-sm">10% de volta até R$200</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Vamos adicionar um componente de download do app para mobile
// Adicione este componente antes do Footer
function DownloadAppSection() {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-8 mb-4 sm:mb-6">
      <div className="bg-gradient-to-r from-amber-600 to-red-600 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="mb-4 sm:mb-0 sm:mr-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Baixe Nosso App</h2>
            <p className="text-white text-sm sm:text-base mb-4">
              Jogue seus jogos favoritos a qualquer hora, em qualquer lugar!
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex items-center justify-center sm:justify-start bg-black text-white rounded-md px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path
                    fillRule="evenodd"
                    d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Baixar na</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center justify-center sm:justify-start bg-black text-white rounded-md px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Baixar no</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="w-32 sm:w-40">
            <img
              src="https://placehold.co/300x600/black/white"
              alt="App Mobile"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
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
]

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
]

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
]

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
]

export default App
