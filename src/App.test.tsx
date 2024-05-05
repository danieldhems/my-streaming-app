import { render, screen } from '@testing-library/react';
// import useWebSocket from '../__mocks__/react-use-websocket';
import App from './App';

const SOCKET_URL = "wss://stream.binance.com:9443/ws/bnbbtc@trade";

describe("My trading app", () => {
  // let wsClient: ReturnType<useWebSocket>;
  beforeEach(() => {
    // wsClient = useWebSocket(SOCKET_URL);
    render(<App />);
  })

  describe("Binance websocket", () => {
    describe("When component loads", () => {
      test("Should open a connection and display the connection status", () => {

      })
    })
  })

  describe("Latest trades header text", () => {
    test("Should render", () => {
      expect(screen.getByText(/Latest trades/i)).toBeInTheDocument();
    })
  })
})
