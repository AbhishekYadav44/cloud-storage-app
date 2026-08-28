import crypto from 'crypto';
import client from '../config/redis';

const session_ttl = 60 * 60 * 24 * 7;  // 7 days

export  const createSession =  async(userId) => {
     const sessionId = crypto.randomUUID()
     await client.set(`session:${sessionId}`, userId.toString() , {EX : session_ttl})
     await client.sAdd(`user:session:${userId}`,sessionId)
      return sessionId;
}

