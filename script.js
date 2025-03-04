const allBoards = document.querySelectorAll(".board");
const cards = document.querySelectorAll(".todo-cards");
const addNewCardBtn = document.getElementById("add-new-card");
const todoCount = document.getElementById("todo-count");
const inProgressCount = document.getElementById("in-progress-count");
const doneCount = document.getElementById("completed-count");
const addNewBoard = document.getElementById("add-new-board");
const boardContainer = document.querySelector(".container");
const delBtn = document.querySelectorAll(".del-btn");

delBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const res = confirm("Are you sure");
    if (res === true) {
      btn.parentElement.parentElement.parentElement.remove();
    }
    // console.log(btn.parentElement.parentElement.parentElement);
  });
});

function generateRandomCircleColor() {
  const boards = ["todo-circle", "in-progress-circle", "completed-circle"];
  const randomIndex = Math.floor(Math.random() * boards.length);
  return boards[randomIndex];
}

addNewBoard.addEventListener("click", () => {
  const title = prompt("Board title..");
  if (!title) {
    alert("Provide a title");
    return;
  }
  const newBoard = document.createElement("div");
  newBoard.classList.add("board");
  const circleColor = generateRandomCircleColor();
  newBoard.innerHTML = `
        <header class="board-header">
          <div class="header-title">
            <p class="circle" id="${circleColor}"></p>
            <h4>${title}</h4>
          </div>
           <div class="display">
            <p id="completed-count"></p>
            <button class="del-btn" >Delete</button>
          </div>
        </header>
        <div class="todo-cards"></div>
      `;
  handleDragOver(newBoard);
  newBoard.setAttribute("draggable", "true");
  boardContainer.appendChild(newBoard);
  handleDragEvents(newBoard);
  updateCounts();
});

function updateCounts() {
  todoCount.innerHTML = `
   <span class="cards-count"> Cards : ${allBoards[0].children[1].children.length}</span>
  `;
  inProgressCount.innerHTML = `
   <span class="cards-count"> Cards : ${allBoards[1].children[1].children.length}</span>
  `;
  doneCount.innerHTML = `
   <span class="cards-count"> Cards : ${allBoards[2].children[1].children.length}</span>
  `;
}

function handleDragOver(target) {
  target.addEventListener("dragstart", (event) => {
    event.target.classList.add("dragging");
  });
  target.addEventListener("dragend", (event) => {
    event.target.classList.remove("dragging");
  });
}

addNewCardBtn.addEventListener("click", () => {
  const title = prompt("Card title..");
  if (!title) {
    alert("Provide a title");
    return;
  }
  const newCard = document.createElement("div");
  newCard.classList.add("todo-card");
  newCard.innerHTML = `
        <div>
            ${title}
            <div class="date-time">
                <button>Delete card</button>
                <small class="date">${new Date().toLocaleDateString()}</small>
                <small class="date">${new Date().getHours()}:${new Date().getMinutes()}</small>
            </div>
        </div>`;
  handleDragOver(newCard);
  newCard.setAttribute("draggable", "true");
  allBoards[0].children[1].appendChild(newCard);
  updateCounts();
});

cards.forEach((card) => {
  handleDragOver(card);
});

function handleDragEvents(target) {
  target.addEventListener("dragend", () => {
    updateCounts();
  });
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    if (draggingCard && target !== draggingCard.parentElement) {
      target.children[1].appendChild(draggingCard);
    }
  });
}

allBoards.forEach((board) => {
  handleDragEvents(board);
});
