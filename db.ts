export async function getContentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { content } = await import("../drizzle/schema");
  const result = await db.select().from(content).where(eq(content.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getContentByDomain(domain: string) {
  const db = await getDb();
  if (!db) return [];
  const { content } = await import("../drizzle/schema");
  return await db.select().from(content).where(eq(content.domain, domain));
}

// ========== Track Queries ==========

export async function getAllTracks() {
  const db = await getDb();
  if (!db) return [];
  const { tracks } = await import("../drizzle/schema");
  return await db.select().from(tracks);
}

export async function getTrackById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { tracks } = await import("../drizzle/schema");
  const result = await db.select().from(tracks).where(eq(tracks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getModulesByTrackId(trackId: number) {
  const db = await getDb();
  if (!db) return [];
  const { modules } = await import("../drizzle/schema");
  return await db.select().from(modules).where(eq(modules.trackId, trackId)).orderBy(modules.orderIndex);
}

export async function getContentByModuleId(moduleId: number) {
  const db = await getDb();
  if (!db) return [];
  const { moduleContent, content } = await import("../drizzle/schema");
  const result = await db
    .select({ content, orderIndex: moduleContent.orderIndex })
    .from(moduleContent)
    .innerJoin(content, eq(moduleContent.contentId, content.id))
    .where(eq(moduleContent.moduleId, moduleId))
    .orderBy(moduleContent.orderIndex);
  return result.map(r => r.content);
}

// ========== Quiz Queries ==========

export async function getQuizzesByContentId(contentId: number) {
  const db = await getDb();
  if (!db) return [];
  const { quizzes } = await import("../drizzle/schema");
  return await db.select().from(quizzes).where(eq(quizzes.contentId, contentId));
}

// ========== User Progress Queries ==========

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { userProgress } = await import("../drizzle/schema");
  return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function getUserProgressByTrack(userId: number, trackId: number) {
  const db = await getDb();
  if (!db) return [];
  const { userProgress } = await import("../drizzle/schema");
  return await db.select().from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.trackId, trackId)));
}

export async function upsertUserProgress(progress: any) {
  const db = await getDb();
  if (!db) return;
  const { userProgress } = await import("../drizzle/schema");
  await db.insert(userProgress).values(progress).onDuplicateKeyUpdate({ set: progress });
}

// ========== User Gamification Queries ==========

export async function getUserGamification(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { userGamification } = await import("../drizzle/schema");
  const result = await db.select().from(userGamification).where(eq(userGamification.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function initializeUserGamification(userId: number) {
  const db = await getDb();
  if (!db) return;
  const { userGamification } = await import("../drizzle/schema");
  await db.insert(userGamification).values({
    userId,
    xp: 0,
    level: 1,
    gold: 0,
    currentEra: "idade_media",
  }).onDuplicateKeyUpdate({ set: { userId } });
}

export async function updateUserGamification(userId: number, updates: any) {
  const db = await getDb();
  if (!db) return;
  const { userGamification } = await import("../drizzle/schema");
  await db.update(userGamification).set(updates).where(eq(userGamification.userId, userId));
}


// ========== Stages Queries ==========

export async function getStagesByTrackId(trackId: number) {
  const db = await getDb();
  if (!db) return [];
  const { stages } = await import("../drizzle/schema");
  return await db.select().from(stages).where(eq(stages.trackId, trackId));
}

export async function getStageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { stages } = await import("../drizzle/schema");
  const result = await db.select().from(stages).where(eq(stages.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ========== Tasks Queries ==========

export async function getTasksByStageId(stageId: number) {
  const db = await getDb();
  if (!db) return [];
  const { tasks } = await import("../drizzle/schema");
  return await db.select().from(tasks).where(eq(tasks.stageId, stageId));
}

export async function getTaskById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { tasks } = await import("../drizzle/schema");
  const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}
