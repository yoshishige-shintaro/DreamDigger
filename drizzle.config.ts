import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // DB の種類
  schema: "./lib/db/schema.ts", // schema ファイルの場所
  out: "./drizzle", // マイグレーションファイルの場所
  driver: "expo", // ドライバーの種類
});
