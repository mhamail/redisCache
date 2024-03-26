// @ts-nocheck
import User from "../model/user";
import { Request, Response } from "express";
import { redis } from "../../lib/redisconn";
import { createClient } from "redis";
import util from "util";
import { Aggregate } from "mongoose";
import mongoose from "mongoose";
import { skip } from "node:test";

const model = User;
let modelName = model.modelName;

export const create = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      email,
      phone,
    }: { userName: string; email: string; phone: string } = req.body;

    const user = new model({ userName, email, phone });

    const response: any = await user.save();
    res.json({ message: "User Create Successfully", data: response });
  } catch (err) {
    console.log(err);
  }
};
// _id:new mongoose.Types.ObjectId("6600c9cd3985176abe505e60")
export const list = async (req: Request, res: Response) => {
  try {
    const pipeline: any[] = [
      {
        $match: {},
      },
    
    ];
    // @ts-ignore
    // const data = await model.find({}).cache();
    const data = await model.aggregate(pipeline).cache();
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while connecting to Redis." });
  }
};
