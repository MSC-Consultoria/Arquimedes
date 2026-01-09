# Arquimedes

Aplicação educacional que reúne trilhas de aprendizagem curadas, com foco em progresso semanal, gamificação e automação de estudos. O repositório contém um app Streamlit pronto para publicação e protótipos de front-end/Back-end em TypeScript que ainda precisam de empacotamento.

## Sumário
- [Visão geral](#visão-geral)
- [Arquitetura e estrutura de pastas](#arquitetura-e-estrutura-de-pastas)
- [Como executar localmente](#como-executar-localmente)
- [Versionamento e commits](#versionamento-e-commits)
- [Backlog prioritário](#backlog-prioritário)
- [Documentação complementar](#documentação-complementar)

## Visão geral
- **Streamlit**: `app.py` expõe as trilhas em uma interface rápida para validação de conceito e pode ser publicada diretamente no Streamlit Community Cloud.
- **Protótipos TypeScript**: os arquivos `.tsx` e utilitários em `src/` esboçam uma experiência web mais rica (TRPC, autenticação, trilhas, gamificação), mas ainda carecem de bundler e dependências.
- **Dados de trilha**: atualmente os dados do Streamlit são estáticos. Há funções em `db.ts`/`routers.ts` apontando para um schema Drizzle que ainda não está disponível no repositório.

## Arquitetura e estrutura de pastas
- `app.py`: aplicativo Streamlit para explorar trilhas e gerar cronogramas semanais.
- `src/`: base para um front-end web com TRPC (`src/lib/trpc.ts`) e página de execução de tarefas (`src/pages/TaskExecution.tsx`).
- `*.tsx` na raiz: componentes React (Feed, TrackDetail, Dashboard, etc.) ainda não integrados a um build.
- `db.ts`, `routers.ts`, `trpc.ts`: camada de API e banco de dados planejada para Drizzle + TRPC, hoje sem conexão configurada.
- `requirements.txt`: dependências Python necessárias para o Streamlit.
- `docs/`: centralização de governança e backlog (`VERSIONING.md` e `ISSUES.md`).

## Como executar localmente
1. **Configurar ambiente Python**
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Rodar a interface Streamlit**
   ```bash
   streamlit run app.py
   ```
3. **Deploy no Streamlit Community Cloud**
   - Aponte o repositório no painel do Streamlit Cloud.
   - Defina `app.py` como **Main file path** e confirme `requirements.txt` na instalação automática.

> Os protótipos em TypeScript ainda não possuem `package.json` nem bundler configurado; consulte o backlog para priorizar essa entrega.

## Versionamento e commits
Este projeto segue SemVer e Conventional Commits para padronizar releases e histórico. Veja os detalhes em [`VERSIONING.md`](VERSIONING.md) para naming de branches, processos de release e atualização de changelog.

## Backlog prioritário
Há cinco issues críticas detalhadas em [`docs/ISSUES.md`](docs/ISSUES.md), cobrindo a reestruturação do build TypeScript, camada de dados com Drizzle, integração do Streamlit com dados reais, governança de autenticação e pipeline de qualidade.

## Documentação complementar
A raiz contém estudos e planos (ex.: design system, planos de trilhas, integrações de API, gamificação). Consulte os títulos para insumos de produto e conteúdo, mantendo novos documentos dentro da pasta `docs/` quando possível para facilitar navegação.
