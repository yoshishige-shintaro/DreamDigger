import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const DB_NAME = "dream_digger.db";

export const expoDb = openDatabaseSync(DB_NAME, { enableChangeListener: true });
export const drizzleDb = drizzle(expoDb);
