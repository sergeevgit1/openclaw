import { html, nothing } from "lit";
import type { SignalStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderSignalCard(params: {
  props: ChannelsProps;
  signal?: SignalStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, signal, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">Signal</div>
      <div class="card-sub">Статус signal-cli и конфигурация канала.</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Настроен</span>
          <span>${signal?.configured ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Запущен</span>
          <span>${signal?.running ? "Да" : "Нет"}</span>
        </div>
        <div>
          <span class="label">Базовый URL</span>
          <span>${signal?.baseUrl ?? "н/д"}</span>
        </div>
        <div>
          <span class="label">Последний запуск</span>
          <span>${signal?.lastStartAt ? formatAgo(signal.lastStartAt) : "н/д"}</span>
        </div>
        <div>
          <span class="label">Последняя проверка</span>
          <span>${signal?.lastProbeAt ? formatAgo(signal.lastProbeAt) : "н/д"}</span>
        </div>
      </div>

      ${
        signal?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${signal.lastError}
          </div>`
          : nothing
      }

      ${
        signal?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${signal.probe.ok ? "ок" : "не пройдена"} ·
            ${signal.probe.status ?? ""} ${signal.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "signal", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
