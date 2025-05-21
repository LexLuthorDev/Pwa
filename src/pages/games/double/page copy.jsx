"use client";

import { useState, useRef, useEffect } from "react";

import DoubleGame from "../../../components/DoubleGame";
export default function PageHome() {
    return (
    <div className="min-h-screen h-screen min-w-full flex flex-col bg-red-900 text-white">
      {/* Cabeçalho */}
      <DoubleGame autorizacao_cassino="teste" id_jogador="1" />
    </div>
  );
}