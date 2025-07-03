// Example Chillnet plugin
function manifest() {
    return {
        name: "Example Plugin",
        author: "celan",
        version: "1.0.0",
        description: "A simple example plugin for Chillnet.",
    };
}

function onstart() {
    cn.toast("info", "Example plugin loaded.");
}