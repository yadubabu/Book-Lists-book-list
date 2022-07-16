import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  //const LOCAL_STORAGE_KEY = "books";
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [isbn, setIsbn] = useState("");

  const [getBooks, setGetBooks] = useState([""]);
  // const books = [
  //   {
  //     title: "Book One",
  //     author: "John smith",
  //     isbn: "5645757567",
  //   },
  //   {
  //     title: "Book Two",
  //     author: "Deo carle",
  //     isbn: "6765875",
  //   },
  // ];
  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      isbn: "",
    },
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const deleteHandler = (id) => {
    console.log(id);
  };
  // useEffect(() => {
  //   const fetchBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (fetchBooks) setGetBooks(fetchBooks);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  // }, []);
  // const newBook = setBooks({ title, author, isbn });
  // if (newBook) {
  //   addBook(newBook);
  // }

  // const addBook = (book) => {
  //   setBooks([...books, ...book]);
  // };

  return (
    <div className="ui form">
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN#</label>
            <input type="text" name="isbn" id="isbn" className="form-control" />
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
            {books.map((book, index) => {
              return (
                <>
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>
                      <button
                        id={book.isbn}
                        onClick={(id) => deleteHandler(id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
