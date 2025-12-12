# Sistema Educacional MSC Consultoria

**Documentação Estratégica e Técnica Completa**

---

## Sobre o Projeto

O Sistema Educacional da MSC Consultoria é uma plataforma de aprendizado personalizado com gamificação estilo RPG, desenvolvida para proporcionar uma experiência educacional adaptativa e imersiva. O sistema abrange diversas áreas de conhecimento, desde tecnologia e programação até concursos públicos e disciplinas fundamentais.

**CEO e Desenvolvedor**: Moises da Silva Costa  
**Usuário Piloto**: Moises da Silva Costa  
**Data de Início**: 04 de Dezembro de 2025  
**Versão Atual**: v0.3.0-alpha  
**Status**: Em Desenvolvimento Ativo (Fase 3)

---

## Estrutura da Documentação

Este repositório contém toda a documentação estratégica e técnica do projeto, organizada para facilitar o acesso e a compreensão por todas as partes interessadas.

### 📋 Documentos Principais

#### 1. [Documentação Técnica Completa](./documentacao_tecnica_completa.md)
**Documento Mestre** que consolida toda a visão do projeto em um único lugar. Este é o ponto de partida recomendado para compreender o escopo completo do sistema.

**Conteúdo**:
- Visão geral do projeto
- Resumo dos requisitos
- Resumo do plano de desenvolvimento
- Visão geral da arquitetura
- Resumo da estratégia de conteúdo
- Resumo do sistema de gamificação
- Próximos passos

---

#### 2. [Análise de Requisitos](./requisitos_sistema.md)
Documento detalhado com todos os requisitos funcionais e não funcionais do sistema, extraídos dos áudios e conversas iniciais.

**Conteúdo**:
- Visão geral do sistema
- Objetivos principais
- Domínios de conhecimento
- Arquitetura técnica
- Estratégia de coleta de dados
- Estrutura de progressão
- Sistema de gamificação
- Documentação necessária
- Metodologia de desenvolvimento

---

#### 3. [Plano de Desenvolvimento](./plano_desenvolvimento.md)
Roadmap detalhado do projeto, organizado em fases, etapas e entregáveis.

**Conteúdo**:
- Metodologia de desenvolvimento
- Fases do projeto (Fundação, Arquitetura, Backend MVP, Frontend, Testes)
- Estrutura da documentação
- Próximos passos imediatos

---

#### 4. [Arquitetura de Backend e Estratégia de Coleta de Dados](./arquitetura_backend.md)
Especificação técnica da arquitetura de microserviços e do processo de coleta e estruturação de conteúdo.

**Conteúdo**:
- Arquitetura de microserviços
- Componentes e responsabilidades
- Stack tecnológico
- Comunicação entre serviços
- Processo de coleta de dados
- Modelo de dados do conteúdo (JSON)

---

#### 5. [Mapeamento da Base de Conhecimento](./mapeamento_fontes_conteudo.md)
Catálogo completo de fontes de conteúdo educacional, organizadas por domínio e tipo.

**Conteúdo**:
- Canais do YouTube por área de conhecimento
- Repositórios de PDFs e livros
- Materiais para concursos públicos
- Disciplinas fundamentais
- Estratégia de expansão da base de dados
- Processo de extração e estruturação

---

#### 6. [Sistema de Gamificação e Progressão](./gamificacao_progressao.md)

---

#### 7. [Tecnologias de IA para o Sistema Educacional MSC](./tecnologias_ia.md)
Análise técnica das tecnologias de IA que serão utilizadas, como Mecanismos de Atenção, Transformers e a biblioteca Hugging Face.

---

#### 8. [Metodologia de Conteúdo e Novas Features](./metodologia_conteudo_e_features.md)
Estratégia para enriquecimento contínuo do conteúdo, metodologia de pesquisa hierárquica e documentação de novas features.

**Conteúdo**:
- Metodologia de busca profunda (4 níveis hierárquicos)
- Processo de iniciação de novos tópicos
- Integração com YouTube
- Geração de imagens com IA (Nano Banana)
- Rastreador de progresso de séries
- Exportação para Kindle
- Integração com NotebookLM

---

#### 9. [Lista de Subtópicos para Pesquisa Futura](./lista_subtopicos_pesquisa_futura.md)
Roteiro vivo para expansão da base de conhecimento, com subtópicos organizados por área.

**Conteúdo**:
- Subtópicos de Tecnologia e Programação (Java, Python, IA, Cloud, GitHub)
- Subtópicos de Ciências Humanas (História das Línguas, Latim, Árabe)
- Subtópicos de Concursos Públicos (OAB, DETRAN, Metodologias)
- Subtópicos de Disciplinas Fundamentais (Matemática, Física, História, Geografia)
- Sistema de priorização e rastreamento de status

---

#### 10. [Integração com APIs de Streaming](./integracao_apis_streaming.md)
Estratégia de integração com APIs de terceiros para rastreamento de séries de TV.

**Conteúdo**:
- APIs identificadas (TMDB, JustWatch, Streaming Availability)
- Plano de implementação em fases
- Modelo de dados para catálogo e progresso
- Gamificação integrada

Detalhamento completo das mecânicas de jogo, narrativa e sistema de recompensas.

**Conteúdo**:
- Conceito: "A Jornada do Conhecimento através das Eras"
- Sistema de níveis (XP)
- Progressão através das eras históricas
- Tipos de missões
- Economia interna (moeda virtual)
- Sistema de avatar e personalização
- Conquistas (achievements)

---

## Metodologia de Desenvolvimento

O projeto segue uma abordagem **iterativa e incremental**, começando com um **MVP (Produto Mínimo Viável)** e evoluindo continuamente com base no feedback do usuário piloto.

### Fases do Projeto

| Fase | Status | Progresso | Descrição |
| :--- | :--- | :--- | :--- |
| **Fase 1** | ✅ Concluída | 100% | Planejamento e Pesquisa |
| **Fase 2** | ✅ Concluída | 100% | Infraestrutura e Backend |
| **Fase 3** | 🔄 Em Andamento | 70% | Implementação de Trilhas e Conteúdo |
| **Fase 4** | 🔄 Em Andamento | 60% | Interface e UX |
| **Fase 5** | ⏳ Planejada | 0% | Funcionalidades Avançadas |
| **Fase 6** | 🔄 Em Andamento | 18% | Expansão de Conteúdo (2 de 11 trilhas) |
| **Fase 7** | ⏳ Planejada | 10% | Testes e Refinamento |
| **Fase 8** | ⏳ Planejada | 0% | Deploy e Produção |

---

## Stack Tecnológico

### Backend (Implementado)
- **Runtime**: Node.js 22
- **Framework**: Express 4 + tRPC 11
- **ORM**: Drizzle ORM
- **Banco de Dados**: MySQL/TiDB (13 tabelas)
- **Containerização**: Docker

### Frontend (Implementado)
- **Framework**: React 19
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Componentes**: Shadcn/ui
- **Routing**: Wouter
- **State Management**: tRPC + React Query

---

## 🎯 Progresso Atual

### ✅ Concluído
- Backend funcional com API tRPC type-safe
- Banco de dados com 13 tabelas estruturadas
- 2 trilhas completas (Inglês Técnico + N8N) com 33 tarefas
- Interface mobile-first com identidade visual MSC
- Sistema de gamificação (XP, níveis, eras)
- 6 usuários cadastrados (Moises como admin)
- Navegação: Trilhas → Estágios → Tarefas
- 41 recursos educacionais coletados (PDFs, vídeos, cursos)

### 🔄 Em Desenvolvimento
- Tela de execução de tarefa
- Progresso real do usuário
- Dashboard personalizado
- Sistema de recompensas visual

### 📚 Documentos Adicionais
- [Progresso Detalhado do Projeto](./PROGRESSO_PROJETO.md)
- [Próximos Passos Priorizados](./PROXIMOS_PASSOS.md)
- [Pesquisa da Metodologia Alura](./pesquisa_alura.md)
- [11 Trilhas MSC Detalhadas](./11_trilhas_msc_detalhadas.md)
- [Versionamento por Fases](./versionamento_fases.md)
- [Design System MSC](./design_system_msc.md)

## Próximos Passos Imediatos

### Prioridade Alta (Próxima Sessão)
1. **Implementar tela de execução de tarefa** - Visualizar vídeos/PDFs e completar tarefas
2. **Conectar progresso real** - Mostrar dados reais de userTaskProgress
3. **Dashboard personalizado** - Tela inicial com estatísticas e próximas tarefas

---

## Contato e Suporte

**MSC Consultoria**  
**CEO/Desenvolvedor**: Moisés da Silva Costa

---

## Licença e Direitos

© 2025 MSC Consultoria. Todos os direitos reservados.

Este projeto e sua documentação são propriedade da MSC Consultoria e destinam-se exclusivamente ao uso interno da empresa e de seus colaboradores autorizados.

---

**Última Atualização**: 04 de Dezembro de 2025  
**Versão da Documentação**: 2.0  
**Versão do Sistema**: v0.3.0-alpha
