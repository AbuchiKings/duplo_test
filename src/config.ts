import dotenv from 'dotenv'
dotenv.config()

import { cleanEnv, str, port, num } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'staging', 'production', 'test']
  }),
  PORT: port({ default: 5001 }),
});

export default env;
