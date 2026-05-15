import { SquareError } from "square";
import logger from "@/util/logger";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { callGetCart } from "./cartApi";
import _ from "lodash";

type ErrorCarrier = {
  errors?: unknown[];
};

export const processRes = async <T>(
  res: T | SquareError | ErrorCarrier,
  successLog?: string,
  errorLog?: string,
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

export const getInitialItems = async (cookies?: ReadonlyRequestCookies) => {
  let init = {
    order: {
      locationId: "",
    },
    imageMap: {},
    options: [],
    relatedObjects: [],
  };
  if (!cookies) return init;

  const id = cookies.get("cartId")?.value;

  if (id) {
    init = _.defaults(await callGetCart(id), init);
  }

  return init;
};
