const WebSocket = require("ws");
const rpc = require("./rpc");

const PORT = 5004;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message.toString());
            if (data && data.type === "game" && data.roomName) {
                rpc.updateActivity(data);
            }
        } catch (e) {}
    });
});

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) ws.ping();
    });
}, 30000);
