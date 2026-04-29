import { Square } from "square";

export const isSuccessfulSquareApiCall = <T extends object> (res: T | Square.Error_): res is T => !("code" in res)