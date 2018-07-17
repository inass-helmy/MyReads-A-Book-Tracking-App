import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AllBooks from './components/AllBooks'
import Search from './components/Search'

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

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <AllBooks
            books={this.state.books}
            updateShelf={this.changeBookShelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search
            searchedBooks={this.state.books}
            updateShelf={this.changeBookShelf}
          />
        )}/>
      </div>
    )

  }


}