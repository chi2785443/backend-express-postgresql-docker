import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

import useRouter from "./routes/user.routes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/", useRouter);

//error handlind middlewares
app.use(errorHandling);

//create table before starting server
createUserTable();

//Testinf POSTGRES connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`the database is ${result.rows[0].current_database}`);
});

//server running
app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
