import React, { Component } from 'react'
import Book from './Book'

export default class BookShelf extends Component {

  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
            	<li key = {book.id}>
            	<Book books={this}
            		shelfName = {this.props.shelfName}
                     authors={ book.authors }
                     title={ book.title }
                     imageLinks={ book.imageLinks }
            	     updateShelf = {this.props.updateShelf} />
            	</li>))}
          </ol>
        </div>
      </div>
    )
  }
}
