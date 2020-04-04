const dotenv = require('dotenv');

const config = {};

let env = 'development'

if(process.env.NODE_ENV === 'production' 
    || process.env.NODE_ENV === 'prod') env = 'production';
else if (process.env.NODE_ENV === 'test') env = 'test';

const result = dotenv.config({
    path: `./env/${env}.env`,
});
if (result.error) {
    throw result.error;
}
config[env] =  {
    host: process.env.DB_HOST,
    storage: process.env.DB_STORAGE,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'sqlite',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data"
};

module.exports = config;