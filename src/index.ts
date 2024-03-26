import express from "express";
import dotenv from 'dotenv';
dotenv.config()
import { connectToDatabase } from "./db/conn";
import { mongooseAggregationQuery,mongooseQuery } from "../lib/cache";
connectToDatabase();
mongooseAggregationQuery()
mongooseQuery()
import { userRoutes } from "./routes/user";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

let port = 9000;
app.listen(port, () => {
  console.log(`App is running on port no ${port}`);
});
