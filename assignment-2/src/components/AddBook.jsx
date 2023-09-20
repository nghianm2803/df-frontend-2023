import React, { useState } from "react";

function AddBook({ open, closeAddBook, addBook }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("Programming");
  const [nameError, setNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const topics = [
    { label: "Programming", value: "Programming" },
    { label: "Database", value: "Database" },
    { label: "DevOps", value: "DevOps" },
  ];

  function ValidateInput() {
    if (name.trim() === "") {
      setNameError(true);
    }
    if (author.trim() === "") {
      setAuthorError(true);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTopic(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    ValidateInput();
    if (name.trim() === "" || author.trim() === "") {
      return;
    }

    const bookId = Math.floor(Math.random() * 1000);
    const newBook = {
      id: bookId,
      name,
      author,
      topic,
    };

    addBook(newBook);
    console.log("New Book:", newBook);

    setName("");
    setAuthor("");
    setTopic("");

    closeAddBook();
  };

  return (
    <div id="addBookModal" className="modal" open={open} onClose={closeAddBook}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add book</h2>
          <span className="close" onClick={closeAddBook}>
            &times;
          </span>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            <div className="finput">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                placeholder="Book name"
                name="fname"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
              />
              {nameError && (
                <p className="error-message">Name field is required.</p>
              )}
            </div>
            <div className="finput">
              <label htmlFor="fauthor">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="fauthor"
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setAuthorError(false);
                }}
              />
              {authorError && (
                <p className="error-message">Author field is required.</p>
              )}
            </div>
            <div className="finput">
              <label htmlFor="ftopic">Topic</label>
              <select onChange={handleChange} value={topic}>
                {topics.map((topic, index) => (
                  <option key={index} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btnPrimary" id="createBtn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
