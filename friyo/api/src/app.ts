import express, { Express, Request, Response } from 'express';
import { Dashboard } from './dashboard';
import cors from 'cors' ;

const app: Express = express(); 

// Middleware
app.use(express.json());
app.use(cors())

Dashboard(app);

const port: number = 8000;
const ipAddress: string = '0.0.0.0';
app.listen(port, ipAddress, () => {
    console.log(`App is running at http://${ipAddress}:${port}`);
})