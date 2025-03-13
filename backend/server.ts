export { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import userRoutes from "./routes/userRoutes.ts";
import bookingRoutes from "./routes/bookingRoutes.ts";
import { Application, Router } from "./deps.ts";


const app = new Application();
const router = new Router();

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use(bookingRoutes.routes());
app.use(bookingRoutes.allowedMethods());


app.use(router.routes());
app.use(router.allowedMethods());

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });
