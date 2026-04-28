import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { eq, and, gte, lte, like, desc } from "drizzle-orm";
import {
  programs,
  programApplications,
  trainings,
  trainingEnrollments,
  opportunities,
  opportunityApplications,
  notifications,
  auditLogs,
} from "../drizzle/schema";
import { TRPCError } from "@trpc/server";

// Helper function to check if user is admin
async function ensureAdmin(userId: number) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  // In production, fetch user from DB to check role
  // For now, we assume context already has the user role
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Programs Router
  programs: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          region: z.string().optional(),
          search: z.string().optional(),
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const conditions = [eq(programs.isActive, true)];

        if (input.category) {
          conditions.push(eq(programs.category, input.category));
        }
        if (input.region) {
          conditions.push(eq(programs.region, input.region));
        }
        if (input.search) {
          conditions.push(like(programs.title, `%${input.search}%`));
        }

        const result = await db
          .select()
          .from(programs)
          .where(and(...conditions))
          .limit(input.limit)
          .offset(input.offset)
          .orderBy(desc(programs.createdAt));

        return result;
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db
          .select()
          .from(programs)
          .where(eq(programs.id, input))
          .limit(1);

        if (!result.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return result[0];
      }),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string(),
          category: z.string(),
          targetAudience: z.string().optional(),
          requirements: z.string().optional(),
          benefits: z.string().optional(),
          applicationDeadline: z.date().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          maxApplicants: z.number().optional(),
          fundingAmount: z.string().optional(),
          region: z.string().optional(),
          contactEmail: z.string().email().optional(),
          contactPhone: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db.insert(programs).values({
          ...input,
          createdBy: ctx.user.id,
        });

        return result;
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          category: z.string().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const { id, ...updateData } = input;

        const result = await db
          .update(programs)
          .set(updateData)
          .where(eq(programs.id, id));

        return result;
      }),
  }),

  // Program Applications Router
  applications: router({
    list: protectedProcedure
      .input(
        z.object({
          status: z
            .enum(["pending", "approved", "rejected", "withdrawn"])
            .optional(),
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const conditions = [eq(programApplications.userId, ctx.user!.id)];

        if (input.status) {
          conditions.push(eq(programApplications.status, input.status));
        }

        const result = await db
          .select()
          .from(programApplications)
          .where(and(...conditions))
          .limit(input.limit)
          .offset(input.offset)
          .orderBy(desc(programApplications.applicationDate));

        return result;
      }),

    create: protectedProcedure
      .input(
        z.object({
          programId: z.number(),
          attachments: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        // Check if already applied
        const existing = await db
          .select()
          .from(programApplications)
          .where(
            and(
              eq(programApplications.userId, ctx.user!.id),
              eq(programApplications.programId, input.programId)
            )
          )
          .limit(1);

        if (existing.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Vous avez déjà candidaté à ce programme",
          });
        }

        const result = await db.insert(programApplications).values({
          userId: ctx.user!.id,
          programId: input.programId,
          status: "pending",
          attachments: JSON.stringify(input.attachments || []),
        });

        // Create notification
        await db.insert(notifications).values({
          userId: ctx.user!.id,
          type: "application_status",
          title: "Candidature Soumise",
          message: "Votre candidature a été soumise avec succès",
          relatedEntityType: "program",
          relatedEntityId: input.programId,
        });

        return result;
      }),

    approve: protectedProcedure
      .input(
        z.object({
          applicationId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const app = await db
          .select()
          .from(programApplications)
          .where(eq(programApplications.id, input.applicationId))
          .limit(1);

        if (!app.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        await db
          .update(programApplications)
          .set({ status: "approved", reviewedAt: new Date(), reviewedBy: ctx.user!.id })
          .where(eq(programApplications.id, input.applicationId));

        // Create notification for user
        await db.insert(notifications).values({
          userId: app[0].userId,
          type: "application_status",
          title: "Candidature Approuvée",
          message: "Félicitations ! Votre candidature a été approuvée",
          relatedEntityType: "program",
          relatedEntityId: app[0].programId,
        });

        return { success: true };
      }),

    reject: protectedProcedure
      .input(
        z.object({
          applicationId: z.number(),
          reason: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const app = await db
          .select()
          .from(programApplications)
          .where(eq(programApplications.id, input.applicationId))
          .limit(1);

        if (!app.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        await db
          .update(programApplications)
          .set({
            status: "rejected",
            reviewedAt: new Date(),
            reviewedBy: ctx.user!.id,
            rejectionReason: input.reason,
          })
          .where(eq(programApplications.id, input.applicationId));

        // Create notification for user
        await db.insert(notifications).values({
          userId: app[0].userId,
          type: "application_status",
          title: "Candidature Rejetée",
          message: input.reason
            ? `Votre candidature a été rejetée. Raison: ${input.reason}`
            : "Votre candidature a été rejetée",
          relatedEntityType: "program",
          relatedEntityId: app[0].programId,
        });

        return { success: true };
      }),
  }),

  // Trainings Router
  trainings: router({
    list: publicProcedure
      .input(
        z.object({
          domain: z.string().optional(),
          level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
          format: z.enum(["online", "offline", "hybrid"]).optional(),
          region: z.string().optional(),
          search: z.string().optional(),
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const conditions = [eq(trainings.isActive, true)];

        if (input.domain) {
          conditions.push(eq(trainings.domain, input.domain));
        }
        if (input.level) {
          conditions.push(eq(trainings.level, input.level));
        }
        if (input.format) {
          conditions.push(eq(trainings.format, input.format));
        }
        if (input.region) {
          conditions.push(eq(trainings.region, input.region));
        }
        if (input.search) {
          conditions.push(like(trainings.title, `%${input.search}%`));
        }

        const result = await db
          .select()
          .from(trainings)
          .where(and(...conditions))
          .limit(input.limit)
          .offset(input.offset)
          .orderBy(desc(trainings.createdAt));

        return result;
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db
          .select()
          .from(trainings)
          .where(eq(trainings.id, input))
          .limit(1);

        if (!result.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return result[0];
      }),

    enroll: protectedProcedure
      .input(z.number())
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        // Check if already enrolled
        const existing = await db
          .select()
          .from(trainingEnrollments)
          .where(
            and(
              eq(trainingEnrollments.userId, ctx.user!.id),
              eq(trainingEnrollments.trainingId, input)
            )
          )
          .limit(1);

        if (existing.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Vous êtes déjà inscrit à cette formation",
          });
        }

        const result = await db.insert(trainingEnrollments).values({
          userId: ctx.user!.id,
          trainingId: input,
          status: "enrolled",
        });

        // Create notification
        await db.insert(notifications).values({
          userId: ctx.user!.id,
          type: "training_reminder",
          title: "Inscription à la Formation",
          message: "Vous êtes maintenant inscrit à cette formation",
          relatedEntityType: "training",
          relatedEntityId: input,
        });

        return result;
      }),
  }),

  // Opportunities Router
  opportunities: router({
    list: publicProcedure
      .input(
        z.object({
          type: z
            .enum(["job", "internship", "scholarship", "event"])
            .optional(),
          domain: z.string().optional(),
          region: z.string().optional(),
          search: z.string().optional(),
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const conditions = [eq(opportunities.isActive, true)];

        if (input.type) {
          conditions.push(eq(opportunities.type, input.type));
        }
        if (input.domain) {
          conditions.push(eq(opportunities.domain, input.domain));
        }
        if (input.region) {
          conditions.push(eq(opportunities.region, input.region));
        }
        if (input.search) {
          conditions.push(like(opportunities.title, `%${input.search}%`));
        }

        const result = await db
          .select()
          .from(opportunities)
          .where(and(...conditions))
          .limit(input.limit)
          .offset(input.offset)
          .orderBy(desc(opportunities.createdAt));

        return result;
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db
          .select()
          .from(opportunities)
          .where(eq(opportunities.id, input))
          .limit(1);

        if (!result.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return result[0];
      }),

    apply: protectedProcedure
      .input(
        z.object({
          opportunityId: z.number(),
          resumeUrl: z.string().optional(),
          coverLetter: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        // Check if already applied
        const existing = await db
          .select()
          .from(opportunityApplications)
          .where(
            and(
              eq(opportunityApplications.userId, ctx.user!.id),
              eq(opportunityApplications.opportunityId, input.opportunityId)
            )
          )
          .limit(1);

        if (existing.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Vous avez déjà candidaté à cette opportunité",
          });
        }

        const result = await db.insert(opportunityApplications).values({
          userId: ctx.user!.id,
          opportunityId: input.opportunityId,
          status: "applied",
          resumeUrl: input.resumeUrl,
          coverLetter: input.coverLetter,
        });

        // Create notification
        await db.insert(notifications).values({
          userId: ctx.user!.id,
          type: "application_status",
          title: "Candidature Soumise",
          message: "Votre candidature a été soumise avec succès",
          relatedEntityType: "opportunity",
          relatedEntityId: input.opportunityId,
        });

        return result;
      }),
  }),

  // Notifications Router
  notifications: router({
    list: protectedProcedure
      .input(
        z.object({
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db
          .select()
          .from(notifications)
          .where(eq(notifications.userId, ctx.user!.id))
          .limit(input.limit)
          .offset(input.offset)
          .orderBy(desc(notifications.createdAt));

        return result;
      }),

    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await db
          .update(notifications)
          .set({ isRead: true })
          .where(
            and(
              eq(notifications.id, input),
              eq(notifications.userId, ctx.user!.id)
            )
          );

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
