import { html, nothing } from "lit";
import type { IMessageStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderIMessageCard(params: {
  props: ChannelsProps;
  imessage?: IMessageStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, imessage, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">iMessage</div>
      <div class="card-sub">Статус моста macOS и конфигурация канала.</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Настроен</span>
          <span>${imessage?.configured ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Запущен</span>
          <span>${imessage?.running ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Последний запуск</span>
          <span>${imessage?.lastStartAt ? formatAgo(imessage.lastStartAt) : "н/д"}</span>
        </div>
        <div>
          <span class="label">Последняя проверка</span>
          <span>${imessage?.lastProbeAt ? formatAgo(imessage.lastProbeAt) : "н/д"}</span>
        </div>
      </div>

      ${
        imessage?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${imessage.lastError}
          </div>`
          : nothing
      }

      ${
        imessage?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${imessage.probe.ok ? "ок" : "не пройдена"} ·
            ${imessage.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "imessage", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
