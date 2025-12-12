import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { upsertUser } from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

async function createAuthContext(): Promise<{ ctx: TrpcContext }> {
  const openId = "test-user-gamification-" + Date.now();
  
  // Create user in database first
  await upsertUser({
    openId,
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
  });

  // Get the created user from database to get the real ID
  const { getUserByOpenId } = await import("./db");
  const dbUser = await getUserByOpenId(openId);
  
  if (!dbUser) {
    throw new Error("Failed to create test user");
  }

  const user: AuthenticatedUser = {
    id: dbUser.id,
    openId: dbUser.openId,
    email: dbUser.email || null,
    name: dbUser.name || null,
    loginMethod: dbUser.loginMethod || null,
    role: dbUser.role,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    lastSignedIn: dbUser.lastSignedIn,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("gamification router", () => {
  it("should initialize user gamification stats on first access", async () => {
    const { ctx } = await createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.gamification.getMyStats();

    expect(stats).toBeDefined();
    expect(stats?.userId).toBe(ctx.user.id);
    expect(stats?.xp).toBe(0);
    expect(stats?.level).toBe(1);
    expect(stats?.gold).toBe(0);
    expect(stats?.currentEra).toBe("idade_media");
  });

  it("should add XP and calculate new level correctly", async () => {
    const { ctx } = await createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Initialize stats
    await caller.gamification.getMyStats();

    // Add 50 XP
    const result = await caller.gamification.addXP({ xp: 50 });

    expect(result.success).toBe(true);
    expect(result.newXP).toBe(50);
    expect(result.newLevel).toBe(1); // Still level 1 (needs 100 XP for level 2)

    // Add another 60 XP (total 110)
    const result2 = await caller.gamification.addXP({ xp: 60 });

    expect(result2.success).toBe(true);
    expect(result2.newXP).toBe(110);
    expect(result2.newLevel).toBe(2); // Now level 2
  });

  it("should add gold correctly", async () => {
    const { ctx } = await createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Initialize stats
    await caller.gamification.getMyStats();

    // Add 10 gold
    const result = await caller.gamification.addGold({ gold: 10 });

    expect(result.success).toBe(true);
    expect(result.newGold).toBe(10);

    // Add another 25 gold
    const result2 = await caller.gamification.addGold({ gold: 25 });

    expect(result2.success).toBe(true);
    expect(result2.newGold).toBe(35);
  });
});
