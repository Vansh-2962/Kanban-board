const allBoards = document.querySelectorAll(".board");
const addNewCardBtn = document.getElementById("add-new-card");
const todoCount = document.getElementById("todo-count");
const inProgressCount = document.getElementById("in-progress-count");
const doneCount = document.getElementById("completed-count");
const addNewBoard = document.getElementById("add-new-board");
const boardContainer = document.querySelector(".container");

document.querySelectorAll(".board").forEach((board) => {
  const editBoardBtn = board.querySelector(".edit-board-btn");
  const delBtn = board.querySelector(".del-btn");

  if (editBoardBtn) {
    editBoardBtn.addEventListener("click", () =>
      editBoardTitle(board.querySelector(".board-title"))
    );
  }

  if (delBtn) {
    delBtn.addEventListener("click", () => deleteBoard(delBtn));
  }
});

function deleteBoard(btn) {
  const res = confirm("Are you sure you want to delete this board?");
  if (res) {
    btn.parentElement.parentElement.parentElement.remove();
    updateCounts();
  }
}

// Function to edit a board title
function editBoardTitle(header) {
  const newTitle = prompt("Edit board title:", header.textContent.trim());
  if (newTitle) {
    header.textContent = newTitle;
  }
}

// Function to edit a card title
function editCardTitle(card) {
  const currentTitle = card.querySelector(".card-title").textContent.trim();
  const newTitle = prompt("Edit card title:", currentTitle);
  if (newTitle) {
    card.querySelector(".card-title").textContent = newTitle;
  }
}

// Function to delete a card
function deleteCard(card) {
  const res = confirm("Are you sure you want to delete this card?");
  if (res) {
    card.remove();
    updateCounts();
  }
}

// Function to generate random circle color for boards
function generateRandomCircleColor() {
  const boards = ["todo-circle", "in-progress-circle", "completed-circle"];
  const randomIndex = Math.floor(Math.random() * boards.length);
  return boards[randomIndex];
}

// Add new board functionality
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
            <h4 class="board-title">${title}</h4>
            </div>
            <div class="display">
            <p class="cards-count"> Cards: 0</p>
            <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
            <button class="edit-board-btn del-btn"><i class="fa-solid fa-pen"></i></button>
          </div>
        </header>
        <div class="todo-cards"></div>
      `;

  handleDragOver(newBoard);
  newBoard.setAttribute("draggable", "true");
  boardContainer.appendChild(newBoard);
  handleDragEvents(newBoard);
  updateCounts();

  const delBtn = newBoard.querySelector(".del-btn");
  delBtn.addEventListener("click", () => deleteBoard(delBtn));

  const editBoardBtn = newBoard.querySelector(".edit-board-btn");
  editBoardBtn.addEventListener("click", () =>
    editBoardTitle(newBoard.querySelector(".board-title"))
  );
});

function updateCounts() {
  const allBoards = document.querySelectorAll(".board");
  allBoards.forEach((board) => {
    const cardCount = board.querySelectorAll(".todo-card").length;
    const countElement = board.querySelector(".cards-count");
    if (countElement) {
      countElement.textContent = `Cards: ${cardCount}`;
    }
  });
}

function handleDragOver(target) {
  target.addEventListener("dragstart", (event) => {
    event.target.classList.add("dragging");
  });
  target.addEventListener("dragend", (event) => {
    event.target.classList.remove("dragging");
    updateCounts();
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
            <span class="card-title">${title}</span>
            <div class="date-time">
                <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn "><i class="fa-solid fa-pen"></i></button>
                <small class="date">${new Date().toLocaleDateString()}</small>
                <small class="date">${new Date().getHours()}:${new Date().getMinutes()}</small>
            </div>
        </div>`;

  handleDragOver(newCard);
  newCard.setAttribute("draggable", "true");
  allBoards[0].children[1].appendChild(newCard);
  updateCounts();

  const delCardBtn = newCard.querySelector(".del-card-btn");
  delCardBtn.addEventListener("click", () => deleteCard(newCard));

  const editCardBtn = newCard.querySelector(".edit-card-btn");
  editCardBtn.addEventListener("click", () => editCardTitle(newCard));
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
  const delBtn = board.querySelector(".del-btn");
  if (delBtn) {
    delBtn.addEventListener("click", () => deleteBoard(delBtn));
  }
  const editBoardBtn = board.querySelector(".edit-board-btn");
  if (editBoardBtn) {
    editBoardBtn.addEventListener("click", () =>
      editBoardTitle(board.querySelector(".board-title"))
    );
  }
});

document.querySelectorAll(".todo-card").forEach((card) => {
  const delCardBtn = card.querySelector(".del-card-btn");
  if (delCardBtn) {
    delCardBtn.addEventListener("click", () => deleteCard(card));
  }
  const editCardBtn = card.querySelector(".edit-card-btn");
  if (editCardBtn) {
    editCardBtn.addEventListener("click", () => editCardTitle(card));
  }
});
