var dance = document.getElementById("generate");

function unpress() { dance.classList.remove("pressed"); }

function playSound() {
  dance.classList.add("pressed");
  var delay = 2000;
  setTimeout(unpress,delay);
}
dance.addEventListener('click', function(event) { playSound(); });