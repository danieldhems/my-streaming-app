import { mockRawTrades } from "../__mocks__/mock-trades"
import { INSTRUMENT_PAIR_LABEL_SEPERATOR } from "./constants";
import { getFormattedTimeString, getInstrumentPairLabel, getTransformedTradeItem } from "./helpers";
import { TransformedTradeItem } from "./types";

describe("Helpers", () => {
    describe("getTransformedTradeItem", () => {
        test("Should return a trade item with the correct shape", () => {
            const rawTradeItem = mockRawTrades[0];
            const expected = {
                tradeId: 1234,
                instrumentPair: "BNBBTC",
                quantity: "567",
                time: 1714911713,
                price: "111",
            }
            expect(getTransformedTradeItem(rawTradeItem)).toStrictEqual<TransformedTradeItem>(expected);
        })
    })
    describe("getFormattedTimeString", () => {
        test("Should return a time string in the format hh:mm:ss", () => {
            const input = 1714911713;
            const expected = "21:21:51";
            expect(getFormattedTimeString(input)).toBe<string>(expected);
        })
    })

    describe("getInstrumentPairLabel", () => {
        test("Should insert a separator into the string provided and return it", () => {
            expect(getInstrumentPairLabel("BNBBTC")).toBe("BNB" + INSTRUMENT_PAIR_LABEL_SEPERATOR + "BTC")
        })
    })
})