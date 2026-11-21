import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, expect, it, vi } from "vitest";
import type { ImgHTMLAttributes } from "react";
const ambiente = vi.hoisted(() => {
  const anterior = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = "/repositorio/portal";
  return { anterior };
});
vi.mock("next/image", () => ({ default: (props: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
  const { priority, ...imagem } = props;
  void priority;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...imagem} />;
} }));
import { BarraBusca } from "./BarraBusca";
afterEach(() => { cleanup(); vi.useRealTimers(); });
afterAll(() => {
  if (ambiente.anterior === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = ambiente.anterior;
});

it("resultados da busca usam imagens dentro da subpasta publicada no Pages", () => {
  vi.useFakeTimers();
  const { container } = render(<BarraBusca />);
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "flauta" } });
  act(() => vi.advanceTimersByTime(300));
  const imagens = container.querySelectorAll("img");
  expect(imagens.length).toBeGreaterThan(0);
  imagens.forEach((imagem) => expect(imagem.getAttribute("src")).toMatch(/^\/repositorio\/portal\/noticias\//));
});
