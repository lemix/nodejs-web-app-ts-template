import cookieParser from 'cookie-parser'
import path from 'path';
import helmet from 'helmet';
import morgan from "morgan";
import express from 'express';
import 'express-async-errors';

import { Sequelize } from 'sequelize-typescript';
import * as mvc from 'express-mvc-ts';
import { Dialect } from 'sequelize/types';

const dev = process.env.NODE_ENV !== 'production' 
    && process.env.NODE_ENV !== 'prod';

// Init express
const app = express();
import logger from '@shared/Logger'

new Sequelize({
    host: process.env.DB_HOST,
    storage: process.env.DB_STORAGE,
    database: process.env.DB_NAME,
    dialect: <Dialect>process.env.DB_DIALECT || 'sqlite',
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    modelPaths: [__dirname + '/models'],
    logging: (sql) => {
        logger.info(sql);
    }
});

const childProcess = require('child_process');

childProcess.exec('npx sequelize-cli db:migrate', (error: any, stdout: any, stderr: any) => {
    logger.info(stdout);
    if(error) {
        logger.error(stderr);
        return;
    }

    childProcess.exec('npx sequelize-cli db:seed:all', (error: any, stdout: any, stderr: any) => {
        logger.info(stdout);
        if(error)
            logger.error(stderr);
    });
});

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (dev) {
    app.use(morgan('dev'));
}

// Security
if (!dev) {
    app.use(helmet());
}

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.set('view engine', 'pug');
app.set('views', viewsDir);
app.use(express.static(staticDir));
app.use('/manage', express.static(path.join(__dirname, 'public/panel')));

mvc.setup(app, {
    debugRoutes: dev,
    controllerDir: "src/controllers"
});

// Export express instance
export default app;
