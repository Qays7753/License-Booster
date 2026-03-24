import { createServer } from "node:http";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT ?? 8080);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");
const SURVEY_FILE = path.join(DATA_DIR, "survey.json");

const SURVEY_FIELDS = {
  source: [
    "شاهدت فيديو لصاحب مشروع على وسائل التواصل",
    "أرسل إليّ أحدهم الرابط",
    "بحثت بنفسي عن تسجيل أو ترخيص المشاريع",
    "طريقة ثانية",
  ],
  baseline: [
    "ما كنت أعرف من أين أبدأ أصلاً",
    "كنت أعرف الفكرة العامة، لكن ليس التفاصيل",
    "كنت أعرف الخطوات بشكل جيد",
  ],
  clarity_gain: [
    "عرفت الفرق بين التسجيل والترخيص وأنهما خطوتان مختلفتان",
    "عرفت الجهة التي يلزم أن أبدأ منها لنوع مشروعي",
    "فهمت أن الخطوات تختلف حسب نوع المشروع والموقع",
    "اكتشفت أن لدي خطوات ناقصة لم أكن أعرف عنها",
    "لم أشعر أن الصفحة أضافت شيئاً جديداً لي",
  ],
  readiness: [
    "جاهز وأعرف ما أول خطوة",
    "أقرب من قبل، لكن ما زالت لدي أسئلة",
    "ما زلت لا أشعر أنني جاهز",
    "مشروعي منظم أصلاً",
  ],
  next_action: [
    "أفتح موقع الجهة المختصة التي ظهرت لي",
    "أسأل محامياً أو شخصاً لديه خبرة في حالتي",
    "أشارك الصفحة مع شخص يحتاجها",
    "أعود لقراءة أقسام معينة بتركيز أكبر",
    "ليس لدي خطوة محددة حالياً",
  ],
  segment: [
    "أفكر في بدء مشروع ولم أبدأ بعد",
    "لدي مشروع شغّال بدون تنظيم مكتمل",
    "بدأت التسجيل لكن الملف ناقص",
    "مسجل ومرخص",
  ],
};

const BREAKDOWN_FIELDS = Object.freeze(Object.keys(SURVEY_FIELDS));

function json(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });

  for (const file of [VISITS_FILE, SURVEY_FILE]) {
    try {
      await access(file);
    } catch {
      await writeFile(file, "[]", "utf8");
    }
  }
}

async function readArray(file) {
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeArray(file, value) {
  await writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

function normalizeSurveyPayload(body) {
  const source = body.source ?? body.q1 ?? "";
  const baseline = body.baseline ?? body.q2 ?? "";
  const clarity_gain = body.clarity_gain ?? body.q3 ?? "";
  const readiness = body.readiness ?? body.q4 ?? "";
  const next_action = body.next_action ?? body.q5 ?? "";
  const segment = body.segment ?? body.q6 ?? "";

  return {
    created_at: new Date().toISOString(),
    source,
    baseline,
    clarity_gain,
    readiness,
    next_action,
    segment,
    raw: body,
  };
}

function countByField(items, field) {
  const counts = new Map();

  for (const item of items) {
    const value = item?.[field];
    if (!value) continue;

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const total = items.length || 1;

  return [...counts.entries()]
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }))
    .sort(
      (left, right) =>
        right.count - left.count || left.label.localeCompare(right.label, "ar"),
    );
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfWeek(date) {
  const copy = startOfDay(date);
  const day = copy.getDay();
  const offset = day === 0 ? 6 : day - 1;
  copy.setDate(copy.getDate() - offset);
  return copy;
}

async function handleAnalytics(res) {
  const [visits, surveys] = await Promise.all([
    readArray(VISITS_FILE),
    readArray(SURVEY_FILE),
  ]);

  const now = new Date();
  const dayStart = startOfDay(now).getTime();
  const weekStart = startOfWeek(now).getTime();

  const totalVisits = visits.length;
  const todayVisits = visits.filter(
    (visit) => new Date(visit.created_at).getTime() >= dayStart,
  ).length;
  const thisWeekVisits = visits.filter(
    (visit) => new Date(visit.created_at).getTime() >= weekStart,
  ).length;
  const surveyResponses = surveys.length;
  const completionRate =
    totalVisits > 0 ? Math.round((surveyResponses / totalVisits) * 1000) / 10 : 0;

  const breakdowns = Object.fromEntries(
    BREAKDOWN_FIELDS.map((field) => [
      field,
      countByField(surveys, field),
    ]),
  );

  json(res, 200, {
    summary: {
      totalVisits,
      todayVisits,
      thisWeekVisits,
      surveyResponses,
      completionRate,
    },
    breakdowns,
    lastUpdated: new Date().toISOString(),
  });
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

await ensureStore();

const server = createServer(async (req, res) => {
  if (!req.url) {
    json(res, 400, { error: "Missing URL" });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/analytics") {
    await handleAnalytics(res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/survey") {
    const surveys = await readArray(SURVEY_FILE);
    json(res, 200, { items: surveys });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/survey") {
    const body = await readJsonBody(req);
    const surveys = await readArray(SURVEY_FILE);
    surveys.push(normalizeSurveyPayload(body));
    await writeArray(SURVEY_FILE, surveys);
    json(res, 200, { ok: true });
    return;
  }

  if (
    req.method === "POST" &&
    (url.pathname === "/api/analytics" || url.pathname === "/api/visit")
  ) {
    const body = await readJsonBody(req);
    const visits = await readArray(VISITS_FILE);
    visits.push({
      created_at: new Date().toISOString(),
      referrer: body.referrer ?? req.headers.referer ?? "",
      user_agent: body.user_agent ?? body.userAgent ?? req.headers["user-agent"] ?? "",
      path: body.path ?? body.pathname ?? url.searchParams.get("path") ?? "/",
    });
    await writeArray(VISITS_FILE, visits);
    json(res, 200, { ok: true });
    return;
  }

  json(res, 404, { error: "Not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Analytics API listening on http://localhost:${PORT}`);
});
