import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

export default function AllBooks({ books, updateShelf }) {

 function filterBooks(shelf) {

    return books.filter((book) => book.shelf === shelf)
  }

  return (

    <div className="list-books">

      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">

        <BookShelf
          books={filterBooks("currentlyReading")}
          shelfName="Currently Reading"
          updateShelf={updateShelf} 
          />

        <BookShelf
          books={filterBooks("wantToRead")}
          shelfName="Want to Read"
          updateShelf={updateShelf} 
          />

        <BookShelf
          books={filterBooks("read")}
          shelfName="Read"
          updateShelf={updateShelf} 
          />
      </div>

      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>


  )
}
