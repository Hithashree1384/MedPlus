import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import {clerkMiddleware} from '@clerk/express'
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctorRoutes.js';
import serviceRouter from './routes/serviceRouter.js';
import appointmentRouter from './routes/appointmentRoutes.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';
import aiRoutes from "./routes/aiRoutes.js";



const app=express();
const port = process.env.PORT || 4000;

const allowedOrigins=[
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
   process.env.ADMIN_URL,

]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true); // ✅ TEMP FIX (allow all)
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({limit: '20mb', extended: true}))
app.use(clerkMiddleware());

//DB
connectDB();

//Routes
app.use("/api/doctors",doctorRouter);
app.use("/api/services",serviceRouter);
app.use("/api/appointments",appointmentRouter);
app.use("/api/service-appointments",serviceAppointmentRouter)

app.use("/api/ai", aiRoutes); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
