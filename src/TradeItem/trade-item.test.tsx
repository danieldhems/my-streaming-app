import { render, screen } from '@testing-library/react';
import { mockRawTrades } from "../../__mocks__/mock-trades.js";
import TradeItem from './trade-item';

describe("Trade item", () => {
    let tradeItemElement: HTMLElement;
    beforeEach(() => {
        render(<TradeItem tradeItemData={mockRawTrades[0]} />);
        tradeItemElement = screen.getByTestId("trade-item");
    })

    describe("When component loads", () => {
        test("Should render", () => {
            expect(tradeItemElement).toBeInTheDocument();
        })
    })
    describe("Trade ID cell", () => {
        test("Should render", () => {
            const cell = tradeItemElement.querySelector(".table-cell-trade-id");
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent("1234");
        })
    })
    describe("Price cell", () => {
        test("Should render", () => {
            const cell = tradeItemElement.querySelector(".table-cell-price");
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent("111");
        })
    })
    describe("Quantity cell", () => {
        test("Should render", () => {
            const cell = tradeItemElement.querySelector(".table-cell-quantity");
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent("567");
        })
    })
    describe("Time cell", () => {
        test("Should render", () => {
            const cell = tradeItemElement.querySelector(".table-cell-time");
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent("21:21:51");
        })
    })
})
