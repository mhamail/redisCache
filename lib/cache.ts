import mongoose from "mongoose";
import { redis } from "./redisconn";
import { prototype } from "events";
const execAggregate = mongoose.Aggregate.prototype.exec;
const exec = mongoose.Query.prototype.exec;

// @ts-ignore
mongoose.Aggregate.prototype.cache = function () {
  this.useCache = true;
  return this;
};
export const mongooseAggregationQuery = () => {
  mongoose.Aggregate.prototype.exec = async function () {
    if (!this.useCache) {
      return execAggregate.apply(this, arguments);
    }
    // console.log("I am inside a mongo Aggregation query function");
    // console.log("aggregation", this._pipeline);
    const key = JSON.stringify(this._pipeline);
    // console.log(key)
    const cacheValue = await redis.get(key);
    if (cacheValue) {
      console.log("aggregation cache");
      return JSON.parse(cacheValue);
    }

    const result = await execAggregate.apply(this, arguments);
    redis.set(key, JSON.stringify(result));
    return result;
  };
};

// @ts-ignore
mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

export const mongooseQuery = () => {
  mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }
    // console.log("I am inside a mongo query function");
    // console.log("query filter", this.getQuery());
    // console.log("query", this.mongooseCollection.name);
    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    );
    // console.log(key)
    const cacheValue = await redis.get(key);
    if (cacheValue) {
      console.log("query cache");
      const doc = JSON.parse(cacheValue);
      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    }
    const result = await exec.apply(this, arguments);
    // console.log(result)
    redis.set(key, JSON.stringify(result));
    return result;
  };
};
