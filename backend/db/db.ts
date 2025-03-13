import { Client } from "../deps.ts";

const client = new Client({
  user: "kagz03",
  password: "kagz.post",
  database: "my_spa",
  hostname: "localhost",
  port: 5432,
});

export default client;
