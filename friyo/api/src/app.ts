import express, { Express, Request, Response } from 'express';
import { Dashboard } from './dashboard';

const app: Express = express(); 

// Middleware
app.use(express.json());

Dashboard(app);

const port: number = 8000;
const ipAddress: string = '0.0.0.0';
app.listen(port, ipAddress, () => {
    console.log(`App is running at http://${ipAddress}:${port}`);
})