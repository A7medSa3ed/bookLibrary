import React, { Component } from "react";
class Book extends Component {
  render() {
    const { book, handleChange, status } = this.props;
    if (book) {
      return (
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
                }}
              />
              <div className="book-shelf-changer">
                <select
                  defaultValue={status}
                  onChange={e => handleChange(e, book)}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
              {book.authors ? (
                book.authors.map((author, i) => (
                  <span key={i}>
                    {author}
                    <br />
                  </span>
                ))
              ) : (
                <span>Author unknown</span>
              )}
            </div>
          </div>
        </li>
      );
    }
  }
}
export default Book;
