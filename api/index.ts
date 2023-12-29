import { ApiResponse } from "square";
import logger from "util/logger";

export const processRes = async (
  response: any,
  successLog?: string,
  errorLog?: string
) => {
  if (response.errors) {
    logger.error({
      msg: errorLog,
      result: response,
    });
  } else {
    logger.info({
      msg: successLog,
      result: response,
    });
  }

};
