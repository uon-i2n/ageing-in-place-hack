import express, { Express, Request, Response } from 'express';

const app: Express = express(); 

app.get('/', (req: Request, res: Response) => res.send('Hello World'));

const port: number = 8000;
const ipAddress: string = '0.0.0.0';
app.listen(port, ipAddress, () => {
    console.log(`App is running at http://${ipAddress}:${port}`);
})