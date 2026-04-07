import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import authRoutes from "./routes/auth.routes";

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.error(err));