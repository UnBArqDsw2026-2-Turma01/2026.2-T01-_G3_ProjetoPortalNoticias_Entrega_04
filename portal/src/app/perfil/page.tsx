"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { usePerfil } from "@/hooks/usePerfil";
import styles from "./page.module.css";

const TAMANHO_MAXIMO_FOTO = 10 * 1024 * 1024; // 10 MB, igual ao limite do formulário de sugestão
const LADO_MAXIMO_FOTO = 512;
const NOME_MAXIMO = 60;
const TIPOS_DE_IMAGEM = ["image/jpeg", "image/png", "image/webp"];

// A foto é reduzida antes de ir para o localStorage: uma foto de celular pode ter vários MB,
// estourar a cota do navegador e derrubar também o nome. 512px já cobre o avatar de 230px.
function redimensionarImagem(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    leitor.onload = () => {
      const imagem = new window.Image();
      imagem.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      imagem.onload = () => {
        const larguraOriginal = imagem.naturalWidth || imagem.width || LADO_MAXIMO_FOTO;
        const alturaOriginal = imagem.naturalHeight || imagem.height || LADO_MAXIMO_FOTO;
        const maiorLado = Math.max(larguraOriginal, alturaOriginal);
        const escala = maiorLado > LADO_MAXIMO_FOTO ? LADO_MAXIMO_FOTO / maiorLado : 1;
        const largura = Math.max(1, Math.round(larguraOriginal * escala));
        const altura = Math.max(1, Math.round(alturaOriginal * escala));
        const canvas = document.createElement("canvas");
        canvas.width = largura;
        canvas.height = altura;

        const contexto = canvas.getContext("2d");
        if (!contexto) {
          resolve(String(leitor.result));
          return;
        }

        contexto.drawImage(imagem, 0, 0, largura, altura);
        try {
          resolve(canvas.toDataURL("image/webp", 0.85));
        } catch {
          // SVG com referências externas, por exemplo: guarda o original.
          resolve(String(leitor.result));
        }
      };
      imagem.src = String(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  });
}

function AvatarGenerico({ className, rotulo }: { className?: string; rotulo?: string }) {
  return (
    <svg
      className={className}
      width="230"
      height="230"
      viewBox="0 0 85 85"
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    >
      <circle cx="42.5" cy="42.5" r="42.5" fill="var(--cor-perfil-secundaria)" />
      <circle cx="42.5" cy="32" r="13" fill="var(--cor-fundo)" />
      <path d="M20 68c0-22 45-22 45 0Z" fill="var(--cor-fundo)" />
    </svg>
  );
}

export default function Perfil() {
  const { nome, foto, salvar } = usePerfil();

  const [editando, setEditando] = useState(false);
  const [nomeRascunho, setNomeRascunho] = useState(nome);
  const [fotoRascunho, setFotoRascunho] = useState<string | null>(foto);
  const [erroNome, setErroNome] = useState("");
  const [erroFoto, setErroFoto] = useState("");
  const [processandoFoto, setProcessandoFoto] = useState(false);

  const botaoEditarRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const devolverFoco = useRef(false);

  const abrirEdicao = useCallback(() => {
    setNomeRascunho(nome);
    setFotoRascunho(foto);
    setErroNome("");
    setErroFoto("");
    setEditando(true);
  }, [nome, foto]);

  const fecharEdicao = useCallback(() => {
    devolverFoco.current = true;
    setEditando(false);
    setErroNome("");
    setErroFoto("");
  }, []);

  useEffect(() => {
    if (editando) {
      modalRef.current?.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
    } else if (devolverFoco.current) {
      botaoEditarRef.current?.focus();
      devolverFoco.current = false;
    }
  }, [editando]);

  // Fecha com Escape e evita que a página atrás continue rolando.
  useEffect(() => {
    if (!editando) return;

    const aoTeclar = (evento: globalThis.KeyboardEvent) => {
      if (evento.key === "Escape") fecharEdicao();
    };
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [editando, fecharEdicao]);

  async function selecionarFoto(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = ""; // permite escolher o mesmo arquivo novamente
    if (!arquivo) return;

    setErroFoto("");
    if (!TIPOS_DE_IMAGEM.includes(arquivo.type)) {
      setErroFoto("Escolha uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (arquivo.size > TAMANHO_MAXIMO_FOTO) {
      setErroFoto("A imagem deve ter até 10 MB.");
      return;
    }

    setProcessandoFoto(true);
    try {
      setFotoRascunho(await redimensionarImagem(arquivo));
    } catch {
      setErroFoto("Não foi possível carregar essa imagem. Tente outra.");
    } finally {
      setProcessandoFoto(false);
    }
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const nomeLimpo = nomeRascunho.trim();

    if (!nomeLimpo) {
      setErroNome("Informe um nome de usuário.");
      return;
    }
    if (nomeLimpo.length > NOME_MAXIMO) {
      setErroNome(`O nome pode ter no máximo ${NOME_MAXIMO} caracteres.`);
      return;
    }

    salvar({ nome: nomeLimpo, foto: fotoRascunho });
    fecharEdicao();
  }

  function prenderFoco(evento: ReactKeyboardEvent<HTMLDivElement>) {
    if (evento.key !== "Tab") return;

    const focaveis = evento.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focaveis.length === 0) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  return (
    <div className={styles.pagina}>
      <header className={styles.capa}>
        <Link href="/" className={styles.voltar}>
          ‹ Voltar
        </Link>
      </header>

      <section className={styles.perfil} aria-labelledby="nome-perfil">
        <div className={styles.linha}>
          {foto ? (
            <Image
              className={styles.avatar}
              src={foto}
              alt={`Foto de perfil de ${nome}`}
              width={230}
              height={230}
            />
          ) : (
            <AvatarGenerico className={styles.avatar} rotulo="Avatar genérico" />
          )}

          <button
            ref={botaoEditarRef}
            type="button"
            className={styles.editar}
            onClick={abrirEdicao}
          >
            Editar Perfil <span aria-hidden="true">✎</span>
          </button>
        </div>

        <h1 id="nome-perfil">{nome}</h1>

        <div className={styles.vazio}>
          <AvatarGenerico />
          <p>Você ainda não possui nenhuma contribuição</p>
        </div>
      </section>

      {editando && (
        <div
          className={styles.sobreposicao}
          onPointerDown={(evento) => {
            if (evento.target === evento.currentTarget) fecharEdicao();
          }}
        >
          <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-editar-perfil"
            onKeyDown={prenderFoco}
          >
            <h2 id="titulo-editar-perfil" className={styles.tituloModal}>
              Editar Perfil
            </h2>

            <form className={styles.formulario} onSubmit={enviar} noValidate>
              <div className={styles.fotoEditor}>
                <div className={styles.previaAvatar}>
                  {fotoRascunho ? (
                    <Image
                      src={fotoRascunho}
                      alt="Prévia da foto de perfil"
                      width={96}
                      height={96}
                    />
                  ) : (
                    <AvatarGenerico />
                  )}
                </div>

                <div className={styles.acoesFoto}>
                  <label className={styles.escolherFoto}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={selecionarFoto}
                      disabled={processandoFoto}
                    />
                    {processandoFoto ? "Carregando foto..." : "Escolher foto"}
                  </label>

                  {fotoRascunho && (
                    <button
                      type="button"
                      className={styles.removerFoto}
                      onClick={() => setFotoRascunho(null)}
                    >
                      Remover foto
                    </button>
                  )}

                  <span className={styles.dicaFoto}>JPG, PNG ou WebP · Até 10 MB</span>
                </div>
              </div>

              {erroFoto && (
                <p className={styles.erro} role="alert">
                  {erroFoto}
                </p>
              )}

              <div className={styles.campo}>
                <label className={styles.rotuloCampo} htmlFor="nome-perfil-campo">
                  Nome de usuário <span aria-hidden="true">*</span>
                </label>
                <input
                  id="nome-perfil-campo"
                  name="nome"
                  type="text"
                  className={`${styles.entrada} ${erroNome ? styles.entradaComErro : ""}`}
                  value={nomeRascunho}
                  onChange={(evento) => {
                    setNomeRascunho(evento.target.value);
                    setErroNome("");
                  }}
                  placeholder="Como você quer ser chamado"
                  autoComplete="nickname"
                  maxLength={NOME_MAXIMO}
                  required
                  aria-invalid={erroNome ? true : undefined}
                  aria-describedby={erroNome ? "erro-nome-perfil" : undefined}
                />
                {erroNome && (
                  <p id="erro-nome-perfil" className={styles.erro} role="alert">
                    {erroNome}
                  </p>
                )}
              </div>

              <div className={styles.botoesModal}>
                <button type="button" className={styles.cancelar} onClick={fecharEdicao}>
                  Cancelar
                </button>
                <button type="submit" className={styles.salvar} disabled={processandoFoto}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
