import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
import chalk from "chalk";

export const connectToDatabase = async () => {
  dotenv.config();

  mongoose.connect(
    process.env.MONGOURI as string,
    { useNewUrlParser: true } as ConnectOptions,
    (err) => {
      if (!err) {
        console.log(
          `${chalk.greenBright.bgBlack(
            "📙 [db] "
          )} Successfully connected to database: ${process.env.DB_NAME}`
        );
      }
    }
  );
};
