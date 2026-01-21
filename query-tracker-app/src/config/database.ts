import { Sequelize } from 'sequelize';

const databaseConfig = {
  database: process.env.DB_NAME || 'your_database_name',
  username: process.env.DB_USER || 'your_database_user',
  password: process.env.DB_PASSWORD || 'your_database_password',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres', // or 'mysql', 'sqlite', etc. based on your choice
};

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  logging: false, // Set to true to enable SQL query logging
});

export default sequelize;