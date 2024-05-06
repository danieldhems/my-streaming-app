import { render, screen } from '@testing-library/react';
import InstrumentPairSelectorButton from './instrument-pair-selector-button';
import { InstrumentPairs } from '../types';

const onSelectorButtonClick = jest.fn();

describe("Instrument Pair Selector button", () => {
    beforeEach(() => {
        render(
            <InstrumentPairSelectorButton
                instrumentPair={InstrumentPairs.BNBBTC}
                currentInstrumentPair={InstrumentPairs.BNBBTC}
                onClickCallback={onSelectorButtonClick}></InstrumentPairSelectorButton>
        )
    })

    test("Should render", () => {
        expect(
            screen.getByTestId("instrument-pair-selector-button-container")
        ).toBeInTheDocument();
    })

    test("Should have label text", () => {
        expect(
            screen.getByTestId("instrument-pair-selector-button")
        ).toHaveTextContent("BNB/BTC");
    })

    describe("When clicked", () => {
        test("Should call the provided callback function, passing the button's text content as an argument", () => {
            const button = screen.getByTestId("instrument-pair-selector-button");
            button.click();
            expect(onSelectorButtonClick).toHaveBeenCalledWith(button.textContent)
        })
    })
})