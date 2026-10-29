import { createClient } from "redis";
console.log("hijdsds",process.env.REDIS_PASS)
const client = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "abuzz-lively-youthful-89739.db.redis.io",
    port: 14445,
  }
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err.message);
});

export default client;
