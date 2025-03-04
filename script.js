const allBoards = document.querySelectorAll(".board");
const addNewCardBtn = document.getElementById("add-new-card");
const todoCount = document.getElementById("todo-count");
const inProgressCount = document.getElementById("in-progress-count");
const doneCount = document.getElementById("completed-count");
const addNewBoard = document.getElementById("add-new-board");
const boardContainer = document.querySelector(".container");

// Function to update counts for all boards
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

// Function to delete a board
function deleteBoard(btn) {
  const res = confirm("Are you sure you want to delete this board?");
  if (res) {
    btn.closest(".board").remove();
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

// Function to handle drag events
function handleDragOver(target) {
  target.addEventListener("dragstart", (event) => {
    event.target.classList.add("dragging");
  });
  target.addEventListener("dragend", (event) => {
    event.target.classList.remove("dragging");
    updateCounts();
  });
}

// Function to handle drop events for boards
function handleDragEvents(target) {
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    if (draggingCard && target !== draggingCard.parentElement) {
      target.querySelector(".todo-cards").appendChild(draggingCard);
    }
  });
}

// Function to add event listeners for board actions
function addBoardListeners(board) {
  const delBtn = board.querySelector(".del-btn");
  const editBoardBtn = board.querySelector(".edit-board-btn");

  if (delBtn) {
    delBtn.addEventListener("click", () => deleteBoard(delBtn));
  }

  if (editBoardBtn) {
    editBoardBtn.addEventListener("click", () =>
      editBoardTitle(board.querySelector(".board-title"))
    );
  }

  handleDragOver(board);
  handleDragEvents(board);
}

// Add event listener for adding new boards
addNewBoard.addEventListener("click", () => {
  const title = prompt("Board title..");
  if (!title) {
    alert("Provide a title");
    return;
  }
  const newBoard = document.createElement("div");
  newBoard.classList.add("board");
  newBoard.innerHTML = `
    <header class="board-header">
      <div class="header-title">
        <p class="circle"></p>
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

  newBoard.setAttribute("draggable", "true");
  boardContainer.appendChild(newBoard);
  addBoardListeners(newBoard);
  updateCounts();
});

// Function to add new cards
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
        <button class="del-card-btn"><i class="fa-solid fa-trash"></i></button>
        <button class="edit-card-btn"><i class="fa-solid fa-pen"></i></button>
        <small class="date">${new Date().toLocaleDateString()}</small>
        <small class="date">${new Date().getHours()}:${new Date().getMinutes()}</small>
      </div>
    </div>`;

  const firstBoard = document.querySelector(".board .todo-cards");
  if (firstBoard) {
    firstBoard.appendChild(newCard);
  }

  newCard
    .querySelector(".del-card-btn")
    .addEventListener("click", () => deleteCard(newCard));
  newCard
    .querySelector(".edit-card-btn")
    .addEventListener("click", () => editCardTitle(newCard));

  updateCounts();
  handleDragOver(newCard);
  newCard.setAttribute("draggable", "true");
});

// Initialize existing boards
allBoards.forEach(addBoardListeners);
