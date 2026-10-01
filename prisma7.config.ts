/**
 * NSC Finance Honda — Prisma 7 Configuration (prisma7.config.ts)
 *
 * Dokumentasi Prisma 7 TS Config: https://pris.ly/prisma-7-config
 *
 * CATATAN:
 * - Menggunakan BAWaan `env()` dari "prisma/config" (OTOMATIS load .env.local)
 *   → TIDAK MEMBUTUHKAN package tambahan dotenv.
 * - Schema menunjuk ke: prisma/schema.prisma
 * - Migration directory: prisma/migrations
 * - Datasource url = env("DATABASE_URL")  (TANPA hardcode credential)
 */

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
