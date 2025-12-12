_Este documento representa a consolidação de todo o planejamento estratégico e técnico para o desenvolvimento do Sistema Educacional Gamificado da MSC Consultoria. Ele serve como um guia mestre, unificando a visão, os requisitos, a arquitetura, o plano de desenvolvimento e as estratégias de conteúdo e gamificação em um único repositório de conhecimento._

# Documentação Técnica Completa - Sistema Educacional MSC

**Empresa**: MSC Consultoria  
**Projeto**: Sistema Educacional Personalizado com Gamificação  
**Versão do Documento**: 1.0  
**Data**: 04 de Dezembro de 2025

---

## 1. Introdução e Visão Geral

O objetivo deste projeto é criar uma plataforma de aprendizado inovadora que combine conteúdo educacional profundo e personalizado com uma experiência de usuário altamente engajadora, baseada em mecânicas de RPG. O sistema visa adaptar-se ao ritmo e às necessidades de cada aluno, guiando-o através de uma "Jornada do Conhecimento" que abrange diversas áreas, desde tecnologia e programação até concursos públicos e disciplinas fundamentais.

Este documento centraliza todas as informações cruciais do projeto, fornecendo uma visão de 360 graus para todas as partes interessadas, desde a equipe de desenvolvimento até a gestão estratégica.

---

## 2. Análise de Requisitos

A fase de análise de requisitos foi fundamental para traduzir a visão inicial em especificações claras e acionáveis. Os requisitos foram extraídos dos áudios fornecidos pelo CEO e usuário piloto, Moisés da Silva Costa, e consolidados em um documento detalhado.

### Principais Requisitos

-   **Personalização Extrema**: O conteúdo deve ser adaptado individualmente para cada aluno.
-   **Gamificação Estilo RPG**: A experiência do usuário deve incluir progressão de nível, missões, avatares e uma narrativa de eras históricas.
-   **Conteúdo Denso e Estruturado**: A base de conhecimento deve ser profunda, com referências cruzadas e múltiplos níveis de dificuldade.
-   **Foco no Backend**: O desenvolvimento inicial deve priorizar a construção de uma arquitetura de backend robusta e escalável.
-   **Desenvolvimento Iterativo**: O sistema será construído de forma incremental, começando com um MVP e evoluindo com base no feedback contínuo.
-   **Sistema Evolutivo**: O próprio sistema aprenderá com a interação dos usuários para melhorar as recomendações e a personalização.
-   **Novas Tecnologias de IA**: Inclusão de Mecanismos de Atenção, Transformers e Hugging Face para potencializar o NLP do sistema.
-   **Novos Domínios**: Expansão para incluir Ciências Humanas, com foco na História das Línguas (Latim, Árabe, Inglês).

> Para uma análise completa e detalhada de todos os requisitos funcionais e não funcionais, consulte o documento específico:
> **[Análise de Requisitos Completa](./requisitos_sistema.md)**

---

## 3. Plano de Desenvolvimento

O projeto seguirá uma metodologia de desenvolvimento iterativo e incremental, organizada em fases claras e com entregáveis bem definidos. Esta abordagem garante flexibilidade e permite a adaptação do plano conforme o projeto evolui.

### Fases do Projeto

1.  **Fundação e Estruturação**: Análise de requisitos e planejamento inicial. (Concluída)
2.  **Arquitetura e Coleta de Dados**: Definição da arquitetura técnica e início da curadoria de conteúdo.
3.  **Desenvolvimento do Backend e MVP**: Construção do núcleo funcional do sistema.
4.  **Desenvolvimento do Frontend e Integração**: Criação da interface do usuário e integração com o backend.
5.  **Testes, Lançamento e Ciclos Iterativos**: Validação com o usuário piloto e início do ciclo de melhoria contínua.

> O cronograma detalhado, as etapas de cada fase e os entregáveis específicos estão descritos no documento a seguir:
> **[Plano de Desenvolvimento Detalhado](./plano_desenvolvimento.md)**

---

## 4. Arquitetura de Backend e Estratégia de Coleta de Dados

A espinha dorsal do sistema será uma arquitetura de **microserviços**, que oferece escalabilidade, resiliência e flexibilidade para o desenvolvimento. O stack tecnológico foi escolhido para suportar um sistema de alta performance e complexidade.

### Visão Geral da Arquitetura

-   **Padrão**: Microserviços com comunicação síncrona (REST) e assíncrona (Message Broker).
-   **Stack Principal**: Java com Spring Boot para a maioria dos serviços.
-   **Stack de IA/ML**: Python com FastAPI e Hugging Face Transformers para o serviço de personalização.
-   **Logging**: ELK Stack ou Grafana Loki para centralização e análise de logs.
-   **Sistema Evolutivo**: Um novo microserviço dedicado a coletar dados de interação e re-treinar os modelos de IA.
-   **Bancos de Dados**: PostgreSQL (relacional), MongoDB (NoSQL) e Redis (cache).
-   **Containerização**: Docker e Kubernetes.

### Estratégia de Dados

A coleta de dados é um processo crítico que envolve a extração automatizada de conteúdo de fontes como YouTube e PDFs, seguida por uma curadoria humana rigorosa para garantir a qualidade e a estruturação das informações em um modelo de dados JSON rico.

> Para explorar os diagramas de arquitetura, a descrição de cada microserviço e o fluxo detalhado do processo de coleta de dados, acesse:
> **[Arquitetura de Backend e Estratégia de Coleta de Dados](./arquitetura_backend.md)**

---

## 5. Mapeamento da Base de Conhecimento

Uma pesquisa extensiva foi realizada para identificar e catalogar fontes de conteúdo de alta qualidade que formarão a base de conhecimento inicial do sistema. As fontes foram organizadas por domínio, tópico e tipo de mídia.

### Domínios Prioritários

-   **Tecnologia e Programação**: Canais como "Curso em Vídeo" e livros da editora Caelum.
-   **Concursos Públicos**: Materiais do "Gran Cursos OAB" e "Estratégia Concursos".
-   **Disciplinas Fundamentais**: Conteúdo da "Khan Academy" e de editoras didáticas renomadas.
-   **Ciências Humanas**: Materiais sobre linguística histórica e cursos de idiomas como Latim e Árabe.

> A lista completa de canais do YouTube, repositórios de PDFs, livros e outros materiais, juntamente com a estratégia de expansão da base de dados, está disponível no documento:
> **[Mapeamento da Base de Conhecimento e Fontes de Conteúdo](./mapeamento_fontes_conteudo.md)**

---

## 6. Sistema de Gamificação e Progressão

A gamificação é o coração da experiência do usuário. O sistema foi projetado para ser uma "Jornada do Conhecimento através das Eras", onde o progresso acadêmico do aluno impulsiona sua evolução em um mundo de jogo.

### Mecânicas Principais

-   **Progressão**: Sistema de Níveis (XP) e avanço por Eras Históricas (da Idade Média ao Futuro).
-   **Missões**: Principais (narrativa), de Domínio (aprofundamento) e Diárias/Semanais (engajamento).
-   **Economia Interna**: Moeda virtual ("Ouro") para comprar itens cosméticos e boosts na "Loja do Sábio".
-   **Avatar**: Representação visual do aluno que evolui com seu progresso.

> Para entender a fundo a narrativa, a estrutura das missões, o balanceamento da economia e os detalhes do sistema de avatares, consulte o documento completo:
> **[Estruturação do Sistema de Gamificação e Progressão](./gamificacao_progressao.md)**

---

## 7. Tecnologias de IA Avançadas

Para impulsionar a capacidade de personalização e compreensão de linguagem natural do sistema, adotaremos tecnologias de ponta em Inteligência Artificial.

- **Mecanismos de Atenção e Transformers**: Serão o núcleo do nosso motor de NLP, permitindo uma análise contextual profunda do conteúdo e das interações do usuário.
- **Hugging Face**: Utilizaremos a plataforma e a biblioteca Hugging Face para acessar e implementar modelos de linguagem pré-treinados de última geração, acelerando o desenvolvimento e garantindo alta performance.

> Para uma exploração técnica detalhada dessas tecnologias e sua aplicação no sistema, consulte o documento:
> **[Tecnologias de IA para o Sistema Educacional MSC](./tecnologias_ia.md)**

---

## 8. Próximos Passos e Conclusão

Com a fase de planejamento e estruturação concluída, o projeto está pronto para entrar na fase de execução técnica, começando pela **Fase 2: Arquitetura e Coleta de Dados**.

### Ações Imediatas

1.  **Configuração do Ambiente de Desenvolvimento**: Criação dos repositórios no GitHub e configuração do ambiente local com Docker.
2.  **Modelagem do Banco de Dados**: Detalhamento do esquema do PostgreSQL e das coleções do MongoDB.
3.  **Desenvolvimento do Protótipo de Coleta**: Criação de scripts PoC (Prova de Conceito) para validar o fluxo de extração de dados.

Este conjunto de documentos forma uma base sólida para o desenvolvimento do sistema educacional da MSC Consultoria. Ele deve ser mantido como um "documento vivo", atualizado continuamente para refletir o progresso e as decisões tomadas ao longo do ciclo de vida do projeto.
