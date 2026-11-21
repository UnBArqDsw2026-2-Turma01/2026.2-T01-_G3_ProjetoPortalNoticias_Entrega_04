// Ícones de linha das ações (Voltar, Compartilhar, Salvar e Enviar).
// Usam currentColor para acompanhar a cor do BotaoAcao no tema claro e no escuro.

interface IconeProps {
  /** Salvar preenchido quando a notícia já está salva. */
  preenchido?: boolean;
}

const COMUM = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconeVoltar() {
  return (
    <svg {...COMUM}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function IconeCompartilhar() {
  return (
    <svg {...COMUM}>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="M8.1 10.9l7.8-4.5M8.1 13.1l7.8 4.5" />
    </svg>
  );
}

export function IconeSalvar({ preenchido }: IconeProps) {
  return (
    <svg {...COMUM} fill={preenchido ? "currentColor" : "none"}>
      <path d="M6 4.5h12a1 1 0 0 1 1 1V21l-7-4.3L5 21V5.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function IconeEnviar() {
  return (
    <svg {...COMUM}>
      <path d="M21 3L10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3z" />
    </svg>
  );
}
