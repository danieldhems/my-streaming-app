import { render, screen } from '@testing-library/react';
import App from './App';

describe("My trading app", () => {
  describe("Latest trades header text", () => {
    test("Should render", () => {
      render(<App />);
      expect(screen.getByText(/Latest trades/i)).toBeInTheDocument();
    })
  })
})
