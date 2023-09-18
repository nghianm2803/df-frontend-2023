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
    populateTable();
  }
}

loadBooksFromLocalStorage();

// Modal
const addModal = document.getElementById("addBookModal");
const deleteModal = document.getElementById("deleteBookModal");
const successModal = document.getElementById("successModal");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const deleteBtnConfirm = document.getElementById("deleteBtnConfirm");
const closeAddModal = document.querySelector("#addBookModal .close");
const closeDeleteModal = document.querySelector("#deleteBookModal .close");
const closeSuccessModal = document.querySelector("#successModal .close");
const toastText = document.getElementById("toast-message");

closeAddModal.addEventListener("click", function () {
  document.getElementById("addBookModal").style.display = "none";
});

closeDeleteModal.addEventListener("click", function () {
  document.getElementById("deleteBookModal").style.display = "none";
});

closeSuccessModal.addEventListener("click", function () {
  document.getElementById("successModal").style.display = "none";
});

cancelBtn.onclick = function () {
  document.getElementById("deleteBookModal").style.display = "none";
};

addBtn.onclick = function () {
  addModal.style.display = "block";
  document.querySelector('input[name="fname"]').focus();
};

window.onclick = function (event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
  if (event.target == successModal) {
    deleteModal.style.display = "none";
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

  nameInput.value = "";
  authorInput.value = "";
  errorMessage.textContent = "";

  populateTable();

  addModal.style.display = "none";
  successModal.style.display = "block";
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
  populateTable(filteredBooks);
}

const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBooks();
});

// Function to show book
function populateTable(filteredData) {
  const tbody = document.querySelector("tbody");

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const dataToRender = filteredData || books;

  dataToRender.forEach((item) => {
    const row = document.createElement("tr");
    const id = document.createElement("td");
    const name = document.createElement("td");
    const author = document.createElement("td");
    const topic = document.createElement("td");
    const deleteBtn = document.createElement("td");
    const deleteLink = document.createElement("a");
    const deleteText = document.getElementById("confirm-message");

    id.textContent = item.id;
    row.appendChild(id);
    name.textContent = item.name;
    row.appendChild(name);
    author.textContent = item.author;
    row.appendChild(author);
    topic.textContent = item.topic;
    row.appendChild(topic);

    deleteLink.textContent = "Delete";
    deleteLink.classList.add("deleteLink");

    // Open delete modal
    deleteLink.addEventListener("click", () => {
      const deleteBookId = item.id;
      deleteModal.style.display = "block";
      deleteText.innerHTML = `Do you want to delete <b>${item.name}</b> book?`;

      // Click on delete confirm
      deleteBtnConfirm.addEventListener("click", () => {
        deleteBook(deleteBookId);
        toastText.innerHTML = `Delete <b>${item.name}</b> successful!`;
      });
    });

    deleteBtn.appendChild(deleteLink);
    row.appendChild(deleteBtn);

    tbody.appendChild(row);
  });
}

// Function to delete book
function deleteBook(bookId) {
  const index = books.findIndex((item) => item.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    populateTable();
    localStorage.setItem("books", JSON.stringify(books));
  }
  deleteModal.style.display = "none";
  successModal.style.display = "block";
}

populateTable();
