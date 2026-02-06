import type { IconName } from "./icons.js";

export const TAB_GROUPS = [
  { label: "Чат", tabs: ["chat"] },
  {
    label: "Управление",
    tabs: ["overview", "channels", "instances", "sessions", "usage", "cron"],
  },
  { label: "Агент", tabs: ["agents", "skills", "nodes"] },
  { label: "Настройки", tabs: ["config", "debug", "logs"] },
] as const;

export type Tab =
  | "agents"
  | "overview"
  | "channels"
  | "instances"
  | "sessions"
  | "usage"
  | "cron"
  | "skills"
  | "nodes"
  | "chat"
  | "config"
  | "debug"
  | "logs";

const TAB_PATHS: Record<Tab, string> = {
  agents: "/agents",
  overview: "/overview",
  channels: "/channels",
  instances: "/instances",
  sessions: "/sessions",
  usage: "/usage",
  cron: "/cron",
  skills: "/skills",
  nodes: "/nodes",
  chat: "/chat",
  config: "/config",
  debug: "/debug",
  logs: "/logs",
};

const PATH_TO_TAB = new Map(Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as Tab]));

export function normalizeBasePath(basePath: string): string {
  if (!basePath) {
    return "";
  }
  let base = basePath.trim();
  if (!base.startsWith("/")) {
    base = `/${base}`;
  }
  if (base === "/") {
    return "";
  }
  if (base.endsWith("/")) {
    base = base.slice(0, -1);
  }
  return base;
}

export function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }
  let normalized = path.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function pathForTab(tab: Tab, basePath = ""): string {
  const base = normalizeBasePath(basePath);
  const path = TAB_PATHS[tab];
  return base ? `${base}${path}` : path;
}

export function tabFromPath(pathname: string, basePath = ""): Tab | null {
  const base = normalizeBasePath(basePath);
  let path = pathname || "/";
  if (base) {
    if (path === base) {
      path = "/";
    } else if (path.startsWith(`${base}/`)) {
      path = path.slice(base.length);
    }
  }
  let normalized = normalizePath(path).toLowerCase();
  if (normalized.endsWith("/index.html")) {
    normalized = "/";
  }
  if (normalized === "/") {
    return "chat";
  }
  return PATH_TO_TAB.get(normalized) ?? null;
}

export function inferBasePathFromPathname(pathname: string): string {
  let normalized = normalizePath(pathname);
  if (normalized.endsWith("/index.html")) {
    normalized = normalizePath(normalized.slice(0, -"/index.html".length));
  }
  if (normalized === "/") {
    return "";
  }
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "";
  }
  for (let i = 0; i < segments.length; i++) {
    const candidate = `/${segments.slice(i).join("/")}`.toLowerCase();
    if (PATH_TO_TAB.has(candidate)) {
      const prefix = segments.slice(0, i);
      return prefix.length ? `/${prefix.join("/")}` : "";
    }
  }
  return `/${segments.join("/")}`;
}

export function iconForTab(tab: Tab): IconName {
  switch (tab) {
    case "agents":
      return "folder";
    case "chat":
      return "messageSquare";
    case "overview":
      return "barChart";
    case "channels":
      return "link";
    case "instances":
      return "radio";
    case "sessions":
      return "fileText";
    case "usage":
      return "barChart";
    case "cron":
      return "loader";
    case "skills":
      return "zap";
    case "nodes":
      return "monitor";
    case "config":
      return "settings";
    case "debug":
      return "bug";
    case "logs":
      return "scrollText";
    default:
      return "folder";
  }
}

export function titleForTab(tab: Tab) {
  switch (tab) {
    case "agents":
      return "Агенты";
    case "overview":
      return "Обзор";
    case "channels":
      return "Каналы";
    case "instances":
      return "Подключения";
    case "sessions":
      return "Сессии";
    case "usage":
      return "Использование";
    case "cron":
      return "Планировщик";
    case "skills":
      return "Навыки";
    case "nodes":
      return "Узлы";
    case "chat":
      return "Чат";
    case "config":
      return "Конфигурация";
    case "debug":
      return "Отладка";
    case "logs":
      return "Логи";
    default:
      return "Управление";
  }
}

export function subtitleForTab(tab: Tab) {
  switch (tab) {
    case "agents":
      return "Управление рабочими пространствами, инструментами и идентификацией агентов.";
    case "overview":
      return "Статус шлюза, точки входа и быстрая проверка состояния.";
    case "channels":
      return "Управление каналами и настройками.";
    case "instances":
      return "Сигналы присутствия от подключённых клиентов и узлов.";
    case "sessions":
      return "Просмотр активных сессий и настройка параметров.";
    case "usage":
      return "";
    case "cron":
      return "Планирование пробуждений и регулярных запусков агента.";
    case "skills":
      return "Управление доступностью навыков и внедрением API-ключей.";
    case "nodes":
      return "Сопряжённые устройства, возможности и доступные команды.";
    case "chat":
      return "Прямой чат со шлюзом для быстрого взаимодействия.";
    case "config":
      return "Безопасное редактирование ~/.openclaw/openclaw.json.";
    case "debug":
      return "Снимки шлюза, события и ручные RPC-вызовы.";
    case "logs":
      return "Просмотр логов шлюза в реальном времени.";
    default:
      return "";
  }
}
