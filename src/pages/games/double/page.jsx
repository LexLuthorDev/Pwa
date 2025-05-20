"use client";

import { useState, useRef, useEffect } from "react";

import DoubleGame from "../../../components/DoubleGame";
export default function PageHome() {
    return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Cabeçalho */}
      <DoubleGame autorizacao_cassino="teste" id_jogador="1" />
    </div>
  );
}