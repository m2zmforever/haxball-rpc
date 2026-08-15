const RPC = require("@xhayper/discord-rpc");

const CLIENT_ID = "1536138929856839710";

const client = new RPC.Client({ clientId: CLIENT_ID });

let connected = false;

client.on("ready", () => {
    connected = true;
});

client.on("disconnected", () => {
    connected = false;
    setTimeout(() => client.login().catch(() => {}), 3000);
});

function updateActivity(data) {
    if (!connected) return;
    client.user.setActivity({
        type: 0,
        details: data.roomName || "Haxball",
        state: data.score ? `Red ${data.score} Blue` : "In a match",
        largeImageKey: "haxball",
        largeImageText: "Haxball"
    }).catch(() => {});
}

function clearActivity() {
    if (!connected) return;
    client.user.clearActivity().catch(() => {});
}

client.login().catch(() => {});

module.exports = { updateActivity, clearActivity };
