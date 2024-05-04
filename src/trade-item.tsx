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

// Borrowed from https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
// Wanted a simpler/lighter solution to avoid having to import Moment.js
// Modified to accept a timestamp as input.
export function getFullTimestamp(timestamp: number): string {
    const pad = (n: number ,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date(timestamp);
    
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

export default function TradeItem(props: {tradeItemData: RawTradeItem}) {
    const { tradeId, time, price, instrumentPair, quantity } = getTransformedTradeItem(props.tradeItemData);
    return (
        <li className="table-row">
            <div className="cell-trade-id">
                <span aria-label="Trade ID">{tradeId}</span>
            </div>
            <div className="cell-price">
                <span aria-label="Price">{price}</span>
            </div>
            <div className="cell-quantity">
                <span aria-label="Quantity">{quantity}</span>
            </div>
            <div className="cell-time">
                <span aria-label="Time">{getFullTimestamp(time)}</span>
            </div>
        </li>
    )
}
