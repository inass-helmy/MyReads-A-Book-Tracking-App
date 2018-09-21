import React, { Component } from 'react'
import sortBy from 'sort-by'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: 'hotel',
      showingBooks: []
    };
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.searchBooks(query);
  }

  addBookToShelf = (book, shelf) => {
    this.props.updateShelf(book, shelf);
  };
  getThumbnailImage = book => {
    book.imageLinks = book.imageLinks ? book.imageLinks : "http://via.placeholder.com/128x193?text=No%20Cover";
    book.authors = book.authors ? book.authors : ["Unknown"];
  }
  searchBooks = (query) => {
    const { myBooks } = this.props;

    if (query.length > 0) {
      BooksAPI.search(query.trim()).then((books) => {
        if (books && books.length > 0) {
          const searchedBooks = books.map((book) => {
            this.getThumbnailImage(book);
            const myBook = myBooks.filter((myBook) => myBook.id === book.id);
            const shelf = myBook.length > 0 ? myBook[0].shelf : 'none';
            return {
              id: book.id,
              shelf: shelf,
              authors: book.authors,
              title: book.title,
              imageLinks: book.imageLinks
            }
          });
          searchedBooks.sort(sortBy('title'));
          this.setState({ showingBooks: searchedBooks });
        }
      })
    }
  }

  render() {
    const { showingBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={((event) => this.updateQuery(event.target.value))} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.query.length > 0 && showingBooks.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    id={book.id}
                    shelf={book.shelf}
                    authors={book.authors}
                    title={book.title}
                    imageLinks={book.imageLinks}
                    updateShelf={(shelf) => {
                      this.addBookToShelf(book, shelf)
                    }} />
                </li>
              ))}
          </ol>
        </div>
      </div>

    );
  }
}