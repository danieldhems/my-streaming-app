import { render, screen } from "@testing-library/react";
import { ConnectionStatus } from "../types"
import ConnectionStatusInfo from "./connection-status-info"

const mockSocketUrl = "wss://some-socket-url";

describe("Connection status info", () => {
    test("Should display a message", () => {
        render(<ConnectionStatusInfo connectionStatus={ConnectionStatus.Connecting} socketUrl={mockSocketUrl}></ConnectionStatusInfo>);
        const messageElement = screen.getByTestId("websocket-connection-status-text");
        expect(messageElement.textContent).toMatch(/The WebSocket is currently/);
    })

    describe("When a connection is being established", () => {
        test("Should display the relevant connection status message", () => {
            render(<ConnectionStatusInfo connectionStatus={ConnectionStatus.Connecting} socketUrl={mockSocketUrl}></ConnectionStatusInfo>);
            const statusIndicatorText = screen.getByTestId("websocket-connection-status-indicator");
            expect(statusIndicatorText.textContent).toBe(ConnectionStatus.Connecting);
        })
    });

    describe("When a connection has been established", () => {
        test("Should display the relevant connection status message", () => {
            render(<ConnectionStatusInfo connectionStatus={ConnectionStatus.Open} socketUrl={mockSocketUrl}></ConnectionStatusInfo>);
            const statusIndicatorText = screen.getByTestId("websocket-connection-status-indicator");
            expect(statusIndicatorText.textContent).toBe(ConnectionStatus.Open);
        });
        test("Should display the url for the connection", () => {
            render(<ConnectionStatusInfo connectionStatus={ConnectionStatus.Open} socketUrl={mockSocketUrl}></ConnectionStatusInfo>);
            const socketUrlText = screen.getByTestId("socket-url-label");
            expect(socketUrlText.textContent).toBe(`(Connected to: ${mockSocketUrl})`);
        });
    })
})