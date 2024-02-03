import { createClient } from 'redis';
import config from "@/config";

export const client = createClient({
    password: config.REDIS.PASSWORD,
    socket: {
        host: config.REDIS.HOST,
        port: config.REDIS.PORT
    }
});