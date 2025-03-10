import { getInstrumentPairLabel } from "../helpers";
import { InstrumentPairs } from "../types";

export interface InstrumentPairSelectorButtonProps {
    instrumentPair: InstrumentPairs,
    onClickCallback: (event: string) => void;
}

export default function InstrumentPairSelectorButton(props: InstrumentPairSelectorButtonProps) {
    const { instrumentPair, onClickCallback } = props;
    return (
        <div
            className="selector-button"
            data-testid="instrument-pair-selector-button-container"
        >
            <button
                onClick={(event) => {
                    event.preventDefault();
                    onClickCallback(event.currentTarget.textContent as string)
                }}
                aria-roledescription="Instrument pair selector button"
                data-testid="instrument-pair-selector-button"
            >
                {getInstrumentPairLabel(instrumentPair)}
            </button>
        </div>
    )
}