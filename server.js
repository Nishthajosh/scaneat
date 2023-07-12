import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import qrcoderoute from './routes/qrcoderoute.js'
import cors from "cors";
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//configure env
dotenv.config();

//databse config
connectDB();
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const sslOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
// };
// const server = https.createServer(sslOptions, app);
//routes
// const qr=require('./routes/qrcoderoute.js');
// const salesbytime=require('./routes/orderbytimeRoutes.js');

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// app.use('/qr',qrcoderoute);
// app.use('/salesbytime',salesbytime);


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});
8
//PORT
const PORT = process.env.PORT || 8080;

//run listen
// server.listen(PORT, () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
