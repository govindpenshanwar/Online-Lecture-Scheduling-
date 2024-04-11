import express from 'express';
import router from './routes/routes.js';
import { connect } from './configs/DbConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors({
    origin: "https://online-lecture-scheduling-six.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}))
app.use(express.json());
app.use('/api', router)
app.use(cookieParser());


connect();

app.listen(port, () => {
    console.log(`Server Started on port 4000`);
})