const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

// route Files
const bootcamps = require("./routes/bootcamps");

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware

app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
