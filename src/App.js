//CRUD operation using LocalStorage

import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    isbn: "",
  });
  const [books, setBooks] = useState([""]);
  const [message, setMessage] = useState({
    error: false,
    msg: "",
  });
  const LOCAL_STORAGE_KEY = "books";

  useEffect(() => {
    const fetchBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (fetchBooks) {
      setBooks(fetchBooks);
    }
  }, []);

  const submitHandler = (e) => {
    const { title, author, isbn } = input;

    e.preventDefault();

    if (input) {
      if (title === "" || author === "" || isbn === "") {
        setMessage({ error: true, msg: "All fields are Mandatory" });
      } else {
        setMessage({ error: false, msg: "" });
      }
      const newBook = [...books, { ...input }];
      const addedBook = setBooks(newBook);
      if (addedBook) {
        setMessage({ error: false, msg: "New Book added" });
        setInput("");
      }
      localStorage
        .setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
        .catch((err) => setMessage({ error: true, msg: err }));
    } else return books;
  };
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const deleteHandler = (id) => {
    console.log(id);
    const deleteBook = books.filter((book) => book.isbn !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));

    setBooks(deleteBook);
  };
  return (
    <div className="ui form" id="App">
      <div className="ui container mt-4">
        <h1 className="ui display-4 text-center">
          <span className="text-primary">My Book</span>List
        </h1>
        {message.error ? (
          <h1 style={{ color: "red" }}>{message.msg}</h1>
        ) : (
          <h1 color="green">{message.msg}</h1>
        )}

        <form id="book-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              className="form-control"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN#</label>
            <input
              type="text"
              name="isbn"
              id="isbn"
              className="form-control"
              onChange={changeHandler}
            />
          </div>
          <input type="submit" value="Add Book" className="add" id="add" />
        </form>

        <table className="ui table-striped mt-5" id="table">
          <thead>
            <tr className="main-row">
              <th>Title</th>
              <th>Author</th>
              <th>ISBN#</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="book-list">
            {books.map((book) => {
              return (
                <tr className="row">
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <button
                      className="close"
                      id={book.isbn}
                      onClick={(e) => deleteHandler(e.target.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
