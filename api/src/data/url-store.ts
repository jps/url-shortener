/*
CONSIDER: Getting an id at a time isn't ideal as will potentially put undue load
on our db, we could optimise by getting a batch of ids at a time e.g. get 1k
then another 1k etc.
*/
export interface UrlRecord {
  _id: number;
  url: string;
  encodedId: string;
  createdAt: Date;
}

//TODO: Implement
export const getNextUrlId = async (): Promise<number> => {
  return 1000;
};

//TODO: Implement
export const saveUrl = async (url: UrlRecord) => {
  //   const id = await getNextIdFromDatabase();
  //   return id;
  return;
};
