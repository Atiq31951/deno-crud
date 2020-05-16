// Packages
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import "https://deno.land/x/dotenv/mod.ts";
// import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

import {
  CreateUserController,
  AllUserController,
  ParticularUserController,
  UpdateUser,
  DeleteUser,
} from "./controllers/index.js";

const app = new Application();
const route = new Router()

route.post('/user/create', CreateUserController);
route.get('/user/all', AllUserController);
route.get("/user/one/:id", ParticularUserController);
route.post("/user/update/:id", UpdateUser);
route.post("/user/delete/:id", DeleteUser);

const PORT = Deno.env.get("PORT") || 4000;
app.use(route.routes())
app.use(route.allowedMethods())
console.log('PORT ===> ', PORT)
await app.listen({ port: PORT });
