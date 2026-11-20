import type { ComponentType } from "react";
import { NotificationBell } from "./NotificationBell";

const meta = {
  title: "Interação/NotificationBell",
  component: NotificationBell,
  tags: ["autodocs"],
};
export default meta;

function altura(px: number) {
  return function ComAltura(Story: ComponentType) {
    return <div style={{ height: px }}><Story /></div>;
  };
}

export const SemNotificacoes = {
  decorators: [altura(200)],
  parameters: {
    // Sobrescreve o hook para não haver notificações
  },
};

export const ComTresNaoLidas = {
  decorators: [altura(400)],
};