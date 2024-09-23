import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import userRoutes from './routes/user.js';
import videoRoutes from './routes/video.js';
import commentsRoutes from './routes/comments.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes
app.get('/', (req, res) => {
  res.send("Hello");
});

app.use('/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentsRoutes);

// Database and server connection
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log(error);
  });
