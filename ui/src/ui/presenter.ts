import type { CronJob, GatewaySessionRow, PresenceEntry } from "./types.ts";
import { formatAgo, formatDurationMs, formatMs } from "./format.ts";

export function formatPresenceSummary(entry: PresenceEntry): string {
  const host = entry.host ?? "неизвестно";
  const ip = entry.ip ? `(${entry.ip})` : "";
  const mode = entry.mode ?? "";
  const version = entry.version ?? "";
  return `${host} ${ip} ${mode} ${version}`.trim();
}

export function formatPresenceAge(entry: PresenceEntry): string {
  const ts = entry.ts ?? null;
  return ts ? formatAgo(ts) : "н/д";
}

export function formatNextRun(ms?: number | null) {
  if (!ms) {
    return "н/д";
  }
  return `${formatMs(ms)} (${formatAgo(ms)})`;
}

export function formatSessionTokens(row: GatewaySessionRow) {
  if (row.totalTokens == null) {
    return "н/д";
  }
  const total = row.totalTokens ?? 0;
  const ctx = row.contextTokens ?? 0;
  return ctx ? `${total} / ${ctx}` : String(total);
}

export function formatEventPayload(payload: unknown): string {
  if (payload == null) {
    return "";
  }
  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    // oxlint-disable typescript/no-base-to-string
    return String(payload);
  }
}

export function formatCronState(job: CronJob) {
  const state = job.state ?? {};
  const next = state.nextRunAtMs ? formatMs(state.nextRunAtMs) : "н/д";
  const last = state.lastRunAtMs ? formatMs(state.lastRunAtMs) : "н/д";
  const status = state.lastStatus ?? "н/д";
  return `${status} · след. ${next} · посл. ${last}`;
}

export function formatCronSchedule(job: CronJob) {
  const s = job.schedule;
  if (s.kind === "at") {
    const atMs = Date.parse(s.at);
    return Number.isFinite(atMs) ? `В ${formatMs(atMs)}` : `В ${s.at}`;
  }
  if (s.kind === "every") {
    return `Каждые ${formatDurationMs(s.everyMs)}`;
  }
  return `Расписание ${s.expr}${s.tz ? ` (${s.tz})` : ""}`;
}

export function formatCronPayload(job: CronJob) {
  const p = job.payload;
  if (p.kind === "systemEvent") {
    return `Система: ${p.text}`;
  }
  const base = `Агент: ${p.message}`;
  const delivery = job.delivery;
  if (delivery && delivery.mode !== "none") {
    const target =
      delivery.channel || delivery.to
        ? ` (${delivery.channel ?? "последний"}${delivery.to ? ` -> ${delivery.to}` : ""})`
        : "";
    return `${base} · ${delivery.mode}${target}`;
  }
  return base;
}
