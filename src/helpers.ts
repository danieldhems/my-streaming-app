import { RawTradeItem, TransformedTradeItem } from "./types";

/**
 * Transform the raw trade data into a usable shape with meaningful field names,
 * including only the fields we need for this exercise.
 * 
 * Field names derived from:
 * https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Aggregate-Trade-Streams
*/
export function getTransformedTradeItem(tradeItem: RawTradeItem): TransformedTradeItem {
    const { a, T, p, s, q } = tradeItem;
    return {
        tradeId: a,
        time: T,
        price: p,
        instrumentPair: s,
        quantity: q,
    }
}

/**
 * Borrowed from https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
 * Wanted a simpler/lighter solution to avoid having to import Moment.js
 * Note: I've modified this to accept a timestamp as input.
 */
export function getFormattedTimeString(timestamp: number): string {
    const pad = (n: number, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date(timestamp);

    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
