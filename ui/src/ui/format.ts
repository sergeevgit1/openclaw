import { stripReasoningTagsFromText } from "../../../src/shared/text/reasoning-tags.js";

export function formatMs(ms?: number | null): string {
  if (!ms && ms !== 0) {
    return "н/д";
  }
  return new Date(ms).toLocaleString();
}

export function formatAgo(ms?: number | null): string {
  if (!ms && ms !== 0) {
    return "н/д";
  }
  const diff = Date.now() - ms;
  const absDiff = Math.abs(diff);
  const suffix = diff < 0 ? "через" : "назад";
  const sec = Math.round(absDiff / 1000);
  if (sec < 60) {
    return diff < 0 ? "только что" : `${sec}с назад`;
  }
  const min = Math.round(sec / 60);
  if (min < 60) {
    return diff < 0 ? `через ${min}м` : `${min}м назад`;
  }
  const hr = Math.round(min / 60);
  if (hr < 48) {
    return diff < 0 ? `через ${hr}ч` : `${hr}ч назад`;
  }
  const day = Math.round(hr / 24);
  return diff < 0 ? `через ${day}д` : `${day}д назад`;
}

export function formatDurationMs(ms?: number | null): string {
  if (!ms && ms !== 0) {
    return "н/д";
  }
  if (ms < 1000) {
    return `${ms}мс`;
  }
  const sec = Math.round(ms / 1000);
  if (sec < 60) {
    return `${sec}с`;
  }
  const min = Math.round(sec / 60);
  if (min < 60) {
    return `${min}м`;
  }
  const hr = Math.round(min / 60);
  if (hr < 48) {
    return `${hr}ч`;
  }
  const day = Math.round(hr / 24);
  return `${day}д`;
}

export function formatList(values?: Array<string | null | undefined>): string {
  if (!values || values.length === 0) {
    return "нет";
  }
  return values.filter((v): v is string => Boolean(v && v.trim())).join(", ");
}

export function clampText(value: string, max = 120): string {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, Math.max(0, max - 1))}…`;
}

export function truncateText(
  value: string,
  max: number,
): {
  text: string;
  truncated: boolean;
  total: number;
} {
  if (value.length <= max) {
    return { text: value, truncated: false, total: value.length };
  }
  return {
    text: value.slice(0, Math.max(0, max)),
    truncated: true,
    total: value.length,
  };
}

export function toNumber(value: string, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function parseList(input: string): string[] {
  return input
    .split(/[,\n]/)
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

export function stripThinkingTags(value: string): string {
  return stripReasoningTagsFromText(value, { mode: "preserve", trim: "start" });
}
