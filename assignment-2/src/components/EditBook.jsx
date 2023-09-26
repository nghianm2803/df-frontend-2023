import React, { useEffect, useState } from "react";

function EditBook({ closeEditBook, editBook, bookToEdit }) {
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

  useEffect(() => {
    if (bookToEdit) {
      setName(bookToEdit.name || "");
      setAuthor(bookToEdit.author || "");
      setTopic(bookToEdit.topic || "");
    }
    // eslint-disable-next-line
  }, []);

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

    // Assuming that currentBook contains the ID of the book being edited
    const editedBook = {
      id: bookToEdit.id,
      name,
      author,
      topic,
    };

    editBook(editedBook);
    // console.log("Updated book:", editedBook);

    setName("");
    setAuthor("");
    setTopic("");
    closeEditBook();
  };

  return (
    <div id="addBookModal" className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Edit book</h2>
          <button className="close" onClick={closeEditBook}>
            &times;
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="modalBody">
            <div className="fieldInput">
              <label htmlFor="fieldName">Name</label>
              <input
                type="text"
                placeholder="Book name"
                name="fieldName"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
              />
              {nameError && (
                <p className="errorMessage">Name field is required.</p>
              )}
            </div>
            <div className="fieldInput">
              <label htmlFor="fieldAuthor">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="fieldAuthor"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setAuthorError(false);
                }}
              />
              {authorError && (
                <p className="errorMessage">Author field is required.</p>
              )}
            </div>
            <div className="fieldInput">
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
          <div className="modalFooter">
            <button type="submit" className="btnPrimary" id="createBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
