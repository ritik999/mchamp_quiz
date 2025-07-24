import { createClient } from 'redis';

export const client = createClient();

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('ready', () => console.log('Redis Client is ready'));

(async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.log('redis connection failed', error);
  }
})();
