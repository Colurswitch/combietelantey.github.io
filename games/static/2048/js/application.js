// Wait till the browser is ready to render the game (avoids glitches)
var gm;
window.onload = function() {
  gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
};