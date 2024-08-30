import { cleanEnv, str } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    PORT: str(),
  });
}

export default validateEnv;
