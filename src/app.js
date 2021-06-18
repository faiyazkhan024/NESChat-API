const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const rootRouter = require("./routers");
const userRouter = require("./routers/user");
// const roomRouter = require("./routers/room");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(rootRouter);
app.use("/user", userRouter);
// app.use("/room", roomRouter);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
