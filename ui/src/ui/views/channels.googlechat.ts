import { html, nothing } from "lit";
import type { GoogleChatStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderGoogleChatCard(params: {
  props: ChannelsProps;
  googleChat?: GoogleChatStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, googleChat, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">Google Chat</div>
      <div class="card-sub">Статус вебхука Chat API и конфигурация канала.</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Настроен</span>
          <span>${googleChat ? (googleChat.configured ? "Да" : "Нет") : "н/д"}</span>
        </div>
        <div>
          <span class="label">Запущен</span>
          <span>${googleChat ? (googleChat.running ? "Да" : "Нет") : "н/д"}</span>
        </div>
        <div>
          <span class="label">Учётные данные</span>
          <span>${googleChat?.credentialSource ?? "н/д"}</span>
        </div>
        <div>
          <span class="label">Аудитория</span>
          <span>
            ${
              googleChat?.audienceType
                ? `${googleChat.audienceType}${googleChat.audience ? ` · ${googleChat.audience}` : ""}`
                : "н/д"
            }
          </span>
        </div>
        <div>
          <span class="label">Последний запуск</span>
          <span>${googleChat?.lastStartAt ? formatAgo(googleChat.lastStartAt) : "н/д"}</span>
        </div>
        <div>
          <span class="label">Последняя проверка</span>
          <span>${googleChat?.lastProbeAt ? formatAgo(googleChat.lastProbeAt) : "н/д"}</span>
        </div>
      </div>

      ${
        googleChat?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${googleChat.lastError}
          </div>`
          : nothing
      }

      ${
        googleChat?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${googleChat.probe.ok ? "ок" : "не пройдена"} ·
            ${googleChat.probe.status ?? ""} ${googleChat.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "googlechat", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
