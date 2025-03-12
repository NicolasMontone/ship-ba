import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import database from "./index.js";

async function fun() {
  try {
    console.log("🏗️ migration started");
    await migrate(database, {
      migrationsFolder: "drizzle",
    });
    console.log("✅ migration finished");
  } catch (error) {
    console.log("❌ migration failed", error);
    throw error;
  }
}
fun();
