_Este documento estabelece a arquitetura de backend e a estratégia de coleta de dados para o sistema educacional da MSC Consultoria. A arquitetura foi projetada para ser modular, escalável e resiliente, suportando o crescimento contínuo do sistema e a adição de novas funcionalidades de forma iterativa._

# Arquitetura de Backend e Estratégia de Coleta de Dados

## 1. Arquitetura de Backend: Microserviços

Para atender aos requisitos de flexibilidade, escalabilidade e manutenção, propomos uma **arquitetura baseada em microserviços**. Esta abordagem nos permite desenvolver, implantar e escalar cada funcionalidade do sistema de forma independente, promovendo a agilidade e a resiliência do ecossistema de software.

### Diagrama da Arquitetura

(Um diagrama de arquitetura será inserido aqui posteriormente, ilustrando a interação entre os microserviços e o fluxo de dados.)

### Componentes da Arquitetura

| Microserviço | Responsabilidades Principais | Tecnologias Sugeridas |
| :--- | :--- | :--- |
| **API Gateway** | Ponto de entrada único para todas as requisições do frontend. Roteamento, autenticação e rate limiting. | Spring Cloud Gateway, Kong, ou Traefik |
| **Serviço de Usuários** | Gerenciamento de perfis de alunos, autenticação (OAuth 2.0), autorização e dados de progresso. | Spring Boot, Java, PostgreSQL |
| **Serviço de Conteúdo** | CRUD de todo o material educacional (vídeos, PDFs, textos), metadados, categorias e tags. | Spring Boot, Java, PostgreSQL, MongoDB |
| **Serviço de Gamificação** | Lógica para o sistema de RPG: níveis, missões, recompensas, avatares e sistema de eras. | Spring Boot, Java, Redis (para caching) |
| **Serviço de Personalização** | Algoritmos de recomendação, análise de desempenho do aluno e adaptação do conteúdo. | Python (com Hugging Face Transformers, Scikit-learn), FastAPI |
| **Serviço de Avaliação** | Gerenciamento de exercícios, quizzes, e medição do conhecimento do aluno. | Spring Boot, Java, PostgreSQL |
| **Serviço de Logging** | Centralização e gerenciamento de logs de todos os microserviços, com foco em logs de erro. | ELK Stack (Elasticsearch, Logstash, Kibana) ou Grafana Loki |
| **Serviço de Evolução** | Coleta de dados de interação do usuário para treinar e evoluir os modelos de personalização. | Python, FastAPI, Scikit-learn, TensorFlow/PyTorch |
| **Serviço de Integração Externa** | Gerencia a comunicação com APIs de terceiros (TMDB, JustWatch, etc.) e a funcionalidade de exportação (Kindle). | Spring Boot, Java |

### Comunicação entre Serviços

A comunicação entre os microserviços será realizada de forma síncrona via **APIs REST** para requisições diretas e de forma assíncrona através de um **Message Broker** (como RabbitMQ ou Apache Kafka) para eventos e notificações. A comunicação assíncrona garante o desacoplamento e a resiliência do sistema, permitindo que os serviços operem mesmo que outros estejam temporariamente indisponíveis.

## 2. Stack Tecnológico Sugerido

O stack tecnológico foi escolhido para garantir performance, escalabilidade e uma boa experiência de desenvolvimento.

- **Linguagem Principal (Backend)**: **Java 17+** com o framework **Spring Boot**. Java é uma escolha robusta, madura e performática para construir sistemas complexos e de alta demanda.
- **Linguagem para IA/ML**: **Python** com frameworks como **FastAPI** ou **Flask** para o Serviço de Personalização, aproveitando o vasto ecossistema de bibliotecas de Machine Learning.
- **Banco de Dados Relacional**: **PostgreSQL**. Ideal para armazenar dados estruturados como perfis de usuário, metadados de conteúdo e informações de progresso.
- **Banco de Dados NoSQL**: **MongoDB**. Utilizado para armazenar dados mais flexíveis e semi-estruturados, como logs de eventos, e potencialmente o conteúdo extraído de PDFs e vídeos.
- **Cache**: **Redis**. Para armazenar em memória dados acessados frequentemente, como sessões de usuário e leaderboards do sistema de gamificação, melhorando a performance.
- **Containerização**: **Docker** e **Docker Compose** para criar e gerenciar os ambientes de desenvolvimento e produção de forma consistente.
- **Orquestração (Produção)**: **Kubernetes** para automatizar a implantação, o escalonamento e a gestão de aplicações em contêineres.

## 3. Estratégia de Coleta e Estruturação de Dados

A coleta de dados é a fundação do sistema de personalização. O processo será meticuloso e focado na qualidade e profundidade do conteúdo.

### Processo de Coleta

1.  **Mapeamento de Fontes**: Identificação e catalogação de fontes de alta qualidade. Para o YouTube, isso inclui canais educacionais renomados. Para PDFs, inclui livros, artigos e documentações oficiais.
2.  **Extração Automatizada**: Desenvolvimento de scripts para extrair conteúdo das fontes.
    -   **YouTube**: Utilização da API do YouTube para buscar vídeos e playlists. Ferramentas de transcrição automática (como o `manus-speech-to-text` ou APIs de terceiros) serão usadas para converter o áudio dos vídeos em texto.
    -   **PDFs**: Uso de bibliotecas como `PyPDF2` ou `pdf2image` em Python para extrair texto e imagens de documentos PDF.
3.  **Curadoria Humana**: Revisão do conteúdo extraído para garantir a qualidade, corrigir erros de transcrição e classificar o material.
4.  **Estruturação e Armazenamento**: O conteúdo curado será formatado em um padrão JSON e armazenado no banco de dados (MongoDB ou PostgreSQL com campos JSONB).

### Modelo de Dados do Conteúdo (Exemplo JSON)

```json
{
  "content_id": "uuid-1234-abcd-5678",
  "title": "Introdução a Estruturas de Dados em Java",
  "type": "video", // ou "pdf", "text"
  "source_url": "https://www.youtube.com/watch?v=...",
  "source_name": "Canal Exemplo de Programação",
  "domain": "Tecnologia e Programação",
  "topic": "Java",
  "sub_topics": ["Estruturas de Dados", "ArrayList", "LinkedList"],
  "difficulty": "iniciante",
  "duration_seconds": 900,
  "transcript": "Olá, pessoal! Nesta aula, vamos começar a explorar as estruturas de dados em Java...",
  "keywords": ["java", "data structures", "programming"],
  "references": [
    {
      "description": "Documentação oficial do Java sobre Collections",
      "url": "https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html"
    }
  ],
  "created_at": "2025-12-04T14:00:00Z",
  "updated_at": "2025-12-04T14:00:00Z"
}
```

Este modelo de dados rico permitirá buscas complexas, filtragem e, mais importante, alimentará o motor de personalização com informações detalhadas sobre cada peça de conteúdo.

## 4. Sistema Evolutivo e Melhoria Contínua

A arquitetura será projetada para suportar um **sistema evolutivo**, onde o próprio sistema aprende e melhora com o tempo. Isso será alcançado através de um ciclo de feedback contínuo:

1.  **Coleta de Dados de Interação**: O **Serviço de Evolução** coletará dados anônimos sobre como os usuários interagem com o conteúdo (tempo gasto, exercícios refeitos, caminhos de aprendizado escolhidos).
2.  **Re-treinamento de Modelos**: Periodicamente, esses dados serão usados para re-treinar e aprimorar os modelos do **Serviço de Personalização**.
3.  **Deploy de Novos Modelos**: Os modelos aprimorados serão implantados, melhorando a qualidade das recomendações e da personalização para todos os usuários.

## 5. Documentação e Logging

- **Documentação Constante**: A documentação da API será gerada automaticamente (usando ferramentas como Swagger/OpenAPI) e mantida atualizada a cada nova feature.
- **Logging Centralizado**: O **Serviço de Logging** centralizará os logs de todos os outros serviços. Isso é crucial para monitorar a saúde do sistema, identificar problemas rapidamente e analisar o comportamento do usuário para alimentar o sistema evolutivo.

## 6. Próximos Passos

Com a arquitetura e a estratégia definidas, os próximos passos práticos são:

1.  **Configurar o Ambiente de Desenvolvimento**: Preparar os repositórios no GitHub, configurar o Docker e o ambiente de desenvolvimento local.
2.  **Iniciar a Modelagem do Banco de Dados**: Criar o esquema detalhado para o PostgreSQL e a estrutura de coleções para o MongoDB.
3.  **Desenvolver um Protótipo do Script de Coleta**: Criar uma prova de conceito para extrair e processar um vídeo do YouTube e um documento PDF, validando o fluxo de trabalho.

Este documento servirá como um guia vivo e será atualizado conforme o projeto avança e novas decisões são tomadas.
