import React, {Component} from 'react'
import BookShelf from './BookShelf'

export default class AllBooks extends Component {

filterBooks = (shelf) => {
const { books } = this.props;

 return books.filter((book) => book.shelf === shelf)
}

render() {

  return (

    <div className="list-books">

      <div className= "list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        
        <BookShelf 
        books = {this.filterBooks("currentlyReading")} 
        shelfName= "Currently Reading" 
        updateShelf = {this.props.updateShelf} />
        
        <BookShelf 
        books = {this.filterBooks("wantToRead")} 
        shelfName= "Want to Read" 
        updateShelf = {this.props.updateShelf} />
        
        <BookShelf 
        books = {this.filterBooks("read")} 
        shelfName= "Read"
        updateShelf = {this.props.updateShelf} />
      </div>
    </div>


    )
}
}