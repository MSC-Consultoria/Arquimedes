-- Script simplificado para popular banco com trilhas de Naiara

-- Trilha 1: Português Básico
INSERT INTO tracks (title, description, domain, topic, difficulty, estimatedHours) 
VALUES ('Português Básico', 'Aprenda os fundamentos da língua portuguesa', 'Educação Básica', 'Português', 'iniciante', 20);

SET @track1_id = LAST_INSERT_ID();

-- Estágios da Trilha 1
INSERT INTO stages (trackId, title, description, orderIndex) VALUES
(@track1_id, 'Alfabeto e Sons', 'Domine o alfabeto, vogais e consoantes', 1),
(@track1_id, 'Gramática Fundamental', 'Aprenda substantivos, adjetivos e verbos', 2),
(@track1_id, 'Leitura e Interpretação', 'Desenvolva habilidades de leitura', 3);

-- Pegar IDs dos estágios
SET @stage1_1 = (SELECT id FROM stages WHERE trackId = @track1_id AND orderIndex = 1);
SET @stage1_2 = (SELECT id FROM stages WHERE trackId = @track1_id AND orderIndex = 2);
SET @stage1_3 = (SELECT id FROM stages WHERE trackId = @track1_id AND orderIndex = 3);

-- Tarefas Estágio 1.1
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage1_1, 'Alfabeto e Pronúncia', 'Aprenda as 26 letras', 'video', 1, 10, 30, 50),
(@stage1_1, 'Vogais e Consoantes', 'Entenda a diferença', 'video', 2, 9, 30, 50),
(@stage1_1, 'Sílabas e Separação', 'Aprenda a separar palavras', 'video', 3, 8, 30, 50),
(@stage1_1, 'Juntar Sílabas', 'Pratique juntar sílabas', 'video', 4, 7, 30, 50),
(@stage1_1, 'Prática de Leitura', 'Leia palavras simples', 'video', 5, 8, 30, 50);

-- Tarefas Estágio 1.2
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage1_2, 'Substantivos', 'Aprenda substantivos', 'video', 1, 9, 35, 60),
(@stage1_2, 'Adjetivos', 'Entenda adjetivos', 'video', 2, 8, 35, 60),
(@stage1_2, 'Verbos Básicos', 'Conheça os verbos', 'video', 3, 10, 35, 60),
(@stage1_2, 'Artigos', 'Aprenda artigos', 'video', 4, 7, 35, 60),
(@stage1_2, 'Pronomes', 'Entenda pronomes', 'video', 5, 8, 35, 60),
(@stage1_2, 'Prática de Gramática', 'Exercite gramática', 'video', 6, 9, 35, 60);

-- Tarefas Estágio 1.3
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage1_3, 'Leitura de Textos Simples', 'Pratique leitura', 'video', 1, 9, 40, 70),
(@stage1_3, 'Interpretação de Texto', 'Aprenda a entender', 'video', 2, 10, 40, 70),
(@stage1_3, 'Pontuação Básica', 'Conheça pontuação', 'video', 3, 8, 40, 70),
(@stage1_3, 'Escrita de Frases', 'Aprenda a escrever', 'video', 4, 9, 40, 70),
(@stage1_3, 'Prática de Escrita', 'Exercite escrita', 'video', 5, 10, 40, 70);

-- Trilha 2: Matemática Básica
INSERT INTO tracks (title, description, domain, topic, difficulty, estimatedHours) 
VALUES ('Matemática Básica', 'Domine operações básicas e porcentagem', 'Educação Básica', 'Matemática', 'iniciante', 22);

SET @track2_id = LAST_INSERT_ID();

-- Estágios da Trilha 2
INSERT INTO stages (trackId, title, description, orderIndex) VALUES
(@track2_id, 'Operações Básicas', 'Aprenda adição, subtração, multiplicação e divisão', 1),
(@track2_id, 'Regra de Três e Porcentagem', 'Domine proporções e porcentagem', 2),
(@track2_id, 'Frações e Decimais', 'Entenda frações e decimais', 3);

-- Pegar IDs dos estágios
SET @stage2_1 = (SELECT id FROM stages WHERE trackId = @track2_id AND orderIndex = 1);
SET @stage2_2 = (SELECT id FROM stages WHERE trackId = @track2_id AND orderIndex = 2);
SET @stage2_3 = (SELECT id FROM stages WHERE trackId = @track2_id AND orderIndex = 3);

-- Tarefas Estágio 2.1
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage2_1, 'Números e Contagem', 'Aprenda números 0-100', 'video', 1, 10, 35, 60),
(@stage2_1, 'Adição (Soma)', 'Domine adição', 'video', 2, 10, 35, 60),
(@stage2_1, 'Subtração', 'Aprenda subtração', 'video', 3, 10, 35, 60),
(@stage2_1, 'Multiplicação', 'Entenda multiplicação', 'video', 4, 10, 35, 60),
(@stage2_1, 'Divisão', 'Aprenda divisão', 'video', 5, 10, 35, 60),
(@stage2_1, 'Prática de Operações', 'Exercite operações', 'video', 6, 9, 35, 60);

-- Tarefas Estágio 2.2
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage2_2, 'Conceito de Proporção', 'Entenda proporções', 'video', 1, 8, 40, 70),
(@stage2_2, 'Regra de Três Simples', 'Aprenda regra de três', 'video', 2, 10, 40, 70),
(@stage2_2, 'Introdução à Porcentagem', 'Entenda porcentagem', 'video', 3, 9, 40, 70),
(@stage2_2, 'Cálculo de Porcentagem', 'Calcule porcentagens', 'video', 4, 10, 40, 70),
(@stage2_2, 'Aplicações Práticas', 'Use em situações reais', 'video', 5, 10, 40, 70);

-- Tarefas Estágio 2.3
INSERT INTO tasks (stageId, title, description, type, orderIndex, importanceIndex, estimatedMinutes, xpReward) VALUES
(@stage2_3, 'Conceito de Fração', 'Entenda frações', 'video', 1, 9, 45, 80),
(@stage2_3, 'Operações com Frações', 'Opere com frações', 'video', 2, 10, 45, 80),
(@stage2_3, 'Números Decimais', 'Entenda decimais', 'video', 3, 9, 45, 80),
(@stage2_3, 'Operações com Decimais', 'Opere com decimais', 'video', 4, 10, 45, 80),
(@stage2_3, 'Prática Geral', 'Exercite tudo', 'video', 5, 10, 45, 80);

SELECT 'Trilhas criadas com sucesso!' AS resultado;
