// backend/routes/bookingRoutes.ts
import { Router } from "../deps.ts";
import client from "../db/db.ts";

const router = new Router();

// Get all bookings
router.get("/bookings", async (ctx) => {
  const result = await client.queryObject("SELECT * FROM bookings");
  ctx.response.body = result.rows;
});

// Create a new booking
router.post("/bookings", async (ctx) => {
    try {
        const body = ctx.request.body({ type: "json" });
        const { user_id, service, date } = await body.value;

      await client.queryObject({
        text: "INSERT INTO bookings (user_id, service, date) VALUES ($1, $2, $3)",
        args: [user_id, service, date], // Pass parameters properly
      });
  
      ctx.response.status = 201;
      ctx.response.body = { message: "Booking created successfully!" };
    } catch (_error) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid request data" };
    }
  });
  
export default router;
