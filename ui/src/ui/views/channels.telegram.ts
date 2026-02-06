import { html, nothing } from "lit";
import type { ChannelAccountSnapshot, TelegramStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatAgo } from "../format.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderTelegramCard(params: {
  props: ChannelsProps;
  telegram?: TelegramStatus;
  telegramAccounts: ChannelAccountSnapshot[];
  accountCountLabel: unknown;
}) {
  const { props, telegram, telegramAccounts, accountCountLabel } = params;
  const hasMultipleAccounts = telegramAccounts.length > 1;

  const renderAccountCard = (account: ChannelAccountSnapshot) => {
    const probe = account.probe as { bot?: { username?: string } } | undefined;
    const botUsername = probe?.bot?.username;
    const label = account.name || account.accountId;
    return html`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${botUsername ? `@${botUsername}` : label}
          </div>
          <div class="account-card-id">${account.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Запущен</span>
            <span>${account.running ? "Да" : "Нет"}</span>
          </div>
          <div>
            <span class="label">Настроен</span>
            <span>${account.configured ? "Да" : "Нет"}</span>
          </div>
          <div>
            <span class="label">Последнее входящее</span>
            <span>${account.lastInboundAt ? formatAgo(account.lastInboundAt) : "н/д"}</span>
          </div>
          ${
            account.lastError
              ? html`
                <div class="account-card-error">
                  ${account.lastError}
                </div>
              `
              : nothing
          }
        </div>
      </div>
    `;
  };

  return html`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">Статус бота и конфигурация канала.</div>
      ${accountCountLabel}

      ${
        hasMultipleAccounts
          ? html`
            <div class="account-card-list">
              ${telegramAccounts.map((account) => renderAccountCard(account))}
            </div>
          `
          : html`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Настроен</span>
                <span>${telegram?.configured ? "Да" : "Нет"}</span>
              </div>
              <div>
                <span class="label">Запущен</span>
                <span>${telegram?.running ? "Да" : "Нет"}</span>
              </div>
              <div>
                <span class="label">Режим</span>
                <span>${telegram?.mode ?? "н/д"}</span>
              </div>
              <div>
                <span class="label">Последний запуск</span>
                <span>${telegram?.lastStartAt ? formatAgo(telegram.lastStartAt) : "н/д"}</span>
              </div>
              <div>
                <span class="label">Последняя проверка</span>
                <span>${telegram?.lastProbeAt ? formatAgo(telegram.lastProbeAt) : "н/д"}</span>
              </div>
            </div>
          `
      }

      ${
        telegram?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${telegram.lastError}
          </div>`
          : nothing
      }

      ${
        telegram?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Проверка ${telegram.probe.ok ? "ок" : "не пройдена"} ·
            ${telegram.probe.status ?? ""} ${telegram.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "telegram", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Проверить
        </button>
      </div>
    </div>
  `;
}
