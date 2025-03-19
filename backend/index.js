import express from 'express';
import dotenv from 'dotenv'
import cluster from 'cluster';
import os from 'os'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { QueRouter } from './routes/ques.route.js';
import { userRouter } from './routes/user.route.js';
dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {

    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin:['http://localhost:3000',"http://192.168.4.53:3000",'*'], 
        // origin:'*',
        methods:['GET','POST'],
        credentials:true,
    }))

    // endpoints    
    app.use('/api/que', QueRouter);
    app.use('/api/user', userRouter);
    

    app.listen(process.env.PORT, (req, res) => {
        console.log('api working on port', process.env.PORT);
    })


}

