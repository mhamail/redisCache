
import { Redis } from "ioredis";

const getRedisUrl: any = ()=>{
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL
    }
    throw new Error("Redis is not defined")
}
export const redis = new Redis(getRedisUrl());
