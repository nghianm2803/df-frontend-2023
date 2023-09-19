// Your JS code goes here

let books = JSON.parse(localStorage.getItem("books")) || [
  { id: 1, name: "Refactoring", author: "Martin Fowler", topic: "Programming" },
  {
    id: 2,
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  { id: 3, name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" },
];

// Store LocalStorage
function loadBooksFromLocalStorage() {
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  if (storedBooks) {
    books = storedBooks;
    displayBook();
  }
}

loadBooksFromLocalStorage();

// Modal
const addModal = document.getElementById("addBookModal");
const deleteModal = document.getElementById("deleteBookModal");
const successModal = document.getElementById("successModal");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeAddModal = document.querySelector("#addBookModal .close");
const closeDeleteModal = document.querySelector("#deleteBookModal .close");
const closeSuccessModal = document.querySelector("#successModal .close");
const toastText = document.getElementById("toast-message");

closeAddModal.addEventListener("click", () => closeModal("addBookModal"));
closeDeleteModal.addEventListener("click", () => closeModal("deleteBookModal"));
cancelBtn.addEventListener("click", () => closeModal("deleteBookModal"));
closeSuccessModal.addEventListener("click", () => closeModal("successModal"));

addBtn.addEventListener("click", () => openModal("addBookModal"));

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.querySelector('input[name="fname"]').focus();
  }
}

window.onclick = function (event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
  if (event.target == successModal) {
    successModal.style.display = "none";
  }
};

// Function to add book
function addBook() {
  const nameInput = document.querySelector('input[name="fname"]');
  const authorInput = document.querySelector('input[name="fauthor"]');
  const topicSelect = document.querySelector("select");
  const errorMessage = document.getElementById("error-message");

  let lastUsedBookId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) : 0;

  // Validate input
  if (!nameInput.value) {
    errorMessage.textContent = "Please enter name of the book";
    return;
  }
  if (!authorInput.value) {
    errorMessage.textContent = "Please enter author of the book";
    return;
  }

  const name = nameInput.value;
  const author = authorInput.value;
  const topic = topicSelect.value;

  const bookId = lastUsedBookId + 1;
  const newBook = { id: bookId, name, author, topic };
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  lastUsedBookId = bookId;

  // Reset form
  nameInput.value = "";
  authorInput.value = "";
  errorMessage.textContent = "";

  displayBook();

  closeModal("addBookModal");
  openModal("successModal");
  toastText.innerHTML = `Add <b>${name}</b> successful!`;
}

const createButton = document.getElementById("createBtn");
createButton.addEventListener("click", addBook);

// Function to search book
function searchBooks() {
  const searchInput = document
    .querySelector('input[name="search"]')
    .value.toLowerCase()
    .trim();
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchInput)
  );
  console.log("filter books:", filteredBooks);
  displayBook(filteredBooks);
}

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBooks();
});

// Function to show book
function displayBook(filteredData) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const dataToRender = filteredData || books;

  dataToRender.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.topic}</td>
        <td><a class="deleteLink" data-id="${book.id}" onclick="handleDeleteBook(${book.id})">Delete</a></td>
    `;

    tbody.appendChild(row);
  });
  addDeleteEventListeners();
}

// Add a click event listener to each delete link
function addDeleteEventListeners() {
  const deleteLinks = document.querySelectorAll(".deleteLink");

  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", (e) => {
      e.preventDefault();
      const bookId = deleteLink.getAttribute("data-id");
      handleDeleteBook(bookId);
    });
  });
}

function handleDeleteBook(bookId) {
  openModal("deleteBookModal");
  const book = books.find((book) => book.id === parseInt(bookId, 10));
  if (book) {
    const deleteText = document.getElementById("confirm-message");
    deleteText.innerHTML = `Do you want to delete <b>${book.name}</b> book?`;
  }

  const deleteBtnConfirm = document.getElementById("deleteBtnConfirm");
  deleteBtnConfirm.setAttribute("data-id", bookId);

  // Click on delete confirm
  deleteBtnConfirm.addEventListener("click", () => {
    const bookId = deleteBtnConfirm.getAttribute("data-id");
    deleteBook(bookId);
    closeModal("deleteBookModal");
    openModal("successModal");
    toastText.innerHTML = `Delete <b>${book.name}</b> successful!`;
  });
}

// Function to delete book
function deleteBook(bookId) {
  const index = books.findIndex((item) => item.id === parseInt(bookId, 10));
  if (index !== -1) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBook();
  }
}

displayBook();
