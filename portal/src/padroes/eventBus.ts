// EventBus enxuto (Observador da Entrega 03, versão front-end apenas).
// Permite que partes desconhecidas do portal se comuniquem sem depender umas das outras.
// Eventos previstos: 'noticia-publicada', 'sugestao-enviada'.
type Callback<Dados = unknown> = (dados: Dados) => void;

const handlers: Record<string, Set<Callback>> = {};

export function assinar<Dados = unknown>(
  evento: string,
  callback: Callback<Dados>,
): () => void {
  if (!handlers[evento]) handlers[evento] = new Set();
  handlers[evento].add(callback as Callback);

  return () => {
    const set = handlers[evento];
    if (!set) return;
    set.delete(callback as Callback);
    if (set.size === 0) delete handlers[evento];
  };
}

export function publicar<Dados = unknown>(evento: string, dados: Dados): void {
  const set = handlers[evento];
  if (!set) return;
  // Cópia para que um cancelar() durante a iteração não estrague o loop.
  for (const callback of [...set]) callback(dados);
}

export function cancelar(evento: string, callback: Callback): void {
  const set = handlers[evento];
  if (!set) return;
  set.delete(callback as Callback);
  if (set.size === 0) delete handlers[evento];
}