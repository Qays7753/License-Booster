import { Router } from "express";
import { db, surveyResponsesTable } from "@workspace/db";

const surveyRouter = Router();

surveyRouter.post("/survey", async (req, res) => {
  try {
    const { q1, q2, q3, q4, q5, q6 } = req.body;
    const userAgent = req.headers["user-agent"] ?? null;

    await db.insert(surveyResponsesTable).values({
      q1Awareness: q1 ?? null,
      q2Barrier: q2 ?? null,
      q3Considered: q3 ?? null,
      q4Intent: q4 ?? null,
      q5Change: q5 ?? null,
      q6Status: q6 ?? null,
      userAgent,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Survey insert error:", err);
    res.status(500).json({ success: false, error: "Failed to save response" });
  }
});

surveyRouter.get("/survey/results", async (_req, res) => {
  try {
    const results = await db.select().from(surveyResponsesTable).orderBy(surveyResponsesTable.submittedAt);
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    console.error("Survey results error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch results" });
  }
});

export default surveyRouter;
