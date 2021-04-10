import React from "react";
import Book from "./Book";

const shelf = ({ shelf, books, handleChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book book={book} key={book.id} handleChange={handleChange} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default shelf;
