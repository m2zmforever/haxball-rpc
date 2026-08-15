(() => {
    let savedRoom = null;

    function getRoomName() {
        const el = document.querySelector("h1[data-hook='room-name']");
        const name = el && el.textContent ? el.textContent.trim() : null;
        if (name) savedRoom = name;
        return savedRoom;
    }

    function getScore() {
        const red = document.querySelector("div[data-hook='red-score']");
        const blue = document.querySelector("div[data-hook='blue-score']");
        if (!red || !blue) return null;
        const r = red.textContent.trim();
        const b = blue.textContent.trim();
        if (r === "" || b === "") return null;
        return `${r} - ${b}`;
    }

    let lastRoom = null;
    let lastScore = null;
    let lastSent = 0;

    setInterval(() => {
        const roomName = getRoomName();
        if (!roomName) return;
        const score = getScore();
        const now = Date.now();
        if (roomName === lastRoom && score === lastScore && now - lastSent < 5000) return;
        lastRoom = roomName;
        lastScore = score;
        lastSent = now;
        window.postMessage({ __haxballRpc: true, type: "game", roomName, score }, "*");
    }, 2000);
})();
