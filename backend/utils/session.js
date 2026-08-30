import crypto from 'crypto';
import client from '../config/redis.js';

const session_ttl = 60 * 60 * 24 * 7;  // 7 days

export const createSession = async (userId) => {
  const sessionId = crypto.randomUUID();

  const userSessionsKey = `user:sessions:${userId}`;

  const allSessions = await client.sMembers(userSessionsKey);

  if (allSessions.length >= 2) {
    const oldSessionId = allSessions[0];

    await client.del(`session:${oldSessionId}`);
    await client.sRem(userSessionsKey, oldSessionId);
  }

  await client.set(
    `session:${sessionId}`,
    userId.toString(),
    { EX: session_ttl }
  );

  await client.sAdd(userSessionsKey, sessionId);

  return sessionId;
};
