//variables
const theButtons = document.querySelectorAll("#buttonHolder img"),
  puzzleBoard = document.querySelector(".puzzle-board"),
  puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
  dropZones = document.querySelectorAll(".drop-zone"),
  resetButton = document.querySelector("#resetBut");
//store the dragged piece in a global variable
//we will need it in the handleDrop function
let draggedPiece;

function changeBGImage() {
  //console.log("changeBGImage called");
  //url('../images/backGround0.jpg');
  puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}

function handleStartDrag() {
  console.log("working");
  //console.log("Started dragging this piece:", this)
  draggedPiece = this;
}

function handleDragOver(e) {
  e.preventDefault();
  //this will prevent the default dragover behaviour
  //e is short for event, could be e, evt a well
  console.log("dragged over me");
}

function handleDrop(e) {
  e.preventDefault();
  console.log("dropped something on me");
  //this line moves the dragged piece from the left side of the board
  //into whatever dropzone we choose.

  if (!this.firstChild) {
    this.appendChild(draggedPiece);
  }
}

function updateGameBoard() {
  // erase all images
  let puzzlePiecesDiv = document.querySelector(".puzzle-pieces");
  let images = puzzlePiecesDiv.querySelectorAll("img");
  images.forEach((image) => image.remove());

  let puzzleBoardImages = document.querySelector(".puzzle-board");
  images = puzzleBoardImages.querySelectorAll("img");
  images.forEach((image) => image.remove());

  // change all images

  let firstImage = createImageElement(this.id, "topLeft", "top left");
  firstImage.addEventListener("dragstart", handleStartDrag);
  console.log(firstImage);
  puzzlePiecesDiv.appendChild(firstImage);

  let secondImage = createImageElement(this.id, "topRight", "top right");
  secondImage.addEventListener("dragstart", handleStartDrag);
  puzzlePiecesDiv.appendChild(secondImage);

  let thirdImage = createImageElement(this.id, "bottomLeft", "bottom left");
  thirdImage.addEventListener("dragstart", handleStartDrag);
  puzzlePiecesDiv.appendChild(thirdImage);

  let fourthImage = createImageElement(this.id, "bottomRight", "bottom right");
  fourthImage.addEventListener("dragstart", handleStartDrag);
  puzzlePiecesDiv.appendChild(fourthImage);
}

function createImageElement(imageId, imageName, imageAlt) {
  let image = document.createElement("img");
  image.src = `images/${imageName}${imageId}.jpg`;
  image.className = "puzzle-image";
  image.alt = imageAlt;
  return image;
}

//event Listeners
theButtons.forEach((button) => button.addEventListener("click", changeBGImage));

// update gameboard
theButtons.forEach((button) =>
  button.addEventListener("click", updateGameBoard)
);

puzzlePieces.forEach((piece) =>
  piece.addEventListener("dragstart", handleStartDrag)
);

dropZones.forEach((zone) => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach((zone) => zone.addEventListener("drop", handleDrop));

// reset button function
resetButton.addEventListener("click", function () {
  const puzzleBoard = document.querySelector(".puzzle-board");
  const puzzlePieces = document.querySelector(".puzzle-pieces");

  const images = puzzleBoard.querySelectorAll("img");

  images.forEach((img) => {
    puzzlePieces.appendChild(img);
  });
});
