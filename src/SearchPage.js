import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
class SearchPage extends Component {
  state = {
    query: "",
  };
  handleChange = e => {
    const query = e.target.value;
    this.setState({ query });
  };
  render() {
    const { searchBooks, handleChange, loading, error } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={() => this.props.handleSearch("")}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
              onKeyUp={() => this.props.handleSearch(this.state.query)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!loading ? (
            !error ? (
              <ol className="books-grid">
                {searchBooks.length > 0 ? (
                  searchBooks.map(book => {
                    return (
                      <Book
                        book={book}
                        key={book.id}
                        handleChange={handleChange}
                        status={"none"}
                      />
                    );
                  })
                ) : (
                  <p style={{ color: "red", fontSize: "25px" }}>
                    There Is No Thing Yet
                  </p>
                )}
              </ol>
            ) : (
              <p
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "25px",
                }}
              >
                OOPS !!!, No Thing Match This Query
              </p>
            )
          ) : (
            <div className="lds-hourglass"></div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
