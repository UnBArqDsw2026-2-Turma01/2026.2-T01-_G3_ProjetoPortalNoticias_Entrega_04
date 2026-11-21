// Datas como no Figma: "10min", "2h", "5d" e, depois de uma semana, "14 de nov".

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const partesDaData = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "numeric",
  month: "numeric",
});

const formatoHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
});

const formatoDia = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatarDataCurta(iso: string): string {
  const partes = partesDaData.formatToParts(new Date(iso));
  const dia = Number(partes.find((p) => p.type === "day")?.value);
  const mes = Number(partes.find((p) => p.type === "month")?.value);
  return `${dia} de ${MESES[mes - 1]}`;
}

/** Data da página de notícia, como no Figma: "Hoje, 09:42" ou "18 de nov, 16:20". */
export function formatarDataHora(iso: string, agora: Date = new Date()): string {
  const data = new Date(iso);
  const hora = formatoHora.format(data);
  const mesmoDia = formatoDia.format(data) === formatoDia.format(agora);
  return mesmoDia ? `Hoje, ${hora}` : `${formatarDataCurta(iso)}, ${hora}`;
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
