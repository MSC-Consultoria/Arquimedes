_Este documento detalha a estrutura do sistema de gamificação e progressão para a plataforma educacional da MSC Consultoria. A gamificação é um pilar central do projeto, projetada para aumentar o engajamento, a motivação e a retenção do conhecimento dos alunos através de uma experiência imersiva e recompensadora, inspirada em jogos de RPG._

# Estruturação do Sistema de Gamificação e Progressão

## 1. Conceito Central: A Jornada do Conhecimento

A gamificação será construída em torno de uma narrativa central: **"A Jornada do Conhecimento através das Eras"**. O aluno não é apenas um estudante, mas um **Viajante do Tempo** que progride através de diferentes períodos históricos à medida que adquire novas habilidades e conhecimentos. A jornada começa na **Idade Média** e avança por eras como o Renascimento, a Revolução Industrial, a Era da Informação e o Futuro, cada uma representando um novo patamar de domínio intelectual.

### Elementos Narrativos

-   **Eras**: Cada era representa um grande marco de progresso e desbloqueia novos tipos de desafios, conteúdos e recompensas visuais.
-   **Missões Históricas**: As missões e tarefas estarão contextualizadas dentro da era atual, conectando o aprendizado a eventos e figuras históricas.
-   **Avatar Evolutivo**: O avatar do aluno evolui visualmente para refletir a era e o nível de conhecimento alcançado.

## 2. Sistema de Progressão

A progressão do aluno será medida por um sistema de **Níveis (Levels)** e pela transição entre as **Eras**.

### 2.1 Níveis (XP - Pontos de Experiência)

-   **Ganho de XP**: Os alunos ganharão Pontos de Experiência (XP) ao completar atividades como:
    -   Assistir a uma videoaula.
    -   Ler um PDF ou artigo.
    -   Completar um módulo de exercícios.
    -   Acertar questões em quizzes.
    -   Concluir uma Missão.
-   **Curva de Nível**: A quantidade de XP necessária para subir de nível seguirá uma curva exponencial, tornando os níveis iniciais rápidos e os níveis mais altos um desafio maior.
-   **Benefícios de Nível**: Subir de nível desbloqueia:
    -   Novas habilidades ou títulos para o avatar.
    -   Acesso a conteúdos de maior dificuldade.
    -   Recompensas cosméticas.

### 2.2 Progressão através das Eras

A transição entre as eras é o principal marco de progresso de longo prazo.

| Era | Requisito de Transição | Temática Visual e Narrativa |
| :--- | :--- | :--- |
| **Idade Média** | Início da jornada | Rústica, castelos, pergaminhos, guildas de aprendizes. |
| **Renascimento** | Nível 20 + Conclusão da Missão "O Despertar da Razão" | Arte, ciência, invenções, bibliotecas, exploração. |
| **Revolução Industrial** | Nível 40 + Conclusão da Missão "A Máquina do Progresso" | Fábricas, vapor, eletricidade, produção em massa de conhecimento. |
| **Era da Informação** | Nível 60 + Conclusão da Missão "A Rede Global" | Computadores, internet, programação, globalização. |
| **Era do Futuro** | Nível 80 + Conclusão da Missão "Singularidade" | Inteligência Artificial, exploração espacial, biotecnologia. |

## 3. Sistema de Missões e Tarefas

As missões são o motor do engajamento diário e semanal, guiando o aluno através do conteúdo de forma estruturada.

### Tipos de Missões

-   **Missões Principais (Quests da Era)**: Uma cadeia de missões que guia o aluno pela narrativa principal da era atual. A conclusão da última missão principal de uma era é um pré-requisito para avançar para a próxima.
    -   *Exemplo*: Na Idade Média, uma missão principal pode ser "Forje sua primeira ferramenta: Aprenda os fundamentos da Lógica de Programação".
-   **Missões de Domínio (Sub-Quests)**: Focadas em aprofundar o conhecimento em um tópico específico.
    -   *Exemplo*: "Domine a Alquimia dos Dados: Complete o módulo de Estruturas de Dados em Python".
-   **Missões Diárias/Semanais**: Tarefas recorrentes para incentivar o estudo contínuo.
    -   *Exemplo*: "Pratique sua esgrima verbal: Responda 10 questões de Inglês" ou "Explore novos territórios: Assista a 3 vídeos sobre um tópico que você ainda não estudou".

### Estrutura de uma Missão

```json
{
  "mission_id": "quest-001",
  "title": "Forje sua Primeira Ferramenta",
  "description": "Todo grande artesão precisa de suas ferramentas. Aprenda os fundamentos da lógica de programação para construir as bases do seu conhecimento.",
  "type": "main_quest",
  "era": "idade_media",
  "objectives": [
    { "task": "complete_module", "module_id": "logica-prog-01", "description": "Complete o módulo 'O que é um algoritmo?'" },
    { "task": "pass_quiz", "quiz_id": "quiz-logica-01", "min_score": 70, "description": "Passe no quiz de algoritmos com 70% de acerto" }
  ],
  "rewards": {
    "xp": 500,
    "gold": 100,
    "items": [ { "item_id": "avatar-item-martelo-aprendiz", "quantity": 1 } ]
  }
}
```

## 4. Sistema de Recompensas e Economia Interna

Um sistema de recompensas bem projetado é crucial para manter a motivação. A economia interna será baseada em uma moeda virtual, que chamaremos de **"Dracmas do Conhecimento" (ou Ouro)**.

### Moeda Virtual (Ouro)

-   **Como Ganhar**: O Ouro é ganho ao completar missões, passar em testes com altas pontuações e manter sequências de estudo (streaks).
-   **Como Gastar**: O Ouro pode ser usado na **"Loja do Sábio"** para comprar:
    -   **Itens Cosméticos para o Avatar**: Roupas, acessórios, armaduras e itens temáticos de cada era.
    -   **Títulos e Insígnias**: Para exibir no perfil do usuário (ex: "Mestre em Java", "Explorador da História").
    -   **Boosts Temporários**: Itens que concedem bônus por um tempo limitado (ex: "Poção de Foco" - ganho de XP em dobro por 1 hora).

### Conquistas (Achievements)

Conquistas são medalhas permanentes que marcam feitos importantes na jornada do aluno. Elas não oferecem vantagens de jogo, apenas reconhecimento.

-   *Exemplo*: "Poliglota" (complete um curso em 3 idiomas diferentes), "Mestre dos Concursos" (seja aprovado em simulações da OAB e DETRAN), "Commit #100" (complete 100 exercícios de GitHub).

## 5. Avatar e Personalização

O avatar é a representação visual do aluno no mundo do jogo, e sua evolução é um reflexo direto do progresso do usuário.

### Componentes do Avatar

-   **Aparência Base**: O aluno pode personalizar características básicas como cabelo, tom de pele, etc.
-   **Equipamentos e Roupas**: Itens comprados com Ouro ou ganhos em missões. Os equipamentos podem ser puramente cosméticos ou indicar o domínio em certas áreas (ex: um "Manto do Arquiteto de Software" para quem domina padrões de projeto).
-   **Itens da Era**: Cada era desbloqueia um conjunto de itens temáticos, permitindo que o avatar reflita a progressão na jornada.

## 6. Próximos Passos de Implementação

1.  **Modelagem de Dados**: Detalhar o esquema do banco de dados para armazenar todas as entidades da gamificação (Missões, Recompensas, Inventário do Jogador, Estado do Avatar).
2.  **Desenvolvimento do Serviço de Gamificação**: Criar o microserviço responsável por toda a lógica de XP, níveis, missões e recompensas.
3.  **Design da Interface**: Projetar as telas onde o usuário interagirá com os elementos de gamificação (diário de missões, perfil do avatar, loja).
4.  **Balanceamento da Economia**: Definir cuidadosamente as taxas de ganho de XP e Ouro para garantir uma progressão desafiadora, mas justa e recompensadora.

_Este sistema de gamificação transformará o aprendizado em uma aventura épica, incentivando os alunos a se aprofundarem no conhecimento de forma contínua e engajada._
