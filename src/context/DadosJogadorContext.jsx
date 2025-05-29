import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { getJogadorMe } from "../api/jogador";
import http from "../api/http";

const DadosJogadorContext = createContext();

export const DadosJogadorProvider = ({ children }) => {
  const [dadosJogador, setDadosJogador] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 novo estado

  const getDadosJogadorData = async () => {
    setLoading(true);
    
    try {
      const res = await getJogadorMe();
      
      setDadosJogador(res.data);
    } catch (err) {
      console.error("Erro ao buscar dados do jogador:", err);
    } finally {
      setLoading(false);
    }
  };

  // Busca automática ao montar
  useEffect(() => {
    getDadosJogadorData();
  }, []);

  return (
    <DadosJogadorContext.Provider value={{ dadosJogador, getDadosJogadorData, loading }}>
      {children}
    </DadosJogadorContext.Provider>
  );
};


export const useDadosJogador = () => {
  const context = useContext(DadosJogadorContext);
  if (!context) {
    throw new Error("useDadosJogador deve ser usado dentro de um DadosJogadorProvider");
  }
  return context;
};
