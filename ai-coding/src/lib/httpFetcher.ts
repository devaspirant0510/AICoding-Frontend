import {QueryFunctionContext} from "@tanstack/react-query";
import api from "./axiosSettings.ts";
import axios from "axios";
import useAuthStore from "../store/AuthStore.ts";

const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try{
        const {accessToken} = useAuthStore.getState()
        console.log(queryContext)
        const keys = queryContext.queryKey.join("/")
        console.log(keys)
        const result = await api.get(`${keys}`,{
        })
        console.log(result)
        return result.data as T;
    }catch(err){
        console.log(err)
    }
}
export default httpFetcher;