import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('Variavel DATABASE_URL nao configurada no .env.');
}

const databaseUrl = new URL(connectionString);
const hostname = databaseUrl.hostname.toLowerCase();
const isLocalDatabase =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1';

const pool = new pg.Pool({
    connectionString,
    keepAlive: true,
    ssl: isLocalDatabase
        ? false
        : {
              rejectUnauthorized: false,
          },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
