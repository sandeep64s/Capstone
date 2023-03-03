import moment from "moment";
import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
const log = console.log;

export const logger = (req: Request, res: Response, next: NextFunction) => {
  let now = `[${chalk.green(moment().format("HH:mm:ss"))}]`;
  let method = chalk.magenta(req.method);
  let route = chalk.blue(req.url);
  res.on("finish", function (this: Response) {
    let code;
    if (this.statusCode >= 100 && this.statusCode < 200) {
      code = chalk.yellow(this.statusCode);
    } else if (this.statusCode >= 200 && this.statusCode < 300) {
      code = chalk.green(this.statusCode);
    } else if (this.statusCode >= 300 && this.statusCode < 400) {
      code = chalk.blue(this.statusCode);
    } else if (this.statusCode >= 400 && this.statusCode < 500) {
      code = chalk.red(this.statusCode);
    } else if (this.statusCode >= 500) {
      code = chalk.red(this.statusCode);
    }
    log(`${now} ${code} ${method} ${route}`);
  });
  next();
};

export const customLogger = (type: string, message: string) => {
  let now = `[${chalk.green(moment().format("HH:mm:ss"))}]`;
  switch (type) {
    case "info":
      log(`${now} ${chalk.blue(message)}`);
      break;
    case "error":
      log(`${now} ${chalk.red(message)}`);
      break;
    case "success":
      log(`${now} ${chalk.green(message)}`);
      break;
    case "warning":
      log(`${now} ${chalk.yellow(message)}`);
      break;
    default:
      log(`${now} ${chalk.blue(message)}`);
      break;
  }
};
