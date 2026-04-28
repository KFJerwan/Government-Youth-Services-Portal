import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, datetime } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with additional fields for youth portal.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: datetime("dateOfBirth"),
  region: varchar("region", { length: 100 }),
  city: varchar("city", { length: 100 }),
  bio: text("bio"),
  profileImage: text("profileImage"), // S3 URL
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Government Programs table
 */
export const programs = mysqlTable("programs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Employment", "Education", "Entrepreneurship"
  targetAudience: text("targetAudience"), // JSON or text describing who can apply
  requirements: text("requirements"), // JSON or text describing requirements
  benefits: text("benefits"), // JSON or text describing benefits
  applicationDeadline: datetime("applicationDeadline"),
  startDate: datetime("startDate"),
  endDate: datetime("endDate"),
  maxApplicants: int("maxApplicants"),
  fundingAmount: decimal("fundingAmount", { precision: 15, scale: 2 }),
  region: varchar("region", { length: 100 }), // Specific to Cameroon regions
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  documentationUrl: text("documentationUrl"), // S3 URL
  imageUrl: text("imageUrl"), // S3 URL
  isActive: boolean("isActive").default(true).notNull(),
  createdBy: int("createdBy").notNull(), // Admin user ID
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Program = typeof programs.$inferSelect;
export type InsertProgram = typeof programs.$inferInsert;

/**
 * Program Applications table
 */
export const programApplications = mysqlTable("program_applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  programId: int("programId").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "withdrawn"]).default("pending").notNull(),
  applicationDate: timestamp("applicationDate").defaultNow().notNull(),
  reviewedAt: datetime("reviewedAt"),
  reviewedBy: int("reviewedBy"), // Admin user ID
  rejectionReason: text("rejectionReason"),
  notes: text("notes"),
  attachments: text("attachments"), // JSON array of S3 URLs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProgramApplication = typeof programApplications.$inferSelect;
export type InsertProgramApplication = typeof programApplications.$inferInsert;

/**
 * Trainings table
 */
export const trainings = mysqlTable("trainings", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  domain: varchar("domain", { length: 100 }).notNull(), // e.g., "Programming", "Digital Marketing", "Graphic Design"
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).default("beginner").notNull(),
  duration: varchar("duration", { length: 50 }), // e.g., "4 weeks", "12 hours"
  startDate: datetime("startDate").notNull(),
  endDate: datetime("endDate").notNull(),
  region: varchar("region", { length: 100 }),
  format: mysqlEnum("format", ["online", "offline", "hybrid"]).default("online").notNull(),
  maxParticipants: int("maxParticipants"),
  currentParticipants: int("currentParticipants").default(0).notNull(),
  instructorName: varchar("instructorName", { length: 255 }),
  instructorBio: text("instructorBio"),
  price: decimal("price", { precision: 15, scale: 2 }).default("0"), // 0 for free trainings
  certificateProvided: boolean("certificateProvided").default(false).notNull(),
  imageUrl: text("imageUrl"), // S3 URL
  isActive: boolean("isActive").default(true).notNull(),
  createdBy: int("createdBy").notNull(), // Admin user ID
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Training = typeof trainings.$inferSelect;
export type InsertTraining = typeof trainings.$inferInsert;

/**
 * Training Enrollments table
 */
export const trainingEnrollments = mysqlTable("training_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  trainingId: int("trainingId").notNull(),
  enrollmentDate: timestamp("enrollmentDate").defaultNow().notNull(),
  status: mysqlEnum("status", ["enrolled", "completed", "cancelled"]).default("enrolled").notNull(),
  completionDate: datetime("completionDate"),
  certificateUrl: text("certificateUrl"), // S3 URL
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrainingEnrollment = typeof trainingEnrollments.$inferSelect;
export type InsertTrainingEnrollment = typeof trainingEnrollments.$inferInsert;

/**
 * Opportunities table (Jobs, Internships, Scholarships, Events)
 */
export const opportunities = mysqlTable("opportunities", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: mysqlEnum("type", ["job", "internship", "scholarship", "event"]).notNull(),
  domain: varchar("domain", { length: 100 }), // e.g., "Technology", "Finance", "Healthcare"
  region: varchar("region", { length: 100 }),
  organization: varchar("organization", { length: 255 }),
  organizationLogo: text("organizationLogo"), // S3 URL
  salary: varchar("salary", { length: 100 }), // e.g., "500,000 - 1,000,000 FCFA/month"
  duration: varchar("duration", { length: 100 }), // For internships/scholarships
  applicationDeadline: datetime("applicationDeadline"),
  startDate: datetime("startDate"),
  endDate: datetime("endDate"),
  requirements: text("requirements"), // JSON or text
  benefits: text("benefits"), // JSON or text
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  applicationUrl: text("applicationUrl"), // External URL or internal form
  imageUrl: text("imageUrl"), // S3 URL
  isActive: boolean("isActive").default(true).notNull(),
  createdBy: int("createdBy").notNull(), // Admin user ID
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = typeof opportunities.$inferInsert;

/**
 * Opportunity Applications table
 */
export const opportunityApplications = mysqlTable("opportunity_applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  opportunityId: int("opportunityId").notNull(),
  status: mysqlEnum("status", ["applied", "shortlisted", "rejected", "accepted", "withdrawn"]).default("applied").notNull(),
  applicationDate: timestamp("applicationDate").defaultNow().notNull(),
  resumeUrl: text("resumeUrl"), // S3 URL
  coverLetter: text("coverLetter"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OpportunityApplication = typeof opportunityApplications.$inferSelect;
export type InsertOpportunityApplication = typeof opportunityApplications.$inferInsert;

/**
 * Notifications table
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["application_status", "new_opportunity", "training_reminder", "program_update", "system"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  relatedEntityType: varchar("relatedEntityType", { length: 50 }), // e.g., "program", "training", "opportunity"
  relatedEntityId: int("relatedEntityId"),
  isRead: boolean("isRead").default(false).notNull(),
  emailSent: boolean("emailSent").default(false).notNull(),
  emailSentAt: datetime("emailSentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Admin Audit Log table
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  adminId: int("adminId").notNull(),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "approve_application", "create_program"
  entityType: varchar("entityType", { length: 50 }).notNull(),
  entityId: int("entityId"),
  changes: text("changes"), // JSON describing what changed
  reason: text("reason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;
