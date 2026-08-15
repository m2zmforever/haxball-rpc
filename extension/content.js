const WS_URL = "ws://localhost:5004";
let ws = null;

function connect() {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
    ws = new WebSocket(WS_URL);
    ws.onclose = () => setTimeout(connect, 6000);
    ws.onerror = () => ws.close();
}

function send(data) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
}

connect();

function injectPageScript() {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("inject.js");
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPageScript);
} else {
    injectPageScript();
}

window.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || !msg.__haxballRpc) return;
    send(msg);
});
