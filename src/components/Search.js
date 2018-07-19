import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showingBooks: []
    };
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchBooks(query);
  }


  addBookToShelf = (book, shelf) => {
    this.props.updateShelf(book, shelf);
  };

  searchBooks = (query) => {
    const { showingBooks } = this.state;
    const { myBooks } = this.props;
   
    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i');
      BooksAPI.search(query).then((books) => {
        if (books.length >0) {
          books = books.filter((book) => (book.imageLinks));
          const allbooks = books.map((book) => {
                    const myBook = myBooks.filter((myBook) => myBook.id === book.id);
                    const shelf = myBook.length>0 ? myBook.shelf : 'none';
                    console.log(shelf);
                    return {
                        id: book.id,
                        shelf: shelf,
                        authors: book.authors,
                        title: book.title,
                        imageLinks: book.imageLinks
                        }
          

                });
          allbooks.sort(sortBy('title'));
          console.log(allbooks)
          this.setState({showingBooks : allbooks});
      }
      })
        }
      }


  render() {

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
              this.state.query.length>0 && this.state.showingBooks.map((book) => (
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