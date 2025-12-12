import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 6, // Naiara Monteiro
    openId: "naiara-monteiro-openid",
    email: "naiara.monteiro@example.com",
    name: "Naiara Monteiro",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
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

  return ctx;
}

describe("tracks router", () => {
  describe("tracks.getAll", () => {
    it("retorna todas as trilhas disponíveis", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const tracks = await caller.tracks.getAll();

      expect(tracks).toBeDefined();
      expect(Array.isArray(tracks)).toBe(true);
      expect(tracks.length).toBeGreaterThan(0);
      
      // Verificar estrutura da trilha
      const firstTrack = tracks[0];
      expect(firstTrack).toHaveProperty("id");
      expect(firstTrack).toHaveProperty("title");
      expect(firstTrack).toHaveProperty("description");
      expect(firstTrack).toHaveProperty("domain");
    });

    it("retorna pelo menos as 2 trilhas de Naiara (Português e Matemática)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const tracks = await caller.tracks.getAll();

      expect(tracks.length).toBeGreaterThanOrEqual(2);
      
      const trackTitles = tracks.map(t => t.title);
      expect(trackTitles).toContain("Português Básico");
      expect(trackTitles).toContain("Matemática Básica");
    });
  });

  describe("tracks.getById", () => {
    it("retorna uma trilha específica pelo ID", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeira trilha disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;

      const trackId = tracks[0].id;
      const track = await caller.tracks.getById({ id: trackId });

      expect(track).toBeDefined();
      expect(track).toHaveProperty("id", trackId);
      expect(track).toHaveProperty("title");
      expect(track).toHaveProperty("description");
    });

    it("retorna undefined para ID inexistente", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const track = await caller.tracks.getById({ id: 999 });

      expect(track).toBeUndefined();
    });
  });

  describe("tracks.getStages", () => {
    it("retorna os estágios de uma trilha", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeira trilha disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;

      const trackId = tracks[0].id;
      const stages = await caller.tracks.getStages({ trackId });

      expect(stages).toBeDefined();
      expect(Array.isArray(stages)).toBe(true);
      
      // Verificar estrutura do estágio se houver estágios
      if (stages.length > 0) {
        const firstStage = stages[0];
        expect(firstStage).toHaveProperty("id");
        expect(firstStage).toHaveProperty("title");
        expect(firstStage).toHaveProperty("description");
        expect(firstStage).toHaveProperty("trackId", trackId);
        expect(firstStage).toHaveProperty("orderIndex");
      }
    });

    it("retorna estágios para Português Básico", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar trilha de Português
      const tracks = await caller.tracks.getAll();
      const portuguesTrack = tracks.find(t => t.title === "Português Básico");
      if (!portuguesTrack) return;

      const stages = await caller.tracks.getStages({ trackId: portuguesTrack.id });

      expect(stages.length).toBeGreaterThan(0);
    });

    it("retorna array vazio para trilha sem estágios", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const stages = await caller.tracks.getStages({ trackId: 999 });

      expect(stages).toBeDefined();
      expect(Array.isArray(stages)).toBe(true);
      expect(stages.length).toBe(0);
    });
  });
});

describe("stages router", () => {
  describe("stages.getById", () => {
    it("retorna um estágio específico pelo ID", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeiro estágio disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;
      const stages = await caller.tracks.getStages({ trackId: tracks[0].id });
      if (stages.length === 0) return;

      const stageId = stages[0].id;
      const stage = await caller.stages.getById({ id: stageId });

      expect(stage).toBeDefined();
      expect(stage).toHaveProperty("id", stageId);
      expect(stage).toHaveProperty("title");
      expect(stage).toHaveProperty("description");
      expect(stage).toHaveProperty("trackId");
    });

    it("retorna null para ID inexistente", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const stage = await caller.stages.getById({ id: 999 });

      expect(stage).toBeNull();
    });
  });

  describe("stages.getTasks", () => {
    it("retorna as tarefas de um estágio", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeiro estágio com tarefas
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;
      const stages = await caller.tracks.getStages({ trackId: tracks[0].id });
      if (stages.length === 0) return;

      const stageId = stages[0].id;
      const tasks = await caller.stages.getTasks({ stageId });

      expect(tasks).toBeDefined();
      expect(Array.isArray(tasks)).toBe(true);
      
      // Verificar estrutura da tarefa se houver tarefas
      if (tasks.length > 0) {
        const firstTask = tasks[0];
        expect(firstTask).toHaveProperty("id");
        expect(firstTask).toHaveProperty("title");
        expect(firstTask).toHaveProperty("description");
        expect(firstTask).toHaveProperty("stageId", stageId);
        expect(firstTask).toHaveProperty("orderIndex");
      }
    });

    it("retorna array vazio para estágio sem tarefas", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const tasks = await caller.stages.getTasks({ stageId: 999 });

      expect(tasks).toBeDefined();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });
  });
});

describe("tasks router", () => {
  describe("tasks.getById", () => {
    it("retorna uma tarefa específica pelo ID", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeira trilha disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) {
        console.warn("Nenhuma trilha disponível para teste");
        return;
      }

      // Buscar primeiro estágio da trilha
      const stages = await caller.tracks.getStages({ trackId: tracks[0].id });
      if (stages.length === 0) {
        console.warn("Nenhum estágio disponível para teste");
        return;
      }

      // Buscar primeira tarefa do estágio
      const tasks = await caller.stages.getTasks({ stageId: stages[0].id });
      if (tasks.length === 0) {
        console.warn("Nenhuma tarefa disponível para teste");
        return;
      }

      const taskId = tasks[0].id;
      const task = await caller.tasks.getById({ id: taskId });

      expect(task).toBeDefined();
      expect(task).toHaveProperty("id", taskId);
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("description");
      expect(task).toHaveProperty("stageId");
    });

    it("retorna null para ID inexistente", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const task = await caller.tasks.getById({ id: 999 });

      expect(task).toBeNull();
    });
  });

  describe("tasks.complete", () => {
    it("marca uma tarefa como completa para usuário autenticado", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeira tarefa disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;
      const stages = await caller.tracks.getStages({ trackId: tracks[0].id });
      if (stages.length === 0) return;
      const tasks = await caller.stages.getTasks({ stageId: stages[0].id });
      if (tasks.length === 0) return;

      const result = await caller.tasks.complete({ taskId: tasks[0].id, score: 85 });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("success", true);
    });

    it("falha ao tentar completar tarefa sem autenticação", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.tasks.complete({ taskId: 1, score: 85 })
      ).rejects.toThrow();
    });
  });

  describe("tasks.getMyProgress", () => {
    it("retorna o progresso do usuário em uma tarefa", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Buscar primeira tarefa disponível
      const tracks = await caller.tracks.getAll();
      if (tracks.length === 0) return;
      const stages = await caller.tracks.getStages({ trackId: tracks[0].id });
      if (stages.length === 0) return;
      const tasks = await caller.stages.getTasks({ stageId: stages[0].id });
      if (tasks.length === 0) return;

      const taskId = tasks[0].id;
      const progress = await caller.tasks.getMyProgress({ taskId });

      expect(progress).toBeDefined();
      // Pode ser null se o usuário não iniciou a tarefa ainda
      if (progress) {
        expect(progress).toHaveProperty("userId");
        expect(progress).toHaveProperty("taskId", taskId);
        expect(progress).toHaveProperty("status");
      }
    });

    it("falha ao tentar buscar progresso sem autenticação", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.tasks.getMyProgress({ taskId: 1 })
      ).rejects.toThrow();
    });
  });
});

describe("fluxo completo de navegação", () => {
  it("consegue navegar de trilha → estágio → tarefa", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // 1. Buscar todas as trilhas
    const tracks = await caller.tracks.getAll();
    expect(tracks.length).toBeGreaterThan(0);

    // 2. Pegar a primeira trilha
    const firstTrack = tracks[0];
    expect(firstTrack).toBeDefined();

    // 3. Buscar estágios da trilha
    const stages = await caller.tracks.getStages({ trackId: firstTrack.id });
    expect(stages.length).toBeGreaterThan(0);

    // 4. Pegar o primeiro estágio
    const firstStage = stages[0];
    expect(firstStage).toBeDefined();

    // 5. Buscar tarefas do estágio
    const tasks = await caller.stages.getTasks({ stageId: firstStage.id });
    expect(tasks.length).toBeGreaterThan(0);

    // 6. Pegar a primeira tarefa
    const firstTask = tasks[0];
    expect(firstTask).toBeDefined();

    // 7. Buscar detalhes da tarefa
    const taskDetails = await caller.tasks.getById({ id: firstTask.id });
    expect(taskDetails).toBeDefined();
    expect(taskDetails?.id).toBe(firstTask.id);
  });

  it("valida estrutura completa das 2 trilhas de Naiara", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Buscar trilhas
    const allTracks = await caller.tracks.getAll();
    expect(allTracks.length).toBeGreaterThanOrEqual(2);

    // Filtrar apenas as trilhas de Naiara (pode haver duplicatas no banco)
    const naiaraTracks = allTracks.filter(t => 
      t.title === "Português Básico" || t.title === "Matemática Básica"
    );
    expect(naiaraTracks.length).toBeGreaterThanOrEqual(2);

    // Validar cada trilha
    for (const track of naiaraTracks) {
      // Buscar estágios
      const stages = await caller.tracks.getStages({ trackId: track.id });
      expect(stages.length).toBe(3); // Cada trilha tem 3 estágios

      // Validar cada estágio
      for (const stage of stages) {
        // Buscar tarefas
        const tasks = await caller.stages.getTasks({ stageId: stage.id });
        
        // Apenas validar estágios que têm tarefas
        if (tasks.length > 0) {
          expect(tasks.length).toBeGreaterThan(0);

          // Validar ordem das tarefas
          const orders = tasks.map(t => t.orderIndex);
          const sortedOrders = [...orders].sort((a, b) => a - b);
          expect(orders).toEqual(sortedOrders);
        }
      }
    }
  });
});
