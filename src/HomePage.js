import React from "react";
import "./App.css";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const HomePage = ({ read, currentlyReading, wantToRead, handleChange }) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {read && (
            <Shelf shelf={"Read"} books={read} handleChange={handleChange} />
          )}
          {wantToRead && (
            <Shelf
              shelf={"Want To Read"}
              books={wantToRead}
              handleChange={handleChange}
            />
          )}
          {currentlyReading && (
            <Shelf
              shelf={"Currently Reading"}
              books={currentlyReading}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="open-search">
          <Link to="/search">
            <button>Add Book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
