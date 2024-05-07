import { Fragment } from "react/jsx-runtime";
import { ConnectionStatus } from "../types"

export interface ConnectionStatusProps {
    connectionStatus: ConnectionStatus;
    socketUrl: string;
}

export default function ConnectionStatusInfo(props: ConnectionStatusProps) {
    const { connectionStatus, socketUrl } = props;
    return (
        <Fragment>
            <p data-testid="websocket-connection-status-text">
                The WebSocket is currently&nbsp;
                <span data-testid="websocket-connection-status-indicator">{connectionStatus}</span>
            </p>
            {connectionStatus === ConnectionStatus.Open && <p data-testid="socket-url-label">(Connected to: {socketUrl})</p>}
        </Fragment>
    )
}