import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

// ✅ Connect Database
await connectDB();

// ✅ Allow requests from frontend
app.use(cors({
  origin: "https://ridex-orpin.vercel.app",
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => res.send("Server is running"));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
