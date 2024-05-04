import React, { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import logo from './logo.svg';
import './App.css';
import TradeItem, { RawTradeItem } from './trade-item';

function App() {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('wss://stream.binance.com:9443/ws/bnbbtc@trade');
  const [messageHistory, setMessageHistory] = useState<RawTradeItem[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      // Convert raw trade data string to object and prepend to existing message array.
      // This should keep the newest trades on top in the UI without having to
      // carry out a potentially expensive sort operation (considering how quickly new messages are likely come in).
      setMessageHistory((prev) => [JSON.parse(lastMessage.data)].concat(prev));
    }
  }, [lastMessage]);

  // TODO: Support requesting different instrument pair for websocket stream.
  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(''),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}

        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <h2>Latest trades</h2>
      <div id="trades-table">
        <div id="trades-table-header" className="table-row">
          <div className="table-header-cell cell-trade-id">
            <label>Trade ID</label>
          </div>
          <div className="table-header-cell cell-price">
            <label>Price</label>
          </div>
          <div className="table-header-cell cell-quantity">
            <label>Quantity</label>
          </div>
          <div className="table-header-cell cell-time">
            <label>Time</label>
          </div>
        </div>
        <div id="trades-table-body">
          <ul>
            {messageHistory.map((message, index) => (
              <TradeItem tradeItemData={message} key={index}></TradeItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
