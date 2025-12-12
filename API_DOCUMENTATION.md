# Documentação da API - MSC Sistema Educacional

## Visão Geral

O backend do Sistema Educacional MSC é construído com **tRPC**, proporcionando type-safety completa entre cliente e servidor. Todas as procedures estão organizadas em routers temáticos.

---

## Autenticação

O sistema utiliza **Manus OAuth** para autenticação. Após o login bem-sucedido, um cookie de sessão é criado automaticamente.

### Procedures de Autenticação

#### `auth.me`
- **Tipo**: Query (pública)
- **Descrição**: Retorna os dados do usuário autenticado atual
- **Retorno**: `User | null`

#### `auth.logout`
- **Tipo**: Mutation (pública)
- **Descrição**: Realiza logout do usuário, limpando o cookie de sessão
- **Retorno**: `{ success: boolean }`

---

## Conteúdo

Gerencia o acesso aos conteúdos educacionais (vídeos, PDFs, textos).

### `content.getAll`
- **Tipo**: Query (pública)
- **Descrição**: Retorna todos os conteúdos disponíveis
- **Retorno**: `Content[]`

### `content.getById`
- **Tipo**: Query (pública)
- **Input**: `{ id: number }`
- **Descrição**: Retorna um conteúdo específico pelo ID
- **Retorno**: `Content | undefined`

### `content.getByDomain`
- **Tipo**: Query (pública)
- **Input**: `{ domain: string }`
- **Descrição**: Retorna todos os conteúdos de um domínio específico (ex: "Programação", "Concursos")
- **Retorno**: `Content[]`

---

## Trilhas de Ensino

Gerencia as trilhas de aprendizado e seus módulos.

### `tracks.getAll`
- **Tipo**: Query (pública)
- **Descrição**: Retorna todas as trilhas disponíveis
- **Retorno**: `Track[]`

### `tracks.getById`
- **Tipo**: Query (pública)
- **Input**: `{ id: number }`
- **Descrição**: Retorna uma trilha específica pelo ID
- **Retorno**: `Track | undefined`

### `tracks.getModules`
- **Tipo**: Query (pública)
- **Input**: `{ trackId: number }`
- **Descrição**: Retorna todos os módulos de uma trilha, ordenados por `orderIndex`
- **Retorno**: `Module[]`

### `tracks.getModuleContent`
- **Tipo**: Query (pública)
- **Input**: `{ moduleId: number }`
- **Descrição**: Retorna todos os conteúdos de um módulo específico
- **Retorno**: `Content[]`

---

## Quizzes

Gerencia os quizzes de validação de conhecimento.

### `quiz.getByContentId`
- **Tipo**: Query (pública)
- **Input**: `{ contentId: number }`
- **Descrição**: Retorna todos os quizzes associados a um conteúdo
- **Retorno**: `Quiz[]`

---

## Progresso do Usuário

Gerencia o progresso individual do usuário nas trilhas e conteúdos. **Requer autenticação.**

### `progress.getMyProgress`
- **Tipo**: Query (protegida)
- **Descrição**: Retorna todo o progresso do usuário autenticado
- **Retorno**: `UserProgress[]`

### `progress.getMyProgressByTrack`
- **Tipo**: Query (protegida)
- **Input**: `{ trackId: number }`
- **Descrição**: Retorna o progresso do usuário em uma trilha específica
- **Retorno**: `UserProgress[]`

### `progress.updateProgress`
- **Tipo**: Mutation (protegida)
- **Input**:
  ```typescript
  {
    trackId?: number,
    contentId?: number,
    status: "not_started" | "in_progress" | "completed",
    quizScore?: number
  }
  ```
- **Descrição**: Atualiza o progresso do usuário em um conteúdo ou trilha
- **Retorno**: `{ success: boolean }`

---

## Gamificação

Gerencia o sistema de XP, níveis, ouro e eras do RPG. **Requer autenticação.**

### `gamification.getMyStats`
- **Tipo**: Query (protegida)
- **Descrição**: Retorna as estatísticas de gamificação do usuário (XP, nível, ouro, era atual). Inicializa automaticamente se não existir.
- **Retorno**: `UserGamification`

### `gamification.addXP`
- **Tipo**: Mutation (protegida)
- **Input**: `{ xp: number }`
- **Descrição**: Adiciona XP ao usuário e recalcula o nível automaticamente (100 XP por nível)
- **Retorno**: `{ success: boolean, newXP: number, newLevel: number }`

### `gamification.addGold`
- **Tipo**: Mutation (protegida)
- **Input**: `{ gold: number }`
- **Descrição**: Adiciona ouro ao usuário
- **Retorno**: `{ success: boolean, newGold: number }`

---

## Modelos de Dados

### User
```typescript
{
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}
```

### Content
```typescript
{
  id: number;
  title: string;
  description: string | null;
  type: "video" | "pdf" | "text" | "interactive";
  sourceUrl: string | null;
  sourceName: string | null;
  domain: string;
  topic: string;
  subTopic: string | null;
  difficulty: "iniciante" | "intermediario" | "avancado";
  durationSeconds: number | null;
  transcript: string | null;
  youtubeStartTime: number | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Track
```typescript
{
  id: number;
  title: string;
  description: string | null;
  domain: string;
  topic: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  estimatedHours: number | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Module
```typescript
{
  id: number;
  trackId: number;
  title: string;
  description: string | null;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Quiz
```typescript
{
  id: number;
  contentId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string | null;
  optionD: string | null;
  correctOption: "A" | "B" | "C" | "D";
  explanation: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### UserProgress
```typescript
{
  id: number;
  userId: number;
  trackId: number | null;
  contentId: number | null;
  status: "not_started" | "in_progress" | "completed";
  quizScore: number | null;
  quizAttempts: number;
  startedAt: Date | null;
  completedAt: Date | null;
  updatedAt: Date;
}
```

### UserGamification
```typescript
{
  id: number;
  userId: number;
  xp: number;
  level: number;
  gold: number;
  currentEra: "idade_media" | "renascimento" | "revolucao_industrial" | "era_moderna" | "era_digital" | "era_futura";
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Fluxo de Uso Típico

### Jornada do Usuário

1. **Login**: O usuário faz login via Manus OAuth
2. **Dashboard**: Acessa `/dashboard` e vê suas estatísticas (`gamification.getMyStats`) e trilhas disponíveis (`tracks.getAll`)
3. **Escolha de Trilha**: Seleciona uma trilha e visualiza seus módulos (`tracks.getModules`)
4. **Execução de Módulo**: 
   - Acessa o conteúdo do módulo (`tracks.getModuleContent`)
   - Consome o material (vídeo/PDF)
   - Responde ao quiz (`quiz.getByContentId`)
   - Submete as respostas e, se passar (≥70%), recebe XP e ouro
5. **Atualização de Progresso**: O sistema atualiza automaticamente:
   - `progress.updateProgress` marca o conteúdo como "completed"
   - `gamification.addXP` adiciona XP e recalcula o nível
   - `gamification.addGold` adiciona ouro
6. **Progressão**: O usuário avança para o próximo módulo e repete o ciclo

---

## Notas de Implementação

- **Type Safety**: Todos os tipos são inferidos automaticamente pelo tRPC. Use `trpc.*.useQuery` ou `trpc.*.useMutation` no frontend.
- **Superjson**: Datas são serializadas automaticamente como objetos `Date`, não como strings.
- **Procedures Protegidas**: Procedures marcadas como `protectedProcedure` exigem autenticação e injetam `ctx.user` automaticamente.
- **Cálculo de Nível**: A fórmula atual é `level = floor(xp / 100) + 1`. Cada nível requer 100 XP adicionais.
