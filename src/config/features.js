/**
 * Feature flags (Vite: only env vars prefixed with VITE_ are exposed).
 *
 * Assistant chat: set `VITE_ENABLE_CHAT_WIDGET=true` in `.env` / hosting env
 * when you want the floating assistant visible to the public. Otherwise it stays off.
 */
export const isChatWidgetEnabled = import.meta.env.VITE_ENABLE_CHAT_WIDGET === 'true';
