import { render, screen } from '@testing-library/react';
import App from './App';

describe("My trading app", () => {
  beforeEach(() => {
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
