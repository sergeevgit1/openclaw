import { html, nothing } from "lit";
import type { DiscordStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderDiscordCard(params: {
  props: ChannelsProps;
  discord?: DiscordStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, discord, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">Discord</div>
      <div class="card-sub">Статус бота и конфигурация канала.</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Настроен</span>
          <span>${discord?.configured ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Запущен</span>
          <span>${discord?.running ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Последний запуск</span>
          <span>${discord?.lastStartAt ? formatAgo(discord.lastStartAt) : "н/д"}</span>
        </div>
        <div>
          <span class="label">Последняя проверка</span>
          <span>${discord?.lastProbeAt ? formatAgo(discord.lastProbeAt) : "н/д"}</span>
        </div>
      </div>

      ${
        discord?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${discord.lastError}
          </div>`
          : nothing
      }

      ${
        discord?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${discord.probe.ok ? "ок" : "не пройдена"} ·
            ${discord.probe.status ?? ""} ${discord.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "discord", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
