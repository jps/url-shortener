import * as mongoDB from "mongodb";
import { Counter, UrlRecord } from "./";

export const collections: {
  urls?: mongoDB.Collection<UrlRecord>;
  counters?: mongoDB.Collection<Counter>;
} = {};

export const connectToDb = async () => {
  const client = await mongoDB.MongoClient.connect(process.env.DB_CONN_STRING);
  const db = client.db(process.env.MONGO_DB_DATABASE_NAME);

  //TODO: Review we may want to add schema validation here, given we already
  //have validation in the service layer this may be excessive

  collections.urls = db.collection<UrlRecord>("urls");
  collections.counters = db.collection<Counter>("counters");

  // Indexes
  collections.urls.createIndex({ createdAt: 1 });

  console.log(`Successfully connected to database: ${db.databaseName}`);
};
