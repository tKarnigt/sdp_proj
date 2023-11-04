import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import { authRouter } from './routes/authRoute';
import {userRouter} from './routes/userRoute';
import {productRouter} from './routes/productRoute';
import { basketRouter } from './routes/basketRoute';
import { attractionRouter } from './routes/attractionRoute';
import cors from 'cors';

const app:Application = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.static('./'))

// all router
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', basketRouter);
app.use('/', attractionRouter);

// API test
app.get("/", (req:Request,res:Response) => {
    res.send("Action Server").status(404)
})


app.listen(port, () => {
    console.log(`🚀 Server ready on port ${port}`)
})