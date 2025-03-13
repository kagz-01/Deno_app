import { Router } from "../deps.ts";
import client from "../db/db.ts";

const router = new Router();

router.post("/users", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "json" });
    const { username, email, password } = await body.value;

    if (!username || !email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing required fields." };
      return;
    }

    // ✅ Fix: Wrap parameters in an array
    await client.queryObject(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
      [username, email, password]
    );

    ctx.response.status = 201;
    ctx.response.body = { message: "User added successfully!" };
  } catch (error) {
    console.error("Database error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create user." };
  }
});


  
export default router;
