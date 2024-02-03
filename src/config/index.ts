import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT
    ? parseInt(process.env.SERVER_PORT, 10)
    : process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS: {
    HOST: process.env.REDIS_HOST as string,
    PORT: process.env.REDIS_PORT as unknown as number,
    PASSWORD: process.env.REDIS_PASSWORD as string,
  }
};
