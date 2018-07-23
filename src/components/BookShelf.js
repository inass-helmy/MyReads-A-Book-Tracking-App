import React, { Component } from 'react'
import Book from './Book'

export default class BookShelf extends Component {

  updateShelf(book, shelf) {
    this.props.updateShelf(book, shelf)
  }

  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (

              <li key={book.id}>
                <Book books={book}
                  id={book.id}
                  shelf={book.shelf}
                  authors={book.authors}
                  title={book.title}
                  imageLinks={book.imageLinks.thumbnail}
                  updateShelf={(shelf) =>
                    this.updateShelf(book, shelf)} />
              </li>))}
          </ol>
        </div>
      </div>
    )
  }

}
