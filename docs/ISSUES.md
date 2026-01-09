# Backlog priorizado

Cinco issues críticas e detalhadas para estabilizar o projeto.

## 1) Reerguer o build web TypeScript
- **Contexto**: existem diversos componentes `.tsx` (ex.: `Home.tsx`, `TrackDetail.tsx`, `StageDetail.tsx`, `src/pages/TaskExecution.tsx`), mas não há `package.json`, bundler ou pipeline para servir o front-end.
- **Entrega**:
  - Criar `package.json` com scripts `dev`, `build` e `test` usando Vite ou Next.js (decidir e registrar). 
  - Adicionar TypeScript, React, TRPC e ferramenta de testes (Vitest/Jest) como dependências.
  - Configurar path aliases para os módulos em `src/` e na raiz, garantindo compatibilidade com os importes existentes.
  - Documentar no README/`docs` como rodar e como publicar o bundle resultante.
- **Aceite**: `npm run build` gera artefatos estáticos, `npm run test` roda com sucesso e a página inicial renderiza pelo menos um dos componentes existentes (ex.: `Home` ou `Dashboard`).

## 2) Corrigir a camada de dados Drizzle + TRPC
- **Contexto**: `db.ts` e `routers.ts` fazem chamadas a `getDb`, `eq`, `and` e schemas de `../drizzle/schema`, mas nenhum desses módulos existe no repositório. Isso quebra qualquer endpoint e impede integração com o front-end.
- **Entrega**:
  - Definir configuração de banco (ex.: Postgres ou SQLite) e adicionar um client reutilizável (`getDb`).
  - Criar pasta `drizzle/` com schema tipado para `content`, `tracks`, `modules`, `moduleContent`, `tasks`, `stages`, `quizzes`, `userProgress` e `userGamification` para alinhar com as queries existentes.
  - Importar utilitários (`eq`, `and`) e ajustar queries para lidar com erros/retornos vazios.
  - Garantir que a camada TRPC em `routers.ts` utilize esses métodos com tipagem correta.
- **Aceite**: endpoints TRPC retornam dados reais a partir de um banco local inicializado com seed mínimo e contam com testes de integração cobrindo ao menos os routers de `tracks`, `stages` e `tasks`.

## 3) Integrar o app Streamlit a dados dinâmicos
- **Contexto**: `app.py` exibe trilhas a partir de constantes em memória (`TRACKS`). Não há conexão com a base real nem reutilização da camada TypeScript.
- **Entrega**:
  - Expor uma API (pode ser TRPC HTTP ou REST leve) que sirva trilhas, estágios e tarefas a partir do banco configurado no issue #2.
  - Consumir essa API no `app.py` usando requests, removendo a dependência de `TRACKS` estáticos.
  - Adicionar cache leve no Streamlit para evitar recarregamento completo a cada chamada.
  - Atualizar UX para refletir status real de progresso se o usuário estiver autenticado (ver issue #4).
- **Aceite**: ao rodar `streamlit run app.py`, as trilhas são carregadas do backend configurado, e mudanças no banco refletem na interface sem necessidade de redeploy.

## 4) Consolidar autenticação e autorização
- **Contexto**: há testes (`auth.logout.test.ts`) e hooks (`useAuth.ts`) indicando fluxo de sessão, mas não existe implementação completa de login/logout nem proteção no app Streamlit.
- **Entrega**:
  - Implementar provider de autenticação no front-end TypeScript reutilizando `trpc.ts`/`routers.ts` e o cookie `COOKIE_NAME` configurado.
  - Garantir rotas protegidas no front-end (componentes de tarefas/progresso) e no backend (routers `tasks`, `progress`, `gamification`).
  - Opcional: adicionar autenticação básica no Streamlit (ex.: secrets ou SSO do provider escolhido) para manter experiência alinhada.
  - Escrever testes e2e ou de integração validando fluxos de login, logout e acesso negado.
- **Aceite**: usuário não autenticado é redirecionado para login ao tentar acessar dados protegidos; usuário autenticado mantém sessão persistente e consegue consumir `progress`/`gamification` sem erros.

## 5) Pipeline de qualidade e rastreabilidade
- **Contexto**: o projeto não possui linters, CI ou changelog. Também é necessário consolidar governança de versionamento.
- **Entrega**:
  - Configurar ESLint/Prettier para o front-end TypeScript e `ruff` ou `flake8` para o Python/Streamlit.
  - Adicionar workflow de CI (GitHub Actions) executando lint, testes e build a cada PR.
  - Criar/atualizar `CHANGELOG.md` alimentado em cada release (seguir `VERSIONING.md`).
  - Publicar badges no README com status do CI e versão mais recente.
- **Aceite**: CI executa automaticamente em novas PRs; merges no branch principal exigem testes e lint verdes; changelog atualizado na criação de tags.
