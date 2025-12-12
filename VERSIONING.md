# Guia de versionamento e fluxo de mudanças

## Padrão de versão
- **SemVer (MAJOR.MINOR.PATCH)**
  - **MAJOR**: mudanças incompatíveis (ex.: alteração de contrato de API ou migração de banco). 
  - **MINOR**: novas funcionalidades compatíveis.
  - **PATCH**: correções de bugs e ajustes de documentação.
- Releases são tagueadas como `vX.Y.Z` e devem atualizar o `CHANGELOG.md`.

## Branches
- `main`: sempre estável; somente recebe merges via PR aprovado.
- `develop` (opcional): para quem preferir fluxo GitFlow; releases saem de `main`.
- Feature branches seguem `tipo/descrição-curta`, alinhado a Conventional Commits: `feat/track-scheduling`, `fix/auth-cookie`, `chore/ci-lint`.

## Commits (Conventional Commits)
Exemplos: `feat: adicionar cronograma semanal no Streamlit`, `fix: corrigir retorno de quizzes no router`, `chore: configurar lint no front-end`.

## Processo de release
1. Atualizar o `CHANGELOG.md` com entradas novas (breakings, features, fixes).
2. Bump de versão em `package.json` (quando front-end estiver configurado) e demais manifestos relevantes.
3. Criar tag `vX.Y.Z` apontando para `main` e publicar release no GitHub com notas.
4. Se houver migrations ou seeds, incluí-los no pacote da release.

## Qualidade e CI
- Cada PR deve passar por lint, testes e build (front-end e Python) antes do merge.
- Não faça merge direto na `main`; use revisão de código.

## Hotfixes
- Para correções urgentes, criar branch `hotfix/descricao` a partir de `main`, aplicar patches, atualizar versão `PATCH` e changelog, taguear e liberar.
