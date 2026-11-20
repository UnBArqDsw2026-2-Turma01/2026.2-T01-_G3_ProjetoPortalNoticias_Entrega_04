"use client";

import { useTema } from "@/hooks/useTema";
import { ControleAcessibilidade } from "@/components/ControleAcessibilidade/ControleAcessibilidade";

export function ToggleModoEscuro({ selecionar = false }: { selecionar?: boolean }) {
  const { tema, definirTema } = useTema();
  return <ControleAcessibilidade rotulo="Modo Escuro" descricao={selecionar ? "Aplica o tema escuro." : "Alterna entre os temas claro e escuro."}
    icone="lua" larguraIcone={33.75} alturaIcone={33.75}
    tipo={selecionar ? "button" : "switch"} ativo={tema === "escuro"}
    onClick={() => definirTema(selecionar || tema === "claro" ? "escuro" : "claro")} />;
}
