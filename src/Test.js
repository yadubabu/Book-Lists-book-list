//CRUD Operations using API

import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import api from "./api/books";

const App = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    isbn: "",
  });
  const [books, setBooks] = useState([""]);
  useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await fetchBooks();
      if (allBooks) {
        setBooks(allBooks);
      }
    };
    getAllBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await api.get("/books");
    return response.data;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (input) {
      const newBook = [...books, { ...input }];
      setBooks(newBook);
    } else return books;
  };
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const deleteHandler = (id) => {
    const deleteBook = books.filter((book) => book.isbn !== id);
    setBooks(deleteBook);
  };
  return (
    <div className="ui form" id="App">
      <div className="ui container mt-4">
        <h1 className="ui display-4 text-center">
          <i className="fas fa-book-open text-primary"></i> My
          <span className="text-primary">Book</span>List
        </h1>
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
