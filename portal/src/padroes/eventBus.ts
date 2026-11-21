// Observer local: uma falha de um assinante não interrompe os demais.
// publicar mantém o contrato void; assinantes assíncronos não bloqueiam o produtor.
type Callback<Dados = unknown> = (dados: Dados) => void | Promise<void>;
const handlers = new Map<string, Set<Callback>>();

export function assinar<Dados = unknown>(evento: string, callback: Callback<Dados>): () => void {
  let inscritos = handlers.get(evento);
  if (!inscritos) {
    inscritos = new Set();
    handlers.set(evento, inscritos);
  }
  inscritos.add(callback as Callback);
  return () => cancelar(evento, callback as Callback);
}

export function publicar<Dados = unknown>(evento: string, dados: Dados): void {
  const inscritos = handlers.get(evento);
  if (!inscritos) return;
  const relatarFalha = (erro: unknown) => console.error(`[EventBus] Falha no evento "${evento}"`, erro);
  // A cópia mantém estável a entrega atual se um assinante cancelar outro.
  for (const callback of [...inscritos]) {
    try {
      void Promise.resolve(callback(dados)).catch(relatarFalha);
    } catch (erro) {
      relatarFalha(erro);
    }
  }
}

export function cancelar(evento: string, callback: Callback): void {
  const inscritos = handlers.get(evento);
  if (!inscritos) return;
  inscritos.delete(callback);
  if (inscritos.size === 0) handlers.delete(evento);
}
