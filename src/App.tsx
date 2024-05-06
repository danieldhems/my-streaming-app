import { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import TradesTable from './trades-table';
import { InstrumentPairs, RawTradeItem } from './types';
import InstrumentPairSelector from './InstrumentPairSelector/instrument-pair-selector';
import { getInstrumentPairLabel, sanitiseInstrumentPairLabel } from './helpers';

function App() {
  const [currentInstrumentPair, setInstrumentPair] = useState(InstrumentPairs.BNBBTC);

  const [socketUrl, setSocketUrl] = useState("wss://stream.binance.com:9443/ws/" + currentInstrumentPair.toLowerCase() + "@trade");

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

  const onInstrumentPairChange = useCallback(
    (instrumentPairName: string) => {
      const sanitisedInstrumentPair = sanitiseInstrumentPairLabel(instrumentPairName);
      setSocketUrl("wss://stream.binance.com:9443/ws/" + sanitisedInstrumentPair.toLowerCase() + "@trade")
      setInstrumentPair(sanitisedInstrumentPair as InstrumentPairs);
    },
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <p>The WebSocket is currently {connectionStatus} (Connected to: {socketUrl})</p>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <InstrumentPairSelector onClickCallback={onInstrumentPairChange}></InstrumentPairSelector>
      <h2>Latest trades for instrument pair: {getInstrumentPairLabel(currentInstrumentPair)}</h2>
      <TradesTable trades={messageHistory}></TradesTable>
    </div>
  );
}

export default App;
