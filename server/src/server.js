import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorHandler from './api/v1/middlewares/errorHandler.js';
import API_V1 from './api/v1/index.js';
import ErrorResponse from './api/v1/utils/errorResponse.js';
import {connectToDB} from './config/db.confing.js'

// Load env variables
dotenv.config();
// express app
const app = express();
// Connect to DB
connectToDB();

// log all requests to the console
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());


// @Routes - api/v1/
app.use('/api/v1', API_V1);


// @Error Not Found
app.use((req, res, next) => {
    next(new ErrorResponse( {name: 'Not Found', code:404}, 404));
    
});

// @Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






