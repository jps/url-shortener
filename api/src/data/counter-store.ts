import { collections } from "./connection";

export interface Counter {
  _id: string;
  seq: number;
}

export const getNextInSequence = async (
  sequenceName: string
): Promise<number> => {
  const sequenceDocument = await collections.counters.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      returnDocument: "after",
    }
  );
  return sequenceDocument.value.seq;
};
