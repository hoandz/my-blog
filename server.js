import express from "express";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/index.js";
dotenv.config();
import connect from "./database/database.js";
const app = express();
app.use(express.json());
app.use("/users", userRouter);
// set port, listen for requests
const PORT = 8080;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on port ${PORT}.`);
});
