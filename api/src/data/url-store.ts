import { collections } from "./connection";

export interface UrlRecord {
  _id: number;
  url: string;
  encodedId: string;
  createdAt: Date;
}

export const saveUrl = async (url: UrlRecord) =>
  await collections.urls.insertOne(url);

export const getRecentUrls = async (limit = 20): Promise<UrlRecord[]> =>
  await collections.urls.find().sort({ createdAt: -1 }).limit(limit).toArray();
