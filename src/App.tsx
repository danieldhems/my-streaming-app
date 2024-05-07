import { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import TradesTable from './TradesTable/trades-table';
import { ConnectionStatus, InstrumentPairs, RawTradeItem } from './types';
import InstrumentPairSelector from './InstrumentPairSelector/instrument-pair-selector';
import { getInstrumentPairLabel, sanitiseInstrumentPairLabel } from './helpers';
import ConnectionStatusInfo from './ConnectionStatusInfo/connection-status-info';

function App() {
  const [currentInstrumentPair, setInstrumentPair] = useState(InstrumentPairs.BNBBTC);

  const [socketUrl, setSocketUrl] = useState("wss://stream.binance.com:9443/ws/" + currentInstrumentPair.toLowerCase() + "@trade");

  const [messageHistory, setMessageHistory] = useState<RawTradeItem[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      /**
       * Convert raw trade data string to object and prepend to existing message array.
       * This should keep the newest trades on top in the UI without having to 
       * carry out a potentially expensive sort operation (considering how 
       * messages are likely come in).
       */
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
    [ReadyState.CONNECTING]: ConnectionStatus.Connecting,
    [ReadyState.OPEN]: ConnectionStatus.Open,
    [ReadyState.CLOSING]: ConnectionStatus.Closing,
    [ReadyState.CLOSED]: ConnectionStatus.Closed,
    [ReadyState.UNINSTANTIATED]: ConnectionStatus.Uninstantiated,
  }[readyState];

  return (
    <div>
      <ConnectionStatusInfo connectionStatus={connectionStatus} socketUrl={socketUrl}></ConnectionStatusInfo>
      {
        lastMessage && <span>Last message: {lastMessage.data}</span>
      }
      <InstrumentPairSelector onClickCallback={onInstrumentPairChange}></InstrumentPairSelector>
      <h2>
        Latest trades for instrument pair: {getInstrumentPairLabel(currentInstrumentPair)}
      </h2>
      <TradesTable trades={messageHistory}></TradesTable>
    </div>
  );
}

export default App;
