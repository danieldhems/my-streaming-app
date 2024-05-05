import { getTransformedTradeItem, getFormattedTimeString } from "./helpers";
import { RawTradeItem } from "./types";

export default function TradeItem(props: { tradeItemData: RawTradeItem }) {
    const { tradeId, time, price, quantity } = getTransformedTradeItem(props.tradeItemData);
    return (
        <li className="table-row" role="trade-item">
            <div className="table-cell table-cell-trade-id">
                <span aria-label="Trade ID">{tradeId}</span>
            </div>
            <div className="table-cell table-cell-price">
                <span aria-label="Price">{price}</span>
            </div>
            <div className="table-cell table-cell-quantity">
                <span aria-label="Quantity">{quantity}</span>
            </div>
            <div className="table-cell table-cell-time">
                <span aria-label="Time">{getFormattedTimeString(time)}</span>
            </div>
        </li>
    )
}
