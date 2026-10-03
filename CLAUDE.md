# CLAUDE.md — Flight Price Notifier (機票降價通知)

請用繁體中文對話。回答先講結論再講理由；法規或需要事實依據的事項不要臆測。

## 專案概況

- 產品：設定航線與目標價，機票降價就 email 通知（台北出發 → 東京 / 首爾）。
- 技術：Vite + React 19 靜態 SPA、react-router 7、Tailwind v4、shadcn/ui、TanStack Query、Supabase JS。套件管理用 **bun**（`bun.lock`），不要提交 `package-lock.json`。
- 原本在 Lovable 建置，已完全移除 Lovable / Lovable Cloud 相關檔案與引用，請勿加回。

## 部署

- GitHub：`cyn1028-png/pixel-perfect`，push 到 `main` → Vercel 自動部署。
- Vercel 專案 `pixel-perfect`（prj_E145LrV1Y2gcA010Wj18zopYgcUI，team team_XM5TedYh10pteCQxHpuiL49z）。
- `vercel.json` 已設定 SPA rewrite。

## 後端 / Supabase

- 自有 Supabase 專案 `fhzklxkuqypuvagkvqds`（"flight-price-001"，ap-south-1）。
- 環境變數：`VITE_SUPABASE_URL`、`VITE_SUPABASE_PUBLISHABLE_KEY`（sb_publishable_*）。本機放 `.env`，Vercel 上也有設定。注意變數名稱拼字（曾因打成 `SUBLISHABLE` 導致 Invalid API key）。
- 程式只有一個 `createClient`（`src/integrations/supabase/client.ts`，讀 `import.meta.env`）。
- public schema 目前是空的；登入 / 註冊走 Supabase Auth（email + password）。

## 程式結構

- 路由：`src/App.tsx`；受保護路由用 `src/components/layout/RequireAuth.tsx`。
- 頁面：`src/pages/`（Landing、Auth、App 儀表板、NotFound、Error）。
- 視覺主題：秋日繪本風（暖米色紙紋底、墨褐字、鏽橘圍巾主色、芥末黃大衣 / 楓紅 / 赭黃點綴，Young Serif + Nunito，中文 LXGW WenKai TC）。色彩 token 在 `src/styles.css`，裝飾 SVG（葉子、小黑鳥、蘆葦、地平線）在 `src/components/decor/Autumn.tsx`。改 UI 時沿用這套 token，不要另起配色。

## 驗證

- `bun run typecheck`（或 `npx tsc --noEmit`）與 `bun run build` 必須通過再 push。

## 待辦

- Vercel 環境變數目前只設 Production，需加到 Preview。
- Supabase Auth → URL Configuration 的 Site URL / Redirect URLs 改成 Vercel 網域。
- 下一個里程碑：儀表板加上「訂閱航線」功能。
