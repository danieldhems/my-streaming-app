import { useCallback } from "react";
import { InstrumentPairs } from "../types";
import InstrumentPairSelectorButton from "../InstrumentPairSelectorButton/instrument-pair-selector-button";

export interface InstrumentPairSelectorProps {
    onClickCallback: (textValue: string) => void;
}

export default function InstrumentPairSelector(props: InstrumentPairSelectorProps) {
    const onSelectorButtonClick = useCallback((instrumentPair: string) => {
        props.onClickCallback(instrumentPair);
    }, [props])

    return (
        <div id="instrument-pair-selector" data-testid="instrument-pair-selector">
            <label data-testid="instrument-pair-selector-label">
                Select instrument pair
            </label>
            <div className="selector-button-container" data-testid="selector-button-container">
                {
                    Object.keys(InstrumentPairs).map((instrumentPair: string, index: number) => (
                        <InstrumentPairSelectorButton
                            instrumentPair={instrumentPair as InstrumentPairs}
                            onClickCallback={onSelectorButtonClick}
                            key={index}></InstrumentPairSelectorButton>
                    ))
                }
            </div>
        </div>
    )
}