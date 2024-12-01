import {AccountDto} from "./AccountDto.ts";

export type ResponseLogin  ={
    accessToken:string,
    refreshToken:string,
    user:AccountDto
}