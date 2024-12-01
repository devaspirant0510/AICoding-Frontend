import {ApiError} from "./ApiError.ts";

export type ResponseEntity<T> = {
    success: boolean,
    statusCode:number,
    message:string,
    data:T,
    error:ApiError
}

