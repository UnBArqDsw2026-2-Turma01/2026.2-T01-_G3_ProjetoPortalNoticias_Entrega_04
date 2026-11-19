// Liga uma story ao nó do protótipo no Figma (parâmetro `design` do Storybook).
const PROTOTIPO = "https://www.figma.com/design/LnkN55jPy6jk8dsjpmYJSF/Prot%C3%B3tipo";

export function noFigma(nodeId: string) {
  return { design: { type: "figma", url: `${PROTOTIPO}?node-id=${nodeId.replace(":", "-")}` } };
}
