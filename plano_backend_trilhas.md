# Planejamento da Estrutura do Backend e Trilhas de Ensino

_Este documento detalha o plano de ação para o desenvolvimento do backend, a criação das trilhas de ensino individualizadas e a estratégia para a coleta de conteúdo denso, focando em entregar uma experiência gamificada e funcional para o usuário piloto._

---

## 1. Visão Geral da Implementação

O foco agora é a **implementação prática**. Deixaremos de lado features secundárias (como a integração com catálogos de streaming) para nos concentrarmos no núcleo do sistema: **conteúdo de qualidade** entregue através de uma **experiência de backend gamificada**.

O processo será dividido em três grandes frentes de trabalho que ocorrerão em paralelo e de forma integrada:

1.  **Desenvolvimento do Backend**: Construção da infraestrutura que servirá o conteúdo.
2.  **Criação das Trilhas de Ensino**: Modelagem de como o conteúdo será organizado e apresentado.
3.  **Coleta de Conteúdo Denso**: Execução da estratégia de extração e processamento de dados.

---

## 2. Estrutura do Backend e Acesso Gamificado

O backend será o cérebro do sistema, responsável por gerenciar usuários, conteúdo, progresso e a lógica de gamificação. O acesso ao conteúdo será inerentemente gamificado.

### Arquitetura de Acesso ao Conteúdo

1.  **Autenticação**: O usuário (Moisés) fará login no sistema.
2.  **Dashboard do Jogador**: Ao logar, o usuário verá seu "Painel do Herói", que mostrará seu avatar, nível, XP, e as "Missões de Conhecimento" disponíveis.
3.  **Missões de Conhecimento**: Cada "missão" corresponde a um **Micro-Tópico** da nossa base de dados. Ex: "Missão: Entenda a Complexidade de Algoritmo (Big O)".
4.  **Execução da Missão**: Ao aceitar uma missão, o usuário acessa o conteúdo associado (link do YouTube, trecho de PDF). O sistema registrará que a missão foi iniciada.
5.  **Validação do Conhecimento**: Após consumir o conteúdo, o usuário enfrentará um pequeno "Desafio" (quiz de 1 a 3 perguntas) para validar o aprendizado.
6.  **Recompensa**: Ao passar no desafio, o usuário completa a missão e recebe as recompensas (XP, Ouro, etc.), e seu progresso na **Trilha de Ensino** é atualizado.

### Principais Arquivos e Módulos do Backend (Estrutura Inicial)

-   **`UserController.java`**: Gerenciar o cadastro, login e perfil do usuário.
-   **`ContentController.java`**: Servir o conteúdo (vídeos, textos) associado a cada micro-tópico.
-   **`GamificationController.java`**: Processar a lógica de missões, desafios e recompensas.
-   **`TrackController.java`**: Gerenciar as trilhas de ensino e o progresso do usuário nelas.
-   **`User.java` (Model)**: Representação do usuário no banco de dados.
-   **`Content.java` (Model)**: Representação do conteúdo (micro-tópico) no banco de dados.
-   **`Track.java` (Model)**: Representação da trilha de ensino.
-   **`UserProgress.java` (Model)**: Tabela para registrar o progresso do usuário em cada missão/trilha.

---

## 3. Trilhas de Ensino Individualizadas

As **Trilhas de Ensino** são o coração da personalização. Elas são sequências lógicas de **Micro-Tópicos** (missões) projetadas para guiar o aluno do básico ao avançado dentro de um **Tópico Principal**.

### Estrutura de uma Trilha de Ensino

-   **Base de Dados Central**: Todas as trilhas são construídas a partir da mesma base de dados de conteúdo denso. Não há duplicação de conteúdo, apenas diferentes formas de organizá-lo.
-   **Trilha por Tema**: Cada trilha é focada em um tema específico. Ex: "Trilha: Fundamentos de Java", "Trilha: Preparação para OAB - Direito Constitucional".
-   **Estrutura Modular**: Uma trilha é composta por **Módulos** (correspondentes aos Subtópicos), que por sua vez são compostos por **Passos** (correspondentes aos Micro-Tópicos/Missões).
-   **Individualização**: Embora a trilha tenha uma ordem sugerida, o sistema poderá adaptar a sequência com base no desempenho do aluno. Se um aluno erra muitas questões sobre um micro-tópico, o sistema pode sugerir missões de reforço ou pré-requisitos.

### Exemplo de Trilha: "Fundamentos de Java"

-   **Módulo 1: Introdução à JVM**
    -   Passo 1.1: O que é a JVM? (Vídeo)
    -   Passo 1.2: Como a JVM executa o código? (Artigo + Quiz)
-   **Módulo 2: Tipos de Dados e Variáveis**
    -   Passo 2.1: Tipos Primitivos (Vídeo)
    -   Passo 2.2: Variáveis e Constantes (PDF + Quiz)
-   **Módulo 3: Estruturas de Controle**
    -   Passo 3.1: Condicionais (if/else, switch) (Vídeo + Desafio de Código)
    -   Passo 3.2: Laços de Repetição (for, while) (Vídeo + Desafio de Código)

---

## 4. Processo de Coleta de Conteúdo Denso

O foco inicial será na coleta de conteúdo para a primeira trilha de ensino a ser desenvolvida. Sugestão: **"Trilha: Fundamentos de Java"**.

### Mapeamento do Processo de Coleta

1.  **Seleção do Tópico**: Escolher o tópico da primeira trilha (ex: Java).
2.  **Busca Profunda**: Utilizar a **Lista de Subtópicos para Pesquisa Futura** como guia. Começar a pesquisa pelo subtópico "Fundamentos da Linguagem".
3.  **Extração de Links do YouTube**: Para cada micro-tópico identificado (ex: "Tipos Primitivos"), encontrar o melhor vídeo no YouTube e registrar o link.
4.  **Extração de PDFs**: Encontrar material de apoio em PDF (livros, apostilas) para complementar os vídeos.
5.  **Estruturação dos Dados**: Inserir as informações coletadas em um formato estruturado (JSON ou diretamente no banco de dados), seguindo o modelo de dados de conteúdo.
6.  **Criação de Quizzes**: Para cada micro-tópico, elaborar de 1 a 3 perguntas de múltipla escolha para validar o aprendizado.

### Ferramentas e Scripts

-   **`youtube_scraper.py`**: Um script Python será desenvolvido para, a partir de uma lista de URLs, extrair metadados dos vídeos (título, descrição, duração) usando a API do YouTube.
-   **`pdf_extractor.py`**: Um script para extrair texto de seções específicas de documentos PDF.

---

## 5. Documentação e Mapeamento do Processo

Todo o processo de desenvolvimento será documentado de forma contínua.

### Documentos Chave a Serem Criados/Atualizados

-   **`README.md` (no repositório do GitHub)**: Conterá as instruções para configurar o ambiente de desenvolvimento, rodar o projeto e a descrição de cada microserviço.
-   **`API_Documentation.md`**: Documentação de todos os endpoints da API (usando Swagger/OpenAPI).
-   **`Database_Schema.md`**: Diagrama e descrição detalhada do banco de dados.
-   **`Content_Pipeline.md`**: Documento que descreve o fluxo completo de coleta, processamento e inserção de conteúdo.

### Mapeamento do Processo de Desenvolvimento

O desenvolvimento seguirá as fases do plano, com commits frequentes no GitHub para cada feature ou correção implementada. As mensagens de commit seguirão um padrão para facilitar o rastreamento (ex: `feat(gamification): Implementa sistema de recompensas por XP`).

---

## 6. Próximos Passos Imediatos

1.  **Fase 2: Configuração do Ambiente**: Iniciar a criação do repositório no GitHub e a configuração do ambiente de desenvolvimento local com Docker e a estrutura inicial do projeto Spring Boot.
2.  **Fase 3: Modelagem do Banco de Dados**: Criar o script SQL inicial com as tabelas `users`, `content`, `tracks` e `user_progress`.
3.  **Fase 4: Coleta Piloto**: Iniciar a coleta de conteúdo para os 3 primeiros micro-tópicos da trilha "Fundamentos de Java".

Este plano estabelece as bases para um desenvolvimento focado e prático, visando a entrega de um backend funcional e uma experiência de aprendizado gamificada desde o início.
