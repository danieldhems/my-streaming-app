import { render, screen } from '@testing-library/react';
import InstrumentPairSelector from "./instrument-pair-selector"
import { getInstrumentPairLabel } from '../helpers';
import { InstrumentPairs } from '../types';

const mockCallback = jest.fn();

describe("Instrument pair selector", () => {
    beforeEach(() => {
        render(<InstrumentPairSelector onClickCallback={mockCallback}></InstrumentPairSelector>);
    })
    describe("Label", () => {
        test("Should exist", () => {
            const selectLabel = screen.getByTestId("instrument-pair-selector-label");
            expect(selectLabel).toBeInTheDocument();
        })
        test("Should have text", () => {
            const selectLabel = screen.getByTestId("instrument-pair-selector-label");
            expect(selectLabel).toHaveTextContent("Select instrument pair");
        })
    });

    describe("Instrument pair selector buttons", () => {
        test("Should render a button for each instrument pair", () => {
            const buttons = screen.getByTestId("instrument-pair-selector").querySelectorAll(".selector-button");
            expect(buttons.length).toBe(3);
        });
    })

    describe("onChangeCallback", () => {
        test("Should be called when a selector button is clicked", () => {
            const instrumentPairSelectorButtons = screen.getAllByTestId("instrument-pair-selector-button");

            instrumentPairSelectorButtons[0].click();
            expect(mockCallback).toHaveBeenCalledWith(getInstrumentPairLabel(InstrumentPairs.BNBBTC));

            instrumentPairSelectorButtons[1].click();
            expect(mockCallback).toHaveBeenCalledWith(getInstrumentPairLabel(InstrumentPairs.ETHBTC));

            instrumentPairSelectorButtons[2].click();
            expect(mockCallback).toHaveBeenCalledWith(getInstrumentPairLabel(InstrumentPairs.LTCBTC));
        })
    })
})