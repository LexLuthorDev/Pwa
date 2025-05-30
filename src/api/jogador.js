import http from "./http";

export const getJogadorMe = () => http.get("/jogador/me");
export const createJogador = (data) => http.post("/jogador", data);
export const loginJogador = (data) => http.post("/jogador/login", data);
export const temaCassino = () => http.get("/cassino/tema");
