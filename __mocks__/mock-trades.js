export const mockRawTrades = [
    {
        a: 1234, // Trade ID
        s: "BNBBTC", // Instrument pair
        q: "567", // Quantity
        T: 1714911713, // timestamp
        p: "111", // Price,
        e: "test",
        E: 123,
        b: 123,
        t: 123,
        m: true,
        M: true,
    },
    {
        a: 5678, // Trade ID
        s: "BNBBTC", // Instrument pair
        q: "123", // Quantity
        T: 1714911722, // timestamp
        p: "222", // Price,
        e: "test",
        E: 123,
        b: 123,
        t: 123,
        m: true,
        M: true,
    },
];

export const mockTransformedTrade = {
    tradeId: 123,
    instrumentPair: "BNBBTC",
    quantity: "123",
    time: 1714909093,
    price: "111",
} 