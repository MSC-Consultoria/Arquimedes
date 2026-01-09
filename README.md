# Arquimedes

Este repositório agora inclui um aplicativo Streamlit (`app.py`) para explorar
as trilhas educacionais do Arquimedes. O fluxo recomendado é publicar direto a
partir do GitHub, sem necessidade de rodar localmente.

## Deploy no Streamlit Cloud
1. Mantenha este repositório (ou um fork) no GitHub.
2. No painel do [Streamlit Community Cloud](https://streamlit.io/cloud), crie
   um novo app apontando para este repositório e defina `app.py` como
   **Main file path**.
3. Confirme que `requirements.txt` está listado; o serviço instalará
   automaticamente o Streamlit.
4. Publique e compartilhe o link gerado.

## Objetivos e público-alvo
- **Objetivo**: oferecer trilhas de estudo curadas, com estimativa de esforço e
  cronograma automático para quem deseja evoluir em domínios técnicos (IA,
  automação, inglês técnico) sem precisar montar um plano do zero.
- **Para quem**: squads de educação corporativa que querem testar rapidamente um
  catálogo interno, instrutores que precisam compartilhar roteiros guiados e
  estudantes que preferem um caminho de aprendizado progressivo com tarefas
  concretas.

## Mapa de telas e fluxos
1. **Catálogo de trilhas**: visão inicial com filtros por domínio e dificuldade.
   Mostra horas estimadas, estágios e total de tarefas por trilha.
2. **Detalhe da trilha**: cada trilha expande estágios com descrições e tarefas
   (tipo, tempo e objetivo) para orientar o estudo.
3. **Agenda semanal**: a partir das horas disponíveis por semana, o app calcula
   quantas tarefas cabem em cada período e exibe a distribuição sugerida.

## Diagrama de navegação e dados
![Fluxo resumido do app](docs/fluxo-arquimedes.svg)

```mermaid
graph LR
  subgraph Catálogo
    A[Lista de trilhas] -->|Filtros: domínio, dificuldade| B[Renderização de cards]
    B --> C{Seleção de trilha}
  end

  subgraph Detalhe
    C --> D[Expansores por estágio]
    D --> E[Lista de tasks com tipo e minutos]
  end

  subgraph Agenda semanal
    E --> F[Entrada: horas/semana]
    F --> G[plan_schedule()
            calcula tarefas/semana]
    G --> H[Exibe distribuição]
  end

  TRACKS[(Dados embutidos
  em app.py)] --> A
```

## Personalização rápida
- **Cores e branding**: ajuste `st.set_page_config` em `app.py` para mudar título,
  emoji e layout. Para cores de tema, crie `.streamlit/config.toml` com as
  chaves `primaryColor`, `backgroundColor`, `secondaryBackgroundColor` e
  `textColor` conforme a paleta desejada.
- **Textos e rótulos**: edite os títulos e legendas em `app.py` (por exemplo,
  `st.title`, `st.subheader` e textos de `st.sidebar`). Use `st.caption` e
  `st.markdown` para inserir instruções adicionais ou avisos institucionais.
- **Catálogo e dados**: atualize a lista `TRACKS` em `app.py` para incluir novas
  trilhas, estágios e tarefas. Os campos `domain`, `difficulty`, `estimated_hours`
  e `minutes` alimentam os filtros e o cálculo de cronograma.
- **Fluxo e cópia**: para simplificar ou aprofundar o detalhamento, ajuste a
  renderização em `render_track` (por exemplo, removendo métricas ou alterando a
  forma de exibir tarefas) e personalize a mensagem final após o loop de trilhas
  para reforçar CTAs ou links úteis.

## Visão geral do app
- Filtros por domínio e dificuldade para encontrar as trilhas mais relevantes.
- Estimativas de horas por trilha, número de estágios e total de tarefas.
- Sugestão de distribuição semanal das tarefas com base na sua disponibilidade.
- Orientações rápidas de deploy diretamente na interface.
