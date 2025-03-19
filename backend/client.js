import { createClient } from 'redis';

// export const client = createClient();

export const client =createClient()
  .on('error', (err) => console.log('client error', err))
  .on('ready', () => console.log('client is ready'))
//   .connect();

if(!client.isOpen){
    client.connect();
}

// client.on('error', err => console.log('Redis Client Error', err));

// client.on('error', async err => {
//     console.log('Redis Client Error', err)
// })
// client.on('end', () => {
//     console.log('Redis connection ended');
// })
// client.on('ready', () => {
//     console.log('redis connected')
// })

// await client.connect();