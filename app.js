const express = require("express");
const itemRouter = require("./routes/items/items");
const userRouter = require("./routes/users/users");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/api", itemRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}...`);
});
