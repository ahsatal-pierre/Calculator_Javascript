// TO DO :
// Round when too many  numbers after commas : try at Line 67
// backspace keyboard working


// Variables globales
// Display element

const displayElement = document.querySelector("#ecran");

// first move stored
let precedent = 0;

// display
let display = "";

// operation stored
let operation = null;

window.onload = () => {
  // listen the clicks
  let touches = document.querySelectorAll(".button");
  // and launch calculation
  for (let touche of touches) {
    touche.addEventListener("click", handleTouches);
  }

  // listen the keys
  document.addEventListener("keydown", handleTouches);
};

// handle the clicks or keysdown
function handleTouches(event) {
  let touche;

  // list of keys
  const listTouches = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "Enter",
    "Backspace",
    "Delete",
    "Escape",
  ];

  if (event.type === "keydown") {
    if (listTouches.includes(event.key)) {
      event.preventDefault();
      // choice stored
      touche = event.key;
    }
  } else {
    touche = this.innerText;
  }

  if (parseFloat(touche) >= 0 || touche === ".") {
    // only on dot allowed
    // update the display
    if (touche === "." && display.includes(".")) return;
    display = display === "" ? touche.toString() : display + touche.toString();
    if (touche.length > 10) touche = touche.substring(0, 2);
    displayElement.innerText = display;
  } else {
    switch (touche) {
      // clear
      case "C":
      case "Escape":
        precedent = 0;
        display = "";
        operation = null;
        displayElement.innerText = 0;
        break;
      // calculs
      case "+":
      case "-":
      case "*":
      case "/":
        // calcul result of first move
        precedent =
          precedent === 0
            ? parseFloat(display)
            : calculer(precedent, parseFloat(display), operation);
        // store the operation
        operation = touche;
        // update the screen
        displayElement.innerText = precedent + " " + operation;
        // update display
        display = "";
        break;
      case "=":
      case "Enter":
        // calcul result of first move
        precedent =
          precedent === 0
            ? parseFloat(display)
            : calculer(precedent, parseFloat(display), operation);
        // update the screen
        displayElement.innerText = precedent;
        // update display
        display = precedent;
        precedent = 0;
        break;
      default:
        break;
    }
  }
}

function calculer(nb1, nb2, operation) {
  nb1 = parseFloat(nb1);
  nb2 = parseFloat(nb2);
  if (operation === "+") return nb1 + nb2;
  if (operation === "-") return nb1 - nb2;
  if (operation === "*") return nb1 * nb2;
  if (operation === "/") return nb1 / nb2;
}
