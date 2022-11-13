import Hashids from "hashids/cjs";

const alphabet = "abcdefghijklmnopqrstuvwxyz123456789";
const salt = "p$tSLqJ#98Y29hvtuk53J^g3s$wLwWPPG@YJB6MnW^Ug@%MpEQH%HyzFdtQVZBZE"; //TODO: move this into an environment variable

const hashids = new Hashids(salt, 8, alphabet);

export const encode = (id: number): string => hashids.encode(id);

export const decode = (encodedId: string): number => {
  const decoded = hashids.decode(encodedId).join("");
  return parseInt(decoded, 10);
};
