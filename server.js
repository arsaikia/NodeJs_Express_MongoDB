const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// route Files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Dev Logger Middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);

// Handle unhandler promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close Server
  server.close(() => process.exit(1));
});
