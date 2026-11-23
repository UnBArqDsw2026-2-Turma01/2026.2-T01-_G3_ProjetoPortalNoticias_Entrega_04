# Burburinho

O **Burburinho** é um portal de notícias criado pelo Grupo 3 para a disciplina
Arquitetura e Desenho de Software. A plataforma reúne notícias de atualidade,
conteúdo produzido pela comunidade e assuntos locais em uma experiência simples,
responsiva e acessível.

O projeto aplica conceitos de reutilização em componentes React e demonstra padrões
de projeto GoF no portal e em seu desenvolvimento. A documentação desta entrega
inclui os elementos do DAS, os padrões reutilizados e as iniciativas extras do grupo.

## Como funciona

Na página inicial, o usuário encontra uma notícia em destaque, as últimas
publicações e assuntos em alta. O portal oferece navegação por categorias, páginas
de leitura de notícias e uma área para explorar comunidades de interesse.

As principais experiências disponíveis atualmente são:

- visualizar a página inicial, com notícia de destaque e últimas notícias;
- explorar categorias como esporte, cultura, política e tecnologia;
- abrir uma notícia e consultar seu conteúdo;
- consultar os assuntos em alta e eventos exibidos na plataforma;
- explorar os conteúdos disponíveis por categoria;
- usar o menu lateral e seguir categorias;
- simular entrada e saída de uma sessão no navegador;
- alternar entre os temas claro e escuro;
- acessar o painel de acessibilidade;
- enviar uma sugestão de publicação pelo formulário UGC.

O conteúdo exibido é formado por dados de exemplo. O protótipo utiliza um
repositório em memória como única fonte de notícias, seguindo o padrão Singleton.
Não existe uma API ou banco de dados integrado nesta entrega.

Por isso, o **login é apenas uma sessão simulada**, salva no navegador, e uma
notícia sugerida fica pendente de moderação somente enquanto a instância da página
permanece ativa. Ao recarregar, a sugestão é perdida. O envio não publica conteúdo
imediatamente e o upload do formulário ainda não transmite arquivos.

O portal é um export estático feito com Next.js. Recursos exclusivos de servidor,
como APIs, Server Actions, cookies e autenticação real, não são usados nesta versão.

## Versão publicada

A documentação em MkDocs está disponível em:

<https://unbarqdsw2026-2-turma01.github.io/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/>

O protótipo do portal publicado em versão estática está em:

<https://unbarqdsw2026-2-turma01.github.io/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/portal/>

## Executando o portal localmente

O portal requer **Node.js 20 ou superior**.

Na raiz deste repositório, execute:

```shell
cd portal
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

Comandos úteis:

```shell
npm test       # executa os testes
npm run lint   # verifica padrões de código
npm run build  # gera o export estático em portal/out
```

## Executando esta documentação localmente

É recomendado criar e ativar um ambiente virtual Python antes da instalação.

```shell
python -m venv venv
source venv/bin/activate  # Linux/macOS
# No Windows: venv\Scripts\activate

pip install -r requirements.txt
mkdocs serve
```

A documentação ficará disponível em `http://127.0.0.1:8000`.
