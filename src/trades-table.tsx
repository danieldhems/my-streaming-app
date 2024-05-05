import React from 'react';
import TradeItem from './trade-item';
import { RawTradeItem } from './types';

export default function TradesTable(props: { trades: RawTradeItem[] }) {
    return (
        <div id="trades-table" role="trades-table">
            <div id="trades-table-header" className="table-row">
                <div className="table-header-cell table-cell table-cell-trade-id" data-testid="table-header-cell-trade-id">
                    <label>Trade ID</label>
                </div>
                <div className="table-header-cell table-cell table-cell-price" data-testid="table-header-cell-price">
                    <label>Price</label>
                </div>
                <div className="table-header-cell table-cell table-cell-quantity" data-testid="table-header-cell-quantity">
                    <label>Quantity</label>
                </div>
                <div className="table-header-cell table-cell table-cell-time" data-testid="table-header-cell-time">
                    <label>Time</label>
                </div>
            </div>
            <div id="trades-table-body">
                <ul>
                    {props.trades.map((message: RawTradeItem, index: number) => (
                        <TradeItem tradeItemData={message} key={index}></TradeItem>
                    ))}
                </ul>
            </div>
        </div>
    )
}