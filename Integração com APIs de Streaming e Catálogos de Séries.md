# Integração com APIs de Streaming e Catálogos de Séries

_Este documento detalha a estratégia de integração com APIs de terceiros para obter catálogos de séries de TV e filmes, permitindo que os usuários rastreiem seu progresso de visualização como uma feature de engajamento e retenção._

---

## 1. Objetivo da Feature

A funcionalidade de **Rastreador de Progresso de Séries** visa conectar o entretenimento ao ecossistema de aprendizado, aumentando a retenção e o engajamento dos usuários. Ao permitir que os alunos registrem e acompanhem seu progresso em séries de TV, o sistema cria um ponto de contato adicional e uma razão para retornar à plataforma regularmente.

### Gamificação Integrada

-   **Recompensas por Conclusão**: Concluir uma temporada ou série completa poderá gerar XP ou desbloquear conquistas (achievements).
-   **Estatísticas**: Visualização de estatísticas como "total de horas assistidas", "séries concluídas este mês", etc.
-   **Recomendações Personalizadas**: Com base nos gêneros e séries assistidas, o sistema poderá recomendar conteúdo educacional relacionado (ex: assistiu uma série histórica → recomendar o módulo de História correspondente).

---

## 2. APIs Identificadas

### 2.1. The Movie Database (TMDB) API

**URL da Documentação**: [https://developer.themoviedb.org/](https://developer.themoviedb.org/)

-   **Descrição**: TMDB é uma das maiores e mais completas bases de dados de filmes e séries de TV, mantida pela comunidade. A API é gratuita (com limitações de taxa) e oferece acesso a informações detalhadas sobre milhares de títulos.
-   **Funcionalidades Principais**:
    -   Busca de filmes e séries por título.
    -   Detalhes completos de um título (sinopse, elenco, temporadas, episódios).
    -   Imagens (posters, backdrops).
    -   Informações sobre disponibilidade de streaming (em parceria com JustWatch).
-   **Exemplo de Endpoint**:
    -   **Buscar Série**: `GET /search/tv?query=Breaking+Bad`
    -   **Detalhes da Série**: `GET /tv/{tv_id}`
    -   **Temporadas e Episódios**: `GET /tv/{tv_id}/season/{season_number}`

### 2.2. JustWatch API

**URL**: [https://www.justwatch.com/us/JustWatch-Streaming-API](https://www.justwatch.com/us/JustWatch-Streaming-API)

-   **Descrição**: JustWatch oferece uma API comercial (paga) que fornece dados de disponibilidade de streaming em tempo real para mais de 600 serviços em mais de 140 países. É a fonte mais precisa para saber em qual plataforma (Netflix, Amazon Prime, Disney+, etc.) um título está disponível.
-   **Funcionalidades Principais**:
    -   Disponibilidade de streaming por país e serviço.
    -   Preços de aluguel/compra.
    -   Dados de popularidade e tendências.
-   **Observação**: Como é uma API paga, sua integração será planejada para uma fase futura, quando o sistema estiver mais maduro e houver orçamento para isso.

### 2.3. Streaming Availability API (RapidAPI)

**URL**: [https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)

-   **Descrição**: Uma alternativa à JustWatch, disponível no RapidAPI. Oferece informações sobre disponibilidade de streaming de filmes e séries.
-   **Funcionalidades Principais**:
    -   Busca de títulos disponíveis em um serviço específico.
    -   Verificação de disponibilidade de um título específico.
-   **Observação**: Também é uma API paga, mas pode ter planos mais acessíveis que a JustWatch.

---

## 3. Estratégia de Implementação (Plano de Fases)

### Fase 1: MVP com TMDB (Gratuito)

-   **Objetivo**: Implementar a funcionalidade básica de rastreamento de progresso usando apenas a API gratuita do TMDB.
-   **Funcionalidades**:
    -   Busca de séries por nome.
    -   Visualização de detalhes da série (poster, sinopse, número de temporadas).
    -   Registro do progresso do usuário (temporada e episódio atual).
    -   Cálculo de porcentagem de conclusão.
-   **Limitação**: Não haverá informação em tempo real sobre em qual plataforma a série está disponível. O usuário simplesmente registra o que está assistindo, independentemente da plataforma.

### Fase 2: Integração com Disponibilidade de Streaming (Pago)

-   **Objetivo**: Adicionar informações sobre onde cada série está disponível para assistir.
-   **API**: JustWatch ou Streaming Availability API.
-   **Funcionalidades Adicionais**:
    -   Exibir ícones das plataformas onde a série está disponível (Netflix, Amazon Prime, etc.).
    -   Filtrar séries por plataforma.

### Fase 3: Gamificação Avançada e Recomendações

-   **Objetivo**: Aprofundar a integração entre o rastreamento de séries e o sistema de aprendizado.
-   **Funcionalidades**:
    -   Conquistas específicas (ex: "Maratonista" - assistiu 10 episódios em um dia).
    -   Recomendações de conteúdo educacional baseadas nas séries assistidas (ex: assistiu "The Crown" → recomendar módulo de História Contemporânea).

---

## 4. Modelo de Dados

### Tabela: `series_catalog`

Armazena informações básicas sobre as séries obtidas da API do TMDB.

```sql
CREATE TABLE series_catalog (
  id SERIAL PRIMARY KEY,
  tmdb_id INTEGER UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  original_title VARCHAR(255),
  overview TEXT,
  poster_path VARCHAR(255),
  backdrop_path VARCHAR(255),
  number_of_seasons INTEGER,
  number_of_episodes INTEGER,
  first_air_date DATE,
  last_air_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `user_series_progress`

Armazena o progresso de cada usuário em cada série.

```sql
CREATE TABLE user_series_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  series_id INTEGER NOT NULL REFERENCES series_catalog(id),
  current_season INTEGER NOT NULL DEFAULT 1,
  current_episode INTEGER NOT NULL DEFAULT 1,
  status VARCHAR(50) DEFAULT 'watching', -- 'watching', 'completed', 'dropped'
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, series_id)
);
```

---

## 5. Próximos Passos

1.  **Obter Chave de API do TMDB**: Registrar-se no site do TMDB e obter uma chave de API gratuita.
2.  **Desenvolver o Serviço de Integração Externa**: Criar o microserviço responsável por fazer chamadas à API do TMDB e gerenciar o cache das informações.
3.  **Implementar Endpoints no Backend**: Criar as rotas da API para busca de séries e gerenciamento de progresso do usuário.
4.  **Desenvolver a Interface no Frontend**: Criar as telas de busca, visualização de detalhes e atualização de progresso.

---

**Referências**:
- TMDB API Documentation: https://developer.themoviedb.org/
- JustWatch Streaming API: https://www.justwatch.com/us/JustWatch-Streaming-API
- Streaming Availability API: https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability
