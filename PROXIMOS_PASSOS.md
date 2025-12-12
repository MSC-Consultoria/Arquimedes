# MSC Sistema Educacional - Próximos Passos

**Data**: 04 de Dezembro de 2025  
**Versão Atual**: v0.3.0-alpha  
**Responsável**: Moises da Silva Costa

---

## 🎯 Visão Geral

Este documento detalha os próximos passos para o desenvolvimento do Sistema Educacional MSC, organizados por prioridade e complexidade. O foco principal é completar a funcionalidade core do sistema para que o usuário piloto (Moises) possa começar a usar o sistema de forma produtiva.

---

## 🚀 Prioridade ALTA - Próxima Sessão

### 1. Implementar Tela de Execução de Tarefa ⭐⭐⭐

**Objetivo**: Permitir que o usuário visualize e complete tarefas, ganhando XP e progredindo nas trilhas.

**Tarefas**:
- [ ] Criar componente `TaskExecution.tsx`
- [ ] Implementar visualizador de vídeos do YouTube (iframe embed)
- [ ] Implementar leitor de PDFs (usando `react-pdf` ou iframe)
- [ ] Adicionar botão "Completar Tarefa"
- [ ] Implementar mutation `tasks.complete` no frontend
- [ ] Mostrar animação de XP ganho ao completar
- [ ] Atualizar gamificação do usuário (XP, nível, era)
- [ ] Redirecionar para próxima tarefa após conclusão

**Estimativa**: 2-3 horas  
**Dependências**: Nenhuma  
**Impacto**: Alto - Funcionalidade core do sistema

---

### 2. Conectar Progresso Real do Usuário ⭐⭐⭐

**Objetivo**: Mostrar dados reais de progresso ao invés de valores estáticos (0%).

**Tarefas**:
- [ ] Criar query `getUserProgressByTrack` no frontend
- [ ] Atualizar `TrackDetail.tsx` para mostrar progresso real
- [ ] Atualizar `StageDetail.tsx` para mostrar tarefas concluídas
- [ ] Adicionar ícones de check verde em tarefas completadas
- [ ] Implementar cálculo de porcentagem de conclusão
- [ ] Mostrar estatísticas: X de Y tarefas concluídas

**Estimativa**: 1-2 horas  
**Dependências**: Nenhuma  
**Impacto**: Alto - Feedback visual essencial

---

### 3. Criar Dashboard Personalizado ⭐⭐

**Objetivo**: Tela inicial pós-login mostrando visão geral do progresso do usuário.

**Tarefas**:
- [ ] Criar componente `UserDashboard.tsx`
- [ ] Mostrar estatísticas gerais (XP total, nível, era atual)
- [ ] Listar trilhas em andamento com progresso
- [ ] Mostrar próximas 5 tarefas agendadas
- [ ] Gráfico de evolução de XP (últimos 7 dias)
- [ ] Card de "Conquistas Recentes"
- [ ] Botão "Continuar de onde parei"
- [ ] Atualizar rota `/` para redirecionar ao dashboard

**Estimativa**: 3-4 horas  
**Dependências**: Progresso real conectado  
**Impacto**: Médio-Alto - Melhora engajamento

---

## 📱 Prioridade MÉDIA - Semana 1

### 4. Implementar Bottom Navigation Bar ⭐⭐

**Objetivo**: Navegação mobile otimizada com ícones fixos na parte inferior.

**Tarefas**:
- [ ] Criar componente `BottomNav.tsx`
- [ ] Adicionar 4 ícones: Home, Trilhas, Progresso, Perfil
- [ ] Implementar navegação entre seções
- [ ] Destacar aba ativa
- [ ] Fixar na parte inferior (position: fixed)
- [ ] Adicionar padding-bottom nas páginas

**Estimativa**: 1-2 horas  
**Dependências**: Dashboard criado  
**Impacto**: Médio - Melhora UX mobile

---

### 5. Corrigir Nome do Usuário ⭐

**Objetivo**: Atualizar "Moisés" para "Moises" no banco de dados.

**Tarefas**:
- [ ] Criar script de atualização do nome
- [ ] Executar update no banco: `UPDATE users SET name = 'Moises Costa' WHERE openId = 'moises.costa'`
- [ ] Verificar atualização na tela de login

**Estimativa**: 15 minutos  
**Dependências**: Nenhuma  
**Impacto**: Baixo - Correção de detalhe

---

### 6. Adicionar Gestos Intuitivos ⭐

**Objetivo**: Melhorar UX mobile com gestos de swipe.

**Tarefas**:
- [ ] Implementar swipe para voltar (gesture back)
- [ ] Swipe horizontal para navegar entre tarefas
- [ ] Pull-to-refresh no dashboard
- [ ] Usar biblioteca `react-swipeable` ou `framer-motion`

**Estimativa**: 2-3 horas  
**Dependências**: Telas principais implementadas  
**Impacto**: Médio - Melhora UX

---

## 📚 Prioridade MÉDIA - Semana 2

### 7. Completar Trilha 3: APIs ⭐⭐

**Objetivo**: Adicionar terceira trilha completa ao sistema.

**Tarefas**:
- [ ] Pesquisar e coletar recursos (PDFs, vídeos)
- [ ] Estruturar 3-4 estágios
- [ ] Criar 12-15 tarefas
- [ ] Popular banco de dados
- [ ] Testar navegação e conteúdo

**Estimativa**: 4-5 horas  
**Dependências**: Nenhuma  
**Impacto**: Médio - Expansão de conteúdo

---

### 8. Completar Trilha 4: GitHub ⭐⭐

**Objetivo**: Adicionar quarta trilha completa ao sistema.

**Tarefas**:
- [ ] Pesquisar e coletar recursos
- [ ] Estruturar estágios e tarefas
- [ ] Popular banco de dados
- [ ] Incluir projetos práticos

**Estimativa**: 4-5 horas  
**Dependências**: Nenhuma  
**Impacto**: Médio - Expansão de conteúdo

---

### 9. Sistema de Anotações Pessoais ⭐⭐

**Objetivo**: Permitir que o usuário faça anotações em cada tarefa.

**Tarefas**:
- [ ] Criar tabela `userNotes` no banco
- [ ] Adicionar campo de texto na tela de tarefa
- [ ] Implementar mutation `notes.create`
- [ ] Listar anotações anteriores
- [ ] Permitir edição e exclusão
- [ ] Adicionar tags/categorias

**Estimativa**: 3-4 horas  
**Dependências**: Tela de tarefa implementada  
**Impacto**: Médio - Funcionalidade útil

---

## 🔧 Prioridade BAIXA - Semana 3-4

### 10. Upload e Gestão de PDFs ⭐

**Objetivo**: Permitir upload de PDFs personalizados pelo usuário.

**Tarefas**:
- [ ] Criar interface de upload
- [ ] Integrar com S3 (storagePut)
- [ ] Salvar metadados no banco
- [ ] Listar PDFs do usuário
- [ ] Permitir exclusão
- [ ] Visualizador de PDF integrado

**Estimativa**: 4-5 horas  
**Dependências**: Sistema de storage configurado  
**Impacto**: Baixo-Médio - Funcionalidade adicional

---

### 11. Histórico Detalhado Individualizado ⭐

**Objetivo**: Timeline completa de atividades do usuário.

**Tarefas**:
- [ ] Criar tabela `userActivityLog`
- [ ] Registrar todas as ações (tarefa concluída, nível up, etc)
- [ ] Criar tela de histórico
- [ ] Filtros por data, tipo de atividade
- [ ] Gráficos de evolução

**Estimativa**: 5-6 horas  
**Dependências**: Sistema de progresso funcionando  
**Impacto**: Baixo-Médio - Funcionalidade analítica

---

### 12. Painel Administrativo Completo ⭐

**Objetivo**: Interface para gerenciar trilhas, usuários e conteúdo.

**Tarefas**:
- [ ] Expandir página `/admin`
- [ ] CRUD de trilhas
- [ ] CRUD de estágios e tarefas
- [ ] Gerenciamento de usuários
- [ ] Atribuição de trilhas
- [ ] Visualização de métricas gerais

**Estimativa**: 6-8 horas  
**Dependências**: Sistema core completo  
**Impacto**: Médio - Facilita gestão

---

## 🌟 Funcionalidades Avançadas - Futuro

### 13. Sistema de Analogias Automáticas

**Objetivo**: IA gera analogias práticas para cada conceito.

**Tarefas**:
- [ ] Integrar com LLM (invokeLLM)
- [ ] Criar prompts para geração de analogias
- [ ] Armazenar analogias no banco
- [ ] Mostrar na interface de tarefa
- [ ] Permitir feedback (útil/não útil)

**Estimativa**: 8-10 horas  
**Impacto**: Alto - Diferencial pedagógico

---

### 14. Integração com NotebookLM

**Objetivo**: Usar NotebookLM como repositório de conhecimento.

**Tarefas**:
- [ ] Pesquisar API do NotebookLM
- [ ] Exportar PDFs para NotebookLM
- [ ] Sincronizar anotações
- [ ] Busca unificada

**Estimativa**: 10-12 horas  
**Impacto**: Médio - Integração externa

---

### 15. Exportação para Kindle

**Objetivo**: Converter conteúdo para formato .mobi/.epub.

**Tarefas**:
- [ ] Implementar geração de EPUB
- [ ] Converter para MOBI (Calibre)
- [ ] Botão de exportação
- [ ] Incluir progresso e anotações

**Estimativa**: 6-8 horas  
**Impacto**: Baixo - Funcionalidade extra

---

## 📊 Cronograma Sugerido

### Semana 1 (5-11 Dez)
- Dia 1-2: Tela de execução de tarefa
- Dia 3: Conectar progresso real
- Dia 4-5: Dashboard personalizado
- Dia 6: Bottom navigation + correções

### Semana 2 (12-18 Dez)
- Dia 1-2: Trilha 3 (APIs)
- Dia 3-4: Trilha 4 (GitHub)
- Dia 5-6: Sistema de anotações

### Semana 3-4 (19 Dez - 01 Jan)
- Upload de PDFs
- Histórico detalhado
- Painel administrativo
- Refinamentos e testes

---

## 🎯 Metas de Curto Prazo

1. **Até 10/12**: Sistema funcional para uso diário (executar e completar tarefas)
2. **Até 20/12**: 4 trilhas completas disponíveis
3. **Até 31/12**: Sistema de anotações e dashboard completo

---

## 🎓 Metas de Longo Prazo

1. **Q1 2026**: 11 trilhas completas
2. **Q2 2026**: Sistema de analogias IA
3. **Q3 2026**: App mobile nativo
4. **Q4 2026**: 50+ usuários ativos

---

## 📝 Notas Importantes

- **Foco no MVP**: Priorizar funcionalidades core antes de features avançadas
- **Teste com usuário real**: Moises deve testar cada feature antes de expandir
- **Documentação contínua**: Atualizar docs a cada checkpoint
- **Feedback iterativo**: Ajustar baseado no uso real do sistema

---

**Desenvolvido por**: MSC Consultoria  
**Próxima Revisão**: 11 de Dezembro de 2025
