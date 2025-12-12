 * Quizzes table - Stores validation quizzes for content
 */
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  contentId: int("contentId").notNull().references(() => content.id),
  question: text("question").notNull(),
  optionA: text("optionA").notNull(),
  optionB: text("optionB").notNull(),
  optionC: text("optionC"),
  optionD: text("optionD"),
  correctOption: mysqlEnum("correctOption", ["A", "B", "C", "D"]).notNull(),
  explanation: text("explanation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

/**
 * UserProgress table - Tracks user progress in tracks and content
 */
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  trackId: int("trackId").references(() => tracks.id),
  contentId: int("contentId").references(() => content.id),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).notNull().default("not_started"),
  quizScore: int("quizScore"),
  quizAttempts: int("quizAttempts").default(0),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * UserGamification table - Stores gamification data (XP, level, era, etc.)
 */
export const userGamification = mysqlTable("userGamification", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  xp: int("xp").notNull().default(0),
  level: int("level").notNull().default(1),
  gold: int("gold").notNull().default(0),
  currentEra: mysqlEnum("currentEra", [
    "idade_media",
    "renascimento",
    "revolucao_industrial",
    "era_moderna",
    "era_digital",
    "era_futura"
  ]).notNull().default("idade_media"),
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserGamification = typeof userGamification.$inferSelect;
export type InsertUserGamification = typeof userGamification.$inferInsert;

/**
 * Stages table - Estágios dentro de uma trilha (Trilha → Estágios → Tarefas)
 * Cada trilha é dividida em estágios que agrupam tarefas relacionadas
 */
export const stages = mysqlTable("stages", {
  id: int("id").autoincrement().primaryKey(),
  trackId: int("trackId").notNull().references(() => tracks.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: int("orderIndex").notNull(),
  estimatedHours: int("estimatedHours"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Stage = typeof stages.$inferSelect;
export type InsertStage = typeof stages.$inferInsert;

/**
 * Tasks table - Tarefas dentro de um estágio
 * Cada tarefa representa uma atividade específica a ser completada
 */
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  stageId: int("stageId").notNull().references(() => stages.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["reading", "video", "quiz", "project", "exercise"]).notNull(),
  orderIndex: int("orderIndex").notNull(),
  importanceIndex: int("importanceIndex").notNull().default(3), // 1-5 (1=baixa, 5=crítica)
  estimatedMinutes: int("estimatedMinutes"),
  contentId: int("contentId").references(() => content.id),
  quizId: int("quizId").references(() => quizzes.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
