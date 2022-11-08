import { encode, decode } from "../encode-decode";

describe("encode-decode", () => {
  const scenarios = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    101,
    1001,
    10001,
    4586310000,//near our last 8 char string
    Number.MAX_SAFE_INTEGER,
  ];
  for (const scenario of scenarios) {
    const encoded = encode(scenario);
    const decoded = decode(encoded);
    test("get same value back", () => {
      expect(decoded).toBe(scenario);
    });
    //Max int id will generate a longer than 8 char string but this is better than failing
    if (scenario === Number.MAX_SAFE_INTEGER) {
      return;
    }
    test(`scenario:"${scenario}" encoded:"${encoded}" should be 8 digits but was:${encoded.length}`, () => {
      expect(encoded.length).toBe(8);
    });
  }
});
