# Novas Funcionalidades - Sistema Educacional MSC v2.0

_Documento de especificação das funcionalidades expandidas baseadas nos requisitos detalhados do usuário piloto._

---

## 1. Controle de Acesso Restrito por Usuário

O sistema será de acesso exclusivo, onde apenas o administrador (você, Moisés) poderá convidar e cadastrar novos alunos. Isso garante controle total sobre quem tem acesso à plataforma.

### Implementação Técnica

A tabela `users` já possui o campo `role` com valores `admin` e `user`. Será criado um sistema de convites onde o administrador gera links únicos de cadastro que expiram após uso ou após um período determinado.

**Nova Tabela: `invitations`**
- `id`: Identificador único
- `inviteCode`: Código único gerado para o convite
- `email`: Email do convidado (opcional)
- `createdBy`: ID do admin que criou o convite
- `expiresAt`: Data de expiração
- `usedAt`: Data de uso (null se ainda não usado)
- `usedBy`: ID do usuário que usou o convite

**Fluxo de Convite:**
1. Admin acessa painel de gerenciamento
2. Gera convite (com ou sem email específico)
3. Sistema cria link único: `https://sistema.msc.com/signup?invite=ABC123XYZ`
4. Novo usuário acessa o link e completa cadastro
5. Convite é marcado como usado e vinculado ao novo usuário

---

## 2. Histórico de Progresso Individualizado Detalhado

Cada aluno terá um histórico completo e visual de sua jornada de aprendizado, permitindo análise profunda do progresso.

### Componentes do Histórico

**Timeline de Atividades**
Registro cronológico de todas as ações do usuário no sistema, incluindo início de módulos, conclusões, tentativas de quiz, conquistas desbloqueadas e mudanças de era.

**Nova Tabela: `activity_log`**
- `id`: Identificador único
- `userId`: ID do usuário
- `activityType`: Tipo de atividade (`module_started`, `module_completed`, `quiz_attempted`, `quiz_passed`, `level_up`, `era_changed`, `achievement_unlocked`)
- `relatedContentId`: ID do conteúdo relacionado (se aplicável)
- `relatedTrackId`: ID da trilha relacionada (se aplicável)
- `metadata`: JSON com dados adicionais (ex: pontuação do quiz, XP ganho)
- `createdAt`: Timestamp da atividade

**Gráficos de Evolução**
- XP acumulado ao longo do tempo (gráfico de linha)
- Módulos completados por semana/mês (gráfico de barras)
- Distribuição de tempo por domínio de conhecimento (gráfico de pizza)
- Taxa de acerto em quizzes por tópico (gráfico de radar)

**Estatísticas Detalhadas**
- Total de horas estudadas (estimado pela duração dos conteúdos)
- Streak de dias consecutivos de estudo
- Média de pontuação em quizzes
- Tópicos com melhor e pior desempenho

---

## 3. Base de Conhecimento Hiper-Detalhada

O conteúdo será estruturado de forma extremamente granular, com referências cruzadas, pré-requisitos e múltiplas camadas de profundidade.

### Expansão do Modelo de Dados

**Atualização da Tabela `content`**
Novos campos a serem adicionados:
- `prerequisites`: JSON array com IDs de conteúdos que devem ser completados antes
- `relatedConcepts`: JSON array com IDs de conteúdos relacionados
- `glossaryTerms`: JSON array com termos-chave explicados neste conteúdo
- `practicalExamples`: Texto com exemplos práticos
- `analogies`: Texto com analogias para facilitar compreensão
- `realWorldCases`: Texto com casos reais de aplicação
- `references`: JSON array com links e citações de fontes

**Nova Tabela: `glossary`**
- `id`: Identificador único
- `term`: Termo técnico
- `simpleDefinition`: Definição para leigos
- `technicalDefinition`: Definição técnica completa
- `examples`: Exemplos de uso
- `relatedTerms`: JSON array com IDs de termos relacionados

**Nova Tabela: `concept_map`**
Mapeia relacionamentos entre conceitos para criar um grafo de conhecimento.
- `id`: Identificador único
- `conceptA`: ID do primeiro conceito (content)
- `conceptB`: ID do segundo conceito (content)
- `relationshipType`: Tipo de relação (`prerequisite`, `related`, `opposite`, `example_of`, `part_of`)

---

## 4. Sistema de Analogias e Casos da Vida Real

Para tornar o aprendizado acessível a leigos, cada conceito terá analogias e exemplos contextualizados.

### Estrutura de Analogias

Cada conteúdo terá uma seção dedicada a analogias que conectam conceitos abstratos a situações familiares.

**Exemplo para "Variáveis em Programação":**
- **Analogia**: "Uma variável é como uma caixa etiquetada. Você pode guardar algo dentro dela (um número, um texto) e depois pegar de volta usando a etiqueta."
- **Caso Real**: "Quando você salva o nome de um contato no celular, está usando uma variável. O nome 'Mãe' é a etiqueta, e o número de telefone é o valor guardado."

### Implementação

Os campos `analogies` e `realWorldCases` na tabela `content` armazenarão esse conteúdo. A interface exibirá essas seções de forma destacada, com ícones visuais para facilitar identificação.

---

## 5. Sistema de Observações e Anotações Pessoais

Cada usuário poderá fazer anotações pessoais sobre os conteúdos, criar marcações e adicionar suas próprias reflexões.

**Nova Tabela: `user_notes`**
- `id`: Identificador único
- `userId`: ID do usuário
- `contentId`: ID do conteúdo relacionado
- `noteText`: Texto da anotação
- `highlightedSection`: Trecho específico destacado (se aplicável)
- `tags`: JSON array com tags personalizadas
- `isImportant`: Boolean para marcar notas importantes
- `createdAt`: Data de criação
- `updatedAt`: Data de última atualização

**Funcionalidades:**
- Editor de texto rico para anotações
- Sistema de tags personalizadas
- Busca em anotações
- Exportação de anotações em Markdown ou PDF
- Marcação de trechos importantes com cores

---

## 6. Upload e Gestão de PDFs

Usuários poderão anexar PDFs aos conteúdos, tanto como material de apoio quanto como fonte principal de estudo.

### Fluxo de Upload

1. **Upload para S3**: Utilizar a função `storagePut()` já disponível no template
2. **Extração de Metadados**: Capturar nome do arquivo, tamanho, número de páginas
3. **Extração de Texto**: Usar biblioteca Python (PyPDF2 ou pdfplumber) para extrair texto
4. **Indexação**: Tornar o conteúdo do PDF pesquisável

**Nova Tabela: `pdf_attachments`**
- `id`: Identificador único
- `contentId`: ID do conteúdo ao qual está anexado
- `fileName`: Nome original do arquivo
- `fileKey`: Chave do arquivo no S3
- `fileUrl`: URL pública do arquivo
- `fileSize`: Tamanho em bytes
- `pageCount`: Número de páginas
- `extractedText`: Texto extraído (para busca)
- `uploadedBy`: ID do usuário que fez upload
- `uploadedAt`: Data de upload

### Visualizador Integrado

Implementar visualizador de PDF no frontend usando biblioteca como `react-pdf` ou `pdf.js`, permitindo leitura diretamente na plataforma sem necessidade de download.

---

## 7. Conteúdo Prioritário - Temas Iniciais

Focar na criação de trilhas para os temas de maior interesse imediato, com conteúdo adaptado para público leigo.

### Trilhas Prioritárias

**1. Inglês - Leitura e Desenvolvimento Contínuo**
- Módulo 1: Alfabeto e Pronúncia Básica
- Módulo 2: Vocabulário Essencial (500 palavras mais comuns)
- Módulo 3: Estruturas Gramaticais Fundamentais
- Módulo 4: Leitura de Textos Simples
- Módulo 5: Compreensão de Textos Técnicos (foco em programação)

**2. N8N - Automação de Workflows**
- Módulo 1: O que é Automação? (conceitos básicos)
- Módulo 2: Introdução ao N8N
- Módulo 3: Criando seu Primeiro Workflow
- Módulo 4: Integrações Comuns (Google Sheets, Email, Webhooks)
- Módulo 5: Automações Avançadas

**3. APIs e Integração**
- Módulo 1: O que é uma API? (analogia com cardápio de restaurante)
- Módulo 2: HTTP e Requisições (GET, POST, PUT, DELETE)
- Módulo 3: JSON e Estruturas de Dados
- Módulo 4: Autenticação em APIs (API Keys, OAuth)
- Módulo 5: Consumindo APIs Reais (exemplos práticos)

**4. GitHub - Versionamento e Colaboração**
- Módulo 1: O que é Controle de Versão? (analogia com "salvar versões" de documentos)
- Módulo 2: Instalação e Configuração do Git
- Módulo 3: Comandos Básicos (clone, add, commit, push)
- Módulo 4: Branches e Merge
- Módulo 5: Colaboração em Projetos Open Source

**5. Hugging Face - IA e Modelos**
- Módulo 1: Introdução à Inteligência Artificial
- Módulo 2: O que é Hugging Face?
- Módulo 3: Usando Modelos Pré-Treinados
- Módulo 4: Fine-Tuning de Modelos
- Módulo 5: Criando Aplicações com IA

**6. CLI - Command Line Interface**
- Módulo 1: Por que usar a linha de comando?
- Módulo 2: Navegação em Diretórios (cd, ls, pwd)
- Módulo 3: Manipulação de Arquivos (cp, mv, rm, mkdir)
- Módulo 4: Pipes e Redirecionamento
- Módulo 5: Scripts Bash Básicos

**7. Manus - Plataforma Completa**
- Módulo 1: Visão Geral da Plataforma Manus
- Módulo 2: Criando seu Primeiro Projeto
- Módulo 3: Integrações e Ferramentas
- Módulo 4: Melhores Práticas
- Módulo 5: Casos de Uso Avançados

**8. Fundamentos de Programação**
- Módulo 1: Lógica de Programação (sem código)
- Módulo 2: Variáveis e Tipos de Dados
- Módulo 3: Estruturas de Controle (if/else, loops)
- Módulo 4: Funções e Modularização
- Módulo 5: Estruturas de Dados Básicas

**9. JavaScript - Básico ao Avançado**
- Módulo 1: Introdução ao JavaScript
- Módulo 2: Sintaxe e Operadores
- Módulo 3: Manipulação do DOM
- Módulo 4: Programação Assíncrona (Promises, async/await)
- Módulo 5: Node.js e Backend

**10. Python - Básico ao Avançado**
- Módulo 1: Introdução ao Python
- Módulo 2: Sintaxe e Estruturas Básicas
- Módulo 3: Manipulação de Dados (listas, dicionários)
- Módulo 4: Bibliotecas Essenciais (pandas, numpy)
- Módulo 5: Projetos Práticos

**11. Ciência de Dados**
- Módulo 1: O que é Ciência de Dados?
- Módulo 2: Estatística Básica
- Módulo 3: Visualização de Dados
- Módulo 4: Machine Learning Introdutório
- Módulo 5: Projetos de Análise de Dados

---

## 8. Adaptação para Público Totalmente Leigo

Criar um nível "zero absoluto" para cada trilha, assumindo que o aluno não tem conhecimento prévio algum.

### Princípios de Design para Leigos

**Linguagem Simples**
Evitar jargões técnicos sem explicação. Quando um termo técnico for necessário, sempre fornecer definição simples imediatamente.

**Progressão Gradual**
Cada módulo deve introduzir apenas 2-3 conceitos novos, consolidando bem antes de avançar.

**Exemplos Abundantes**
Para cada conceito, fornecer no mínimo 3 exemplos práticos e 1 analogia.

**Feedback Constante**
Quizzes frequentes (a cada 5-10 minutos de conteúdo) para validar compreensão antes de prosseguir.

**Glossário Integrado**
Termos técnicos sublinhados que, ao clicar, exibem definição simplificada em popup.

---

## Próximos Passos de Implementação

Com base nessas especificações, a implementação seguirá a ordem:

1. Expandir o schema do banco de dados com as novas tabelas
2. Implementar sistema de convites e controle de acesso
3. Criar sistema de logging de atividades e histórico
4. Adicionar campos de analogias e observações aos conteúdos
5. Implementar upload e gestão de PDFs
6. Popular o banco com a primeira trilha completa (sugestão: Fundamentos de Programação ou JavaScript)
7. Criar interface de visualização de histórico e estatísticas
8. Implementar sistema de anotações pessoais

Este documento servirá como referência para todas as fases de desenvolvimento subsequentes.
