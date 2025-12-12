/**
 * Script para popular o banco de dados com as 2 trilhas iniciais:
 * - Trilha 1: Inglês Técnico para Programadores
 * - Trilha 2: N8N - Automação de Workflows
 * 
 * Cada trilha contém 3 estágios com múltiplas tarefas
 */

import { drizzle } from 'drizzle-orm/mysql2';
import { tracks, stages, tasks, content, users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

// ============================================
// TRILHA 1: INGLÊS TÉCNICO PARA PROGRAMADORES
// ============================================

const trilha1 = {
  title: "Inglês Técnico para Programadores",
  description: "Domine o inglês essencial para ler documentação, participar de code reviews e se comunicar em equipes internacionais. Do básico ao avançado, com foco prático em situações reais do dia a dia de um desenvolvedor.",
  domain: "Linguagens",
  topic: "Inglês",
  difficulty: "iniciante",
  estimatedHours: 20,
};

const estagios1 = [
  {
    title: "Fundamentos de Inglês Técnico",
    description: "Vocabulário básico de programação, termos técnicos essenciais, leitura de documentação simples e compreensão de mensagens de erro.",
    orderIndex: 1,
    estimatedHours: 7,
    tarefas: [
      {
        title: "Assistir: Inglês para Programação - Aula 1",
        description: "Vídeo introdutório sobre a importância do inglês na programação e primeiros passos.",
        type: "video",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 45,
        sourceUrl: "https://www.youtube.com/watch?v=CIQ2l8t5V8s",
        sourceName: "YouTube - Inglês para Dev"
      },
      {
        title: "Ler: Basic English For Computing (Capítulos 1-5)",
        description: "Leitura dos primeiros capítulos focados em vocabulário básico de computação.",
        type: "reading",
        orderIndex: 2,
        importanceIndex: 5,
        estimatedMinutes: 90,
        sourceUrl: "https://turingsebook.com/sites/default/files/ebooks/Basic%20English%20For%20Computing.pdf",
        sourceName: "Turing Books - Basic English For Computing"
      },
      {
        title: "Estudar: Inglês para Informática (MEC) - Unidade 1",
        description: "Material do Ministério da Educação focado em inglês técnico para informática.",
        type: "reading",
        orderIndex: 3,
        importanceIndex: 5,
        estimatedMinutes: 60,
        sourceUrl: "https://redeetec.mec.gov.br/images/stories/pdf/eixo_infor_comun/tec_man_sup/081112_ingles_p_inf.pdf",
        sourceName: "MEC - Inglês para Informática"
      },
      {
        title: "Praticar: Vocabulário Básico de Programação",
        description: "Exercícios práticos com termos essenciais: function, variable, loop, array, object, etc.",
        type: "exercise",
        orderIndex: 4,
        importanceIndex: 4,
        estimatedMinutes: 30,
      },
      {
        title: "Quiz: Fundamentos de Inglês Técnico",
        description: "Avaliação dos conceitos básicos aprendidos no estágio 1.",
        type: "quiz",
        orderIndex: 5,
        importanceIndex: 5,
        estimatedMinutes: 15,
      }
    ]
  },
  {
    title: "Comunicação Técnica",
    description: "Code reviews em inglês, participação em stand-up meetings, discussão de tendências tech, escrita de commits e pull requests.",
    orderIndex: 2,
    estimatedHours: 8,
    tarefas: [
      {
        title: "Assistir: English for Programmers - Listening Practice",
        description: "30 minutos de prática de listening com conversas sobre progresso de tarefas.",
        type: "video",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 30,
        sourceUrl: "https://www.youtube.com/watch?v=IpwdY54SaZE",
        sourceName: "YouTube - English for Programmers"
      },
      {
        title: "Ler: Professional English for Software Developers (Parte 1)",
        description: "Capítulos sobre comunicação em equipes de desenvolvimento.",
        type: "reading",
        orderIndex: 2,
        importanceIndex: 5,
        estimatedMinutes: 90,
        sourceUrl: "https://uust.ru/media/uploads/MainSite/Ob%20universitete/Izdateli/El_izd/2022%E2%80%90117.pdf",
        sourceName: "Professional English for Software Developers"
      },
      {
        title: "Estudar: Talaera's English Guide for Developers",
        description: "Guia focado em desafios de comunicação para desenvolvedores não-nativos.",
        type: "reading",
        orderIndex: 3,
        importanceIndex: 4,
        estimatedMinutes: 60,
        sourceUrl: "https://cdn2.hubspot.net/hubfs/4586384/C020-Talaera%20English%20Guide%20for%20Software%20Developers%20Download.pdf",
        sourceName: "Talaera - English Guide for Developers"
      },
      {
        title: "Praticar: Escrever Commits e PRs em Inglês",
        description: "Exercício prático de escrita de mensagens de commit e descrições de pull requests.",
        type: "exercise",
        orderIndex: 4,
        importanceIndex: 5,
        estimatedMinutes: 45,
      },
      {
        title: "Projeto: Participar de Code Review Simulado",
        description: "Simular participação em code review, dando e recebendo feedback em inglês.",
        type: "project",
        orderIndex: 5,
        importanceIndex: 4,
        estimatedMinutes: 60,
      },
      {
        title: "Quiz: Comunicação Técnica",
        description: "Avaliação sobre comunicação em ambientes de desenvolvimento.",
        type: "quiz",
        orderIndex: 6,
        importanceIndex: 5,
        estimatedMinutes: 15,
      }
    ]
  },
  {
    title: "Inglês Avançado para Desenvolvedores",
    description: "Escrita de documentação técnica, apresentações técnicas, entrevistas técnicas, negociação e liderança técnica em inglês.",
    orderIndex: 3,
    estimatedHours: 5,
    tarefas: [
      {
        title: "Estudar: Google Technical Writing Course",
        description: "Curso oficial do Google sobre escrita de documentação técnica.",
        type: "reading",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 120,
        sourceUrl: "https://developers.google.com/tech-writing",
        sourceName: "Google Developers - Technical Writing"
      },
      {
        title: "Assistir: Learning English for Developers - Everything I Learned",
        description: "Guia completo sobre aprendizado de inglês para desenvolvedores.",
        type: "video",
        orderIndex: 2,
        importanceIndex: 4,
        estimatedMinutes: 30,
        sourceUrl: "https://www.youtube.com/watch?v=htB-K_lZnl4",
        sourceName: "YouTube - Learning English for Developers"
      },
      {
        title: "Projeto: Escrever Documentação Técnica Completa",
        description: "Criar documentação técnica completa de um projeto fictício em inglês.",
        type: "project",
        orderIndex: 3,
        importanceIndex: 5,
        estimatedMinutes: 90,
      },
      {
        title: "Praticar: Entrevista Técnica em Inglês",
        description: "Simulação de entrevista técnica com perguntas comuns em inglês.",
        type: "exercise",
        orderIndex: 4,
        importanceIndex: 4,
        estimatedMinutes: 45,
      },
      {
        title: "Quiz Final: Inglês Avançado",
        description: "Avaliação final da trilha de Inglês Técnico.",
        type: "quiz",
        orderIndex: 5,
        importanceIndex: 5,
        estimatedMinutes: 20,
      }
    ]
  }
];

// ============================================
// TRILHA 2: N8N - AUTOMAÇÃO DE WORKFLOWS
// ============================================

const trilha2 = {
  title: "N8N - Automação de Workflows",
  description: "Aprenda a automatizar processos e integrar sistemas usando N8N, a ferramenta low-code mais poderosa do mercado. Do básico ao avançado, com projetos práticos e casos de uso reais.",
  domain: "Ferramentas",
  topic: "Automação",
  difficulty: "iniciante",
  estimatedHours: 18,
};

const estagios2 = [
  {
    title: "Fundamentos de N8N",
    description: "O que é n8n, instalação, interface, tipos de nodes, triggers, execuções e primeira automação simples.",
    orderIndex: 1,
    estimatedHours: 6,
    tarefas: [
      {
        title: "Assistir: N8N para Iniciantes - Primeira Automação",
        description: "Vídeo completo sobre N8N do absoluto zero, perfeito para quem nunca usou.",
        type: "video",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 60,
        sourceUrl: "https://www.youtube.com/watch?v=C0SDjqmctfU",
        sourceName: "YouTube - N8N para Iniciantes"
      },
      {
        title: "Ler: The Ultimate n8n Starter Kit (2025)",
        description: "Guia completo sobre n8n, detalhando importância, capacidades e setup.",
        type: "reading",
        orderIndex: 2,
        importanceIndex: 5,
        estimatedMinutes: 90,
        sourceUrl: "https://www.scribd.com/document/828836404/The-Ultimate-n8n-Starter-Kit-2025",
        sourceName: "Scribd - Ultimate n8n Starter Kit"
      },
      {
        title: "Estudar: Documentação Oficial - Level One",
        description: "Curso estruturado de introdução à plataforma n8n.",
        type: "reading",
        orderIndex: 3,
        importanceIndex: 5,
        estimatedMinutes: 60,
        sourceUrl: "https://docs.n8n.io/courses/level-one/",
        sourceName: "n8n Docs - Level One"
      },
      {
        title: "Praticar: Instalar N8N e Criar Hello World",
        description: "Instalação do n8n e criação do primeiro workflow simples.",
        type: "exercise",
        orderIndex: 4,
        importanceIndex: 5,
        estimatedMinutes: 45,
      },
      {
        title: "Projeto: Automação de Envio de Email",
        description: "Criar workflow que envia email automaticamente com base em trigger.",
        type: "project",
        orderIndex: 5,
        importanceIndex: 4,
        estimatedMinutes: 30,
      },
      {
        title: "Quiz: Fundamentos de N8N",
        description: "Avaliação dos conceitos básicos de n8n.",
        type: "quiz",
        orderIndex: 6,
        importanceIndex: 5,
        estimatedMinutes: 15,
      }
    ]
  },
  {
    title: "Automações Intermediárias",
    description: "APIs e Webhooks, automação de WhatsApp, geração de PDFs, tratamento de erros, loops e condicionais.",
    orderIndex: 2,
    estimatedHours: 8,
    tarefas: [
      {
        title: "Assistir: Curso N8N Gratuito Para Iniciantes 2025",
        description: "Curso completo sobre APIs, Webhooks e automação de WhatsApp.",
        type: "video",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 90,
        sourceUrl: "https://www.youtube.com/watch?v=-Ka4YKW7RwM",
        sourceName: "YouTube - Curso N8N Gratuito"
      },
      {
        title: "Assistir: Sua Primeira Automação de WhatsApp em 1h",
        description: "Tutorial prático de automação de WhatsApp com n8n.",
        type: "video",
        orderIndex: 2,
        importanceIndex: 5,
        estimatedMinutes: 60,
        sourceUrl: "https://www.youtube.com/watch?v=qSwsS3FHKRk",
        sourceName: "YouTube - Automação WhatsApp"
      },
      {
        title: "Ler: How to Automate PDF Generation in n8n",
        description: "Guia completo para automatizar geração de PDFs (invoices, relatórios).",
        type: "reading",
        orderIndex: 3,
        importanceIndex: 4,
        estimatedMinutes: 45,
        sourceUrl: "https://pdfbolt.com/blog/n8n-pdf-automation-guide",
        sourceName: "PDFBolt - N8N PDF Automation"
      },
      {
        title: "Projeto: Bot de Atendimento no WhatsApp",
        description: "Criar chatbot automatizado que responde perguntas frequentes.",
        type: "project",
        orderIndex: 4,
        importanceIndex: 5,
        estimatedMinutes: 120,
      },
      {
        title: "Projeto: Gerador Automático de Relatórios em PDF",
        description: "Sistema que gera relatórios em PDF automaticamente com dados atualizados.",
        type: "project",
        orderIndex: 5,
        importanceIndex: 4,
        estimatedMinutes: 90,
      },
      {
        title: "Quiz: Automações Intermediárias",
        description: "Avaliação sobre APIs, Webhooks e automações complexas.",
        type: "quiz",
        orderIndex: 6,
        importanceIndex: 5,
        estimatedMinutes: 15,
      }
    ]
  },
  {
    title: "Workflows Avançados e IA",
    description: "Workflows de IA, integração com LLMs, agentes autônomos, deploy e escalabilidade.",
    orderIndex: 3,
    estimatedHours: 4,
    tarefas: [
      {
        title: "Estudar: Build an AI Workflow in n8n",
        description: "Tutorial oficial sobre construção de workflows de IA com n8n.",
        type: "reading",
        orderIndex: 1,
        importanceIndex: 5,
        estimatedMinutes: 60,
        sourceUrl: "https://docs.n8n.io/advanced-ai/intro-tutorial/",
        sourceName: "n8n Docs - AI Workflow Tutorial"
      },
      {
        title: "Ler: The Ultimate Guide to Deploying N8N",
        description: "Livro completo (550+ páginas) sobre deploy e produção de n8n.",
        type: "reading",
        orderIndex: 2,
        importanceIndex: 4,
        estimatedMinutes: 90,
        sourceUrl: "https://www.reddit.com/r/n8n/comments/1kfu0ir/free_book_the_ultimate_guide_to_deploying_n8n/",
        sourceName: "Reddit - Ultimate Guide to Deploying N8N"
      },
      {
        title: "Projeto: Agente de IA para Análise de Feedback",
        description: "Criar IA que analisa feedbacks de clientes e categoriza automaticamente.",
        type: "project",
        orderIndex: 3,
        importanceIndex: 5,
        estimatedMinutes: 120,
      },
      {
        title: "Projeto Final: Sistema de Automação Completo",
        description: "Criar sistema completo de automação integrando múltiplas ferramentas.",
        type: "project",
        orderIndex: 4,
        importanceIndex: 5,
        estimatedMinutes: 150,
      },
      {
        title: "Quiz Final: N8N Avançado",
        description: "Avaliação final da trilha de N8N.",
        type: "quiz",
        orderIndex: 5,
        importanceIndex: 5,
        estimatedMinutes: 20,
      }
    ]
  }
];

// ============================================
// FUNÇÃO PRINCIPAL DE SEED
// ============================================

async function seedTracks() {
  console.log('🌱 Iniciando seed de trilhas...\n');

  try {
    // ===== TRILHA 1: INGLÊS TÉCNICO =====
    console.log('📚 Criando Trilha 1: Inglês Técnico para Programadores...');
    const [track1] = await db.insert(tracks).values(trilha1).$returningId();
    console.log(`   ✅ Trilha criada com ID: ${track1.id}\n`);

    for (const estagioData of estagios1) {
      const { tarefas, ...estagioInfo } = estagioData;
      console.log(`   📖 Criando Estágio: ${estagioInfo.title}...`);
      
      const [stage] = await db.insert(stages).values({
        ...estagioInfo,
        trackId: track1.id
      }).$returningId();
      
      console.log(`      ✅ Estágio criado com ID: ${stage.id}`);

      for (const tarefaData of tarefas) {
        const { sourceUrl, sourceName, ...tarefaInfo } = tarefaData;
        
        // Criar conteúdo se houver sourceUrl
        let contentId = null;
        if (sourceUrl) {
          const [contentItem] = await db.insert(content).values({
            title: tarefaData.title,
            description: tarefaData.description,
            type: tarefaData.type === 'video' ? 'video' : tarefaData.type === 'reading' ? 'pdf' : 'text',
            sourceUrl: sourceUrl,
            sourceName: sourceName,
            domain: trilha1.domain,
            topic: trilha1.topic,
            subTopic: estagioInfo.title,
            difficulty: trilha1.difficulty,
            durationSeconds: tarefaData.estimatedMinutes * 60,
          }).$returningId();
          contentId = contentItem.id;
        }

        await db.insert(tasks).values({
          ...tarefaInfo,
          stageId: stage.id,
          contentId: contentId,
        });
        
        console.log(`         ✓ Tarefa: ${tarefaInfo.title}`);
      }
    }

    // ===== TRILHA 2: N8N =====
    console.log('\n🔧 Criando Trilha 2: N8N - Automação de Workflows...');
    const [track2] = await db.insert(tracks).values(trilha2).$returningId();
    console.log(`   ✅ Trilha criada com ID: ${track2.id}\n`);

    for (const estagioData of estagios2) {
      const { tarefas, ...estagioInfo } = estagioData;
      console.log(`   📖 Criando Estágio: ${estagioInfo.title}...`);
      
      const [stage] = await db.insert(stages).values({
        ...estagioInfo,
        trackId: track2.id
      }).$returningId();
      
      console.log(`      ✅ Estágio criado com ID: ${stage.id}`);

      for (const tarefaData of tarefas) {
        const { sourceUrl, sourceName, ...tarefaInfo } = tarefaData;
        
        // Criar conteúdo se houver sourceUrl
        let contentId = null;
        if (sourceUrl) {
          const [contentItem] = await db.insert(content).values({
            title: tarefaData.title,
            description: tarefaData.description,
            type: tarefaData.type === 'video' ? 'video' : tarefaData.type === 'reading' ? 'pdf' : 'text',
            sourceUrl: sourceUrl,
            sourceName: sourceName,
            domain: trilha2.domain,
            topic: trilha2.topic,
            subTopic: estagioInfo.title,
            difficulty: trilha2.difficulty,
            durationSeconds: tarefaData.estimatedMinutes * 60,
          }).$returningId();
          contentId = contentItem.id;
        }

        await db.insert(tasks).values({
          ...tarefaInfo,
          stageId: stage.id,
          contentId: contentId,
        });
        
        console.log(`         ✓ Tarefa: ${tarefaInfo.title}`);
      }
    }

    console.log('\n✅ Seed de trilhas concluído com sucesso!');
    console.log('\n📊 Resumo:');
    console.log(`   • 2 trilhas criadas`);
    console.log(`   • 6 estágios criados (3 por trilha)`);
    console.log(`   • 28 tarefas criadas`);
    console.log(`   • Conteúdos vinculados com URLs reais`);
    
  } catch (error) {
    console.error('❌ Erro ao fazer seed de trilhas:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedTracks();
