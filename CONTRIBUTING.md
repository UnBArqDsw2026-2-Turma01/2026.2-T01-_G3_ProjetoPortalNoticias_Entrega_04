# Guia de Contribuição: Entrega 04 (Reutilização)

Leia isto **antes** de começar a sua issue. Se travar em qualquer passo, avise no grupo no mesmo dia.

## 1. Pegue a sua tarefa

1. Abra a aba **Issues** e leia a issue **"Cronograma da Entrega 04"**: ela mostra a ordem das tarefas e quem depende de quem.
2. Escolha uma issue de vaga livre e clique em **Assignees → assign yourself**.
3. Leia a issue **inteira**: ela tem contexto, passo a passo, arquivos, referências e critério de pronto.

## 2. Prepare o repositório (uma vez só)

```shell
git clone https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04.git
cd 2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04
```

Ferramentas necessárias: **Git**, **Node.js 20 ou superior** (para o portal) e **Python 3** (para o site de documentação).

## 3. Trabalhe sempre numa branch

```shell
git checkout main
git pull                                   # pega o que os outros já subiram
git checkout -b feat/<numero-da-issue>-<nome-curto>
# exemplo: git checkout -b feat/5-postcard
```

## 4. Commits

- Commits pequenos e frequentes, com mensagem em português no formato `tipo: descrição`:
  - `feat: cria componente PostCard com variantes compacto e destaque`
  - `docs: preenche seção Contrato do PostCard no relatório`
  - `test: adiciona testes do hook useSalvos`
  - `fix: corrige cor do badge no modo escuro`
- Confira que o commit sai com o **seu** usuário do GitHub (`git config user.name` e `git config user.email`). É o comprobatório da sua participação.
- Se trabalhou em dupla, adicione ao final da mensagem: `Co-authored-by: Nome <email-do-github>`.

## 5. Abra um Pull Request

```shell
git push -u origin feat/<numero-da-issue>-<nome-curto>
```

1. No GitHub, clique em **Compare & pull request**.
2. No texto do PR escreva `Closes #<numero-da-issue>` e um resumo do que fez (prints ajudam).
3. Peça revisão de **uma pessoa** do grupo (Reviewers). Revise o PR de alguém também.
4. Só faça merge quando o check do GitHub Actions estiver **verde**.

## 6. Rodar o portal (Next.js)

```shell
cd portal
npm install
npm run dev          # abre em http://localhost:3000
npm run storybook    # catálogo de componentes em http://localhost:6006
npm test             # testes
```

## 7. Rodar o site de documentação (GitPages)

```shell
python -m venv venv
venv\Scripts\activate          # Windows  (Linux/macOS: source venv/bin/activate)
pip install -r requirements.txt
mkdocs serve                   # abre em http://127.0.0.1:8000
```

Antes de subir mudanças na documentação, rode `mkdocs build --strict`. Se der erro, o site não é publicado.

## 8. Regras para escrever na documentação

- Escreva **somente** na sua seção. Os comentários `<!-- O QUE ESCREVER AQUI ... -->` explicam o que vai em cada lugar; apague-os depois de preencher.
- **Links para código: sempre absolutos** (`https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/blob/main/portal/...`). Links relativos para fora de `docs/` quebram o build.
- Imagens e diagramas vão em `docs/assets/` (diagramas em `docs/assets/diagramas/`, com o arquivo `.drawio` junto do `.png`).
- Ao terminar, adicione **uma linha em Versionamentos** com o link do seu PR/commit.

## 9. Uso de IA Generativa

Pode e deve usar, mas **registre**: qual ferramenta, para quê, o que aceitou e o que corrigiu. A professora avalia o **senso crítico**, não o uso em si. Guarde prints ou links das conversas para citar no relatório.
