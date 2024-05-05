import { render, screen } from '@testing-library/react';
import TradesTable from './trades-table';
import { mockRawTrades } from "../__mocks__/mock-trades.js";

describe("Trades table", () => {
    beforeEach(() => {
        render(<TradesTable trades={mockRawTrades} />);
    })

    describe("When component loads", () => {
        test("Should render", () => {
            expect(screen.getByRole("trades-table")).toBeInTheDocument();
        })
    })
    describe("Header cells", () => {
        describe("Trade ID header cell", () => {
            test("Should render", () => {
                const cell = screen.getByTestId("table-header-cell-trade-id");
                expect(cell).toBeInTheDocument();
                expect(cell).toHaveTextContent("Trade ID");
            })
        })
        describe("Price header cell", () => {
            test("Should render", () => {
                const cell = screen.getByTestId("table-header-cell-price");
                expect(cell).toBeInTheDocument();
                expect(cell).toHaveTextContent("Price");
            })
        })
        describe("Quantity header cell", () => {
            test("Should render", () => {
                const cell = screen.getByTestId("table-header-cell-quantity");
                expect(cell).toBeInTheDocument();
                expect(cell).toHaveTextContent("Quantity");
            })
        })
        describe("Time header cell", () => {
            test("Should render", () => {
                const cell = screen.getByTestId("table-header-cell-time");
                expect(cell).toBeInTheDocument();
                expect(cell).toHaveTextContent("Time");
            })
        })
    })

    describe("Trade items", () => {
        test("Should render", () => {
            const tradeItems = screen.getAllByRole("trade-item");
            expect(tradeItems[0]).toBeInTheDocument();
            expect(tradeItems[1]).toBeInTheDocument();
        })
    })
})
