import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  store_id: process.env.STORE_ID,
  store_pass: process.env.STORE_PASS,
  success_url:
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_SUCCESS_URL
      : process.env.SUCCESS_URL,
  fail_url:
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_SUCCESS_URL
      : process.env.FAIL_URL,
  cancel_url:
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_CANCEL_URL
      : process.env.CANCEL_URL,
};
