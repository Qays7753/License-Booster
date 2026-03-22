import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const surveyResponsesTable = pgTable("survey_responses", {
  id: serial("id").primaryKey(),
  q1Awareness: text("q1_awareness"),
  q2Barrier: text("q2_barrier"),
  q3Considered: text("q3_considered"),
  q4Intent: text("q4_intent"),
  q5Change: text("q5_change"),
  q6Status: text("q6_status"),
  userAgent: text("user_agent"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertSurveyResponseSchema = createInsertSchema(surveyResponsesTable).omit({
  id: true,
  submittedAt: true,
});

export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type SurveyResponse = typeof surveyResponsesTable.$inferSelect;
