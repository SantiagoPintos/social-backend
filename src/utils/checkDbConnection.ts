import { PrismaClient } from '@prisma/client';
import process from 'process';

const prisma = new PrismaClient();

export const checkDbConnection = async () => {
    await prisma.$connect().then(() => {
        console.log('Database connected');
    }).catch((error: Error) => {
        console.log('Error connecting to the database', error);
        process.exit();
    });
}
