import { renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import { useTema } from "./useTema";

it("useTema fora do Provider lança erro claro", () => {
  expect(() => renderHook(() => useTema())).toThrow("useTema deve ser usado dentro de um ThemeProvider.");
});
