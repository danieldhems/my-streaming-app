import { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import TradesTable from './trades-table';
import { RawTradeItem } from './types';

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
      <TradesTable trades={messageHistory}></TradesTable>
    </div>
  );
}

export default App;
