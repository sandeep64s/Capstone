import express, { Express } from "express";
import { connectToDatabase } from "./src/db";
import router from "./src/api/v1/routing";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import compression from "compression";
import helmet from "helmet";

import errorHandler from "./src/api/v1/middleware/error-handler.middleware";
import { logger } from "./src/api/v1/middleware/logging"; // Automatic logging route calls

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

//! middleware
// compress all responses
app.use(compression());
// set of security middlewares --> Adds certain headers to the request
app.use(helmet());
// parses json data in the request body
app.use(express.json());
// allows cross-origin requests
app.use(cors());
app.use(function (req, res, next) {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
// Serving static files over api
app.use("/static", express.static("uploads"));

//! Custom middlewares
// Automatic logging route calls in terminal
app.use(logger);
// Team 1 error handler
app.use(errorHandler);

connectToDatabase()
  .then(() => {
    app.use("/api/v1", router);

    if (port)
      app.listen(port, () => {
        console.log(
          `${chalk.greenBright.bgBlack(
            "⚡️ [server] "
          )} Server started at http://localhost:${port}`
        );
      });
    else
      console.log(
        `${chalk.yellowBright.bgBlack(
          "⚡️ [server] "
        )} Server is running at http://localhost:3000`
      );
  })
  .catch((error: Error) => {
    console.error(
      `${chalk.redBright.bgBlack(" 📙 [db] ")} Database connection failed`,
      error
    );
    process.exit();
  });
