// Interface for the raw trade data
export type RawTradeItem = {
    e: string;
    E: number;
    s: string;
    t: number;
    p: string;
    q: string;
    b: number;
    a: number;
    T: number;
    m: boolean;
    M: boolean;
}

// Interface for the transformed trade data for use in our UI
export type TransformedTradeItem = {
    tradeId: number;
    instrumentPair: string;
    quantity: string;
    time: number;
    price: string;
}
