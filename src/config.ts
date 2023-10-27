import dotenv from 'dotenv'
dotenv.config()

import { cleanEnv, str, port, num } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'staging', 'production', 'test']
  }),
  PORT: port({ default: 5001 }),
  REDIS_URL: str(),
  TAX_URL: str(),
  MONGO_DB_ADMIN: str(),
  MONGO_DB_HOST: str(),
  MONGO_DB_ADMIN_PWD: str(),
});

export default env;
