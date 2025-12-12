import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Content router
  content: router({
    getAll: publicProcedure.query(async () => {
      const { getAllContent } = await import("./db");
      return await getAllContent();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getContentById } = await import("./db");
      return await getContentById(input.id);
    }),
    getByDomain: publicProcedure.input(z.object({ domain: z.string() })).query(async ({ input }) => {
      const { getContentByDomain } = await import("./db");
      return await getContentByDomain(input.domain);
    }),
  }),

  // Tracks router
  tracks: router({
    getAll: publicProcedure.query(async () => {
      const { getAllTracks } = await import("./db");
      return await getAllTracks();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getTrackById } = await import("./db");
      return await getTrackById(input.id);
    }),
    getModules: publicProcedure.input(z.object({ trackId: z.number() })).query(async ({ input }) => {
      const { getModulesByTrackId } = await import("./db");
      return await getModulesByTrackId(input.trackId);
    }),
    getModuleContent: publicProcedure.input(z.object({ moduleId: z.number() })).query(async ({ input }) => {
      const { getContentByModuleId } = await import("./db");
      return await getContentByModuleId(input.moduleId);
    }),
    // New: Get stages for a track
    getStages: publicProcedure.input(z.object({ trackId: z.number() })).query(async ({ input }) => {
      const { getStagesByTrackId } = await import("./db");
      return await getStagesByTrackId(input.trackId);
    }),
    getTasks: publicProcedure.input(z.object({ trackId: z.number() })).query(async ({ input }) => {
      const { getTasksByTrackId } = await import("./db");
      return await getTasksByTrackId(input.trackId);
    }),
  }),
  
  // Stages router
  stages: router({
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getStageById } = await import("./db");
      return await getStageById(input.id);
    }),
    getTasks: publicProcedure.input(z.object({ stageId: z.number() })).query(async ({ input }) => {
      const { getTasksByStageId } = await import("./db");
      return await getTasksByStageId(input.stageId);
    }),
  }),
  
  // Tasks router
  tasks: router({
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getTaskById } = await import("./db");
      return await getTaskById(input.id);
    }),
    complete: protectedProcedure.input(z.object({ taskId: z.number(), score: z.number().optional() })).mutation(async ({ ctx, input }) => {
      const { completeTask } = await import("./db");
      const result = await completeTask(ctx.user.id, input.taskId, input.score);
      return result;
    }),
    getMyProgress: protectedProcedure.input(z.object({ taskId: z.number() })).query(async ({ ctx, input }) => {
      const { getUserTaskProgress } = await import("./db");
      return await getUserTaskProgress(ctx.user.id, input.taskId);
    }),
  }),

  // Quiz router
  quiz: router({
    getByContentId: publicProcedure.input(z.object({ contentId: z.number() })).query(async ({ input }) => {
      const { getQuizzesByContentId } = await import("./db");
      return await getQuizzesByContentId(input.contentId);
    }),
  }),

  // User Progress router
  progress: router({
    getMyProgress: protectedProcedure.query(async ({ ctx }) => {
      const { getUserProgress } = await import("./db");
      return await getUserProgress(ctx.user.id);
    }),
    getMyProgressByTrack: protectedProcedure.input(z.object({ trackId: z.number() })).query(async ({ ctx, input }) => {
      const { getUserProgressByTrack } = await import("./db");
      return await getUserProgressByTrack(ctx.user.id, input.trackId);
    }),
    updateProgress: protectedProcedure.input(z.object({
      trackId: z.number().optional(),
      contentId: z.number().optional(),
      status: z.enum(["not_started", "in_progress", "completed"]),
      quizScore: z.number().optional(),
    })).mutation(async ({ ctx, input }) => {
      const { upsertUserProgress } = await import("./db");
      await upsertUserProgress({
        userId: ctx.user.id,
        ...input,
        updatedAt: new Date(),
      });
      return { success: true };
    }),
  }),

  // Gamification router
  gamification: router({
    getMyStats: protectedProcedure.query(async ({ ctx }) => {
      const { getUserGamification, initializeUserGamification } = await import("./db");
      let stats = await getUserGamification(ctx.user.id);
      if (!stats) {
        await initializeUserGamification(ctx.user.id);
        stats = await getUserGamification(ctx.user.id);
      }
      return stats;
    }),
    addXP: protectedProcedure.input(z.object({ xp: z.number() })).mutation(async ({ ctx, input }) => {
      const { getUserGamification, updateUserGamification } = await import("./db");
      const stats = await getUserGamification(ctx.user.id);
      if (!stats) return { success: false };
      
      const newXP = stats.xp + input.xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      await updateUserGamification(ctx.user.id, {
        xp: newXP,
        level: newLevel,
      });
      return { success: true, newXP, newLevel };
    }),
    addGold: protectedProcedure.input(z.object({ gold: z.number() })).mutation(async ({ ctx, input }) => {
      const { getUserGamification, updateUserGamification } = await import("./db");
      const stats = await getUserGamification(ctx.user.id);
      if (!stats) return { success: false };
      
      const newGold = stats.gold + input.gold;
      await updateUserGamification(ctx.user.id, { gold: newGold });
      return { success: true, newGold };
    }),
  }),
});

export type AppRouter = typeof appRouter;
