import { SquareError } from "square";
import logger from "@/util/logger";

type ErrorCarrier = {
  errors?: unknown[];
};

export const processRes = async <T> (
  res: T | SquareError | ErrorCarrier,
  successLog?: string,
  errorLog?: string
) => {
  if (res instanceof SquareError) {
    logger.error({
      msg: errorLog,
      result: res.message,
    });
  } else if (typeof res === "object" && res !== null && "errors" in res) {
    logger.error({
      msg: errorLog,
      result: (res as ErrorCarrier).errors,
    });
  } else {
    logger.info({
      msg: successLog,
      result: res,
    });
  }

};
