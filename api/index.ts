import { ApiError, ApiResponse } from "square";
import logger from "util/logger";

export const processRes = async <T> (
  res: ApiResponse<T> | ApiError,
  successLog?: string,
  errorLog?: string
) => {
  if ("errors" in res) {
    logger.error({
      msg: errorLog,
      result: res.errors,
    });
  } else {
    logger.info({
      msg: successLog,
      result: res.result,
    });
  }

};
