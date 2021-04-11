import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import * as BooksAPI from "./BooksAPI";
import NotFound from "./NotFound";
class BooksApp extends React.Component {
  state = {
    books: [],
    read: [],
    wantToRead: [],
    currentlyReading: [],
    searchBooks: [],
    error: false,
    loading: false,
  };

  componentDidMount() {
    // get All books from api on DOM load
    this.getALlBooks();
  }

  // Get All Books
  getALlBooks = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .then(() => this.filterBooks())
      .catch(e => console.log(e));
  };

  // Filter Books
  filterBooks = () => {
    const allBooks = this.state.books;
    const read = allBooks.filter(book => book.shelf === "read");
    const currentlyReading = allBooks.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = allBooks.filter(book => book.shelf === "wantToRead");
    this.setState({ read, currentlyReading, wantToRead });
  };

  // handle Book Change
  handleChange = (e, book) => {
    const shelf = e.target.value;
    BooksAPI.update(book, shelf)
      .then(() => this.getALlBooks())
      .catch(e => console.log(e));
  };

  //Handle Search Books
  handleSearch = query => {
    query.trim() !== "" && this.setState({ loading: true });
    query.trim() !== ""
      ? BooksAPI.search(query)
          .then(res => {
            res &&
              this.setState({
                searchBooks: res,
                loading: false,
                error: false,
              });
            if (res.error) {
              this.setState({ error: true, searchBooks: [], loading: false });
            }
          })
          .catch(e => console.log(e))
      : this.setState({ searchBooks: [] });
  };

  // get Updated Books

  updatedBooks = books => {
    books.map(book => BooksAPI.get(book.id).then(res => res));
  };
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage
            getALlBooks={this.getALlBooks}
            filterBooks={this.filterBooks}
            handleChange={this.handleChange}
            books={this.state.books}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
            currentlyReading={this.state.currentlyReading}
          />
        </Route>
        <Route exact path="/search">
          <SearchPage
            handleSearch={this.handleSearch}
            searchBooks={this.state.searchBooks}
            handleChange={this.handleChange}
            error={this.state.error}
            loading={this.state.loading}
            updatedBooks={this.updatedBooks}
          />
        </Route>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default BooksApp;
