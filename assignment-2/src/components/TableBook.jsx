import React, { useEffect, useState } from "react";

function TableBook({ books }) {
  // Store LocalStorage
  // function loadBooksFromLocalStorage() {
  //   const storedBooks = JSON.parse(localStorage.getItem("books"));
  //   if (storedBooks) {
  //     setBooks(storedBooks);
  //   }
  // }

  // useEffect(() => {
  //   loadBooksFromLocalStorage();
  // }, []);

  function handleDeleteBook() {
    console.log("sth");
  }

  return (
    <div className="table-container">
      <table id="myTable">
        <thead>
          <tr className="table-header">
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "20%" }}>Author</th>
            <th style={{ width: "20%" }}>Topic</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.topic}</td>
              <td>
                <button className="deletebtn" onClick={handleDeleteBook()}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableBook;
