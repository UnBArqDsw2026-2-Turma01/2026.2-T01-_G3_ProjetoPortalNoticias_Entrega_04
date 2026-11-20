"use client";

import { useContext } from "react";
import { TemaContext } from "@/contexts/ThemeProvider";

export function useTema() {
  const contexto = useContext(TemaContext);
  if (contexto === undefined) {
    throw new Error("useTema deve ser usado dentro de um ThemeProvider.");
  }
  return contexto;
}
