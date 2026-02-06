import { html, nothing } from "lit";
import type { SlackStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderSlackCard(params: {
  props: ChannelsProps;
  slack?: SlackStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, slack, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">Slack</div>
      <div class="card-sub">Статус Socket-режима и конфигурация канала.</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Настроен</span>
          <span>${slack?.configured ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Запущен</span>
          <span>${slack?.running ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Последний запуск</span>
          <span>${slack?.lastStartAt ? formatAgo(slack.lastStartAt) : "н/д"}</span>
        </div>
        <div>
          <span class="label">Последняя проверка</span>
          <span>${slack?.lastProbeAt ? formatAgo(slack.lastProbeAt) : "н/д"}</span>
        </div>
      </div>

      ${
        slack?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${slack.lastError}
          </div>`
          : nothing
      }

      ${
        slack?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${slack.probe.ok ? "ок" : "не пройдена"} ·
            ${slack.probe.status ?? ""} ${slack.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "slack", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
