import { InstrumentPairs } from "./types";

export interface InstrumentSelectFieldProps {
    onChangeCallback: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function InstrumentSelectField(props: InstrumentSelectFieldProps) {
    return (
        <div id="instrument-pair-selector">
            <label>Select instrument pair&nbsp;</label>
            <select name="instrument-pair" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.onChangeCallback(event)}>
                {
                    Object.keys(InstrumentPairs).map((pair, index) => {
                        return (<option value={pair} key={index}>{pair.toLowerCase()}</option>)
                    })
                }
            </select>
        </div>
    )
}