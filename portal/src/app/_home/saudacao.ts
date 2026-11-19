// "Bom dia, Johnn!" do Figma, ajustado ao horário de quem está vendo a página.
export function saudacaoPorHorario(hora: number): string {
  if (hora >= 5 && hora < 12) return "Bom dia";
  if (hora >= 12 && hora < 18) return "Boa tarde";
  return "Boa noite";
}
