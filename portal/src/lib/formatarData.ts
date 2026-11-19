// Datas como no Figma: "10min", "2h", "5d" e, depois de uma semana, "14 de nov".

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const partesDaData = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "numeric",
  month: "numeric",
});

export function formatarDataCurta(iso: string): string {
  const partes = partesDaData.formatToParts(new Date(iso));
  const dia = Number(partes.find((p) => p.type === "day")?.value);
  const mes = Number(partes.find((p) => p.type === "month")?.value);
  return `${dia} de ${MESES[mes - 1]}`;
}

export function formatarTempoRelativo(iso: string, agora: Date = new Date()): string {
  const minutos = Math.floor((agora.getTime() - Date.parse(iso)) / 60_000);
  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos}min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas}h`;
  const dias = Math.floor(horas / 24);
  if (dias < 7) return `${dias}d`;
  return formatarDataCurta(iso);
}
