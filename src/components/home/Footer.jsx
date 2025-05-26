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

export default function Footer() {
    return (
    <footer className="bg-zinc-800 border-t border-zinc-700 py-6 sm:py-8">
      <div className="container mx-auto px-3">
        {/* Versão desktop */}
        <div className="sm:grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-1 text-left sm:text-left mb-6 sm:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="/assets/logo.svg"
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