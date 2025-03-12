import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import client from "./db.ts"; // Import DB connection

const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
  try {
    await client.connect();
    ctx.response.body = { message: "Connected to PostgreSQL!" };
  } catch (error) {
    ctx.response.body = { error: "Database connection failed!" };
  } finally {
    await client.end();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });
