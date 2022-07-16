import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [books, setBooks] = useState([""]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    title: "",
    author: "",
    isbn: "",
  });
  const LOCAL_STORAGE_KEY = "books";

  useEffect(() => {
    const fetchBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (fetchBooks) {
      setBooks(fetchBooks);
    }
  }, []);
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHanlder = (e) => {
    const { title, author, isbn } = input;
    e.preventDefault();
    if (title !== "" && author !== "" && isbn !== "") {
      setBooks([...books, input]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
      setMessage("New Book added");
    } else {
      setMessage("All feilds are mandatory");
    }
  };
  const deleteHandler = (id) => {
    const newBook = books.filter((book) => book.isbn !== id);
    setBooks(newBook);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    setMessage("Book deleted");
  };
  return (
    <div className="ui form">
      <div className="ui container mt-4">
        <h1 className="ui display-4 text-center">
          <i className="fas fa-book-open text-primary"></i> My
          <span className="text-primary">Book</span>List
        </h1>
        {message ? <h1 style={{ color: "red" }}>{message}</h1> : ""}
        <form id="book-form" onSubmit={submitHanlder}>
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
          <input
            type="submit"
            value="Add Book"
            className="btn btn-primary btn-block"
          />
        </form>
        <table className="ui table-striped mt-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN#</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="book-list">
            {books !== ""
              ? books.map((book, index) => {
                  return (
                    <>
                      <tr>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>
                          <button
                            id={book.isbn}
                            onClick={(e) => deleteHandler(e.target.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

