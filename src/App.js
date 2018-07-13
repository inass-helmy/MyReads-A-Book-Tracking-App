import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AllBooks from './components/AllBooks'

export default class BooksApp extends Component {

  state = {

    books: []

  }

  componentDidMount() {
    this.getAllBooks();

  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
    })
  }


  render() {
console.log(this.state.books)

    return (
      <div>
        <AllBooks books={this.state.books} updateShelf={this.changeBookShelf} />
      </div>
    )

  }


}