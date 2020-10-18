const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  const div = document.getElementById("app");

  ipcRenderer.on("LOAD_FILE", (event, content) => {
    div.innerText = content;
  });
});
