export const config = () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    database_host: process.env.DATABASE_HOST,
    database_name: process.env.DATABASE_NAME,
  },
});
export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
