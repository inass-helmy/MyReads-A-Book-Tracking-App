import React, { Component } from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
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
    if (book.shelf !== shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }
  }


  render() {

    return (
      <HashRouter>
      <div className="app">
      <switch>
        <Route exact path='/' render={() => (
          <AllBooks
            books={this.state.books}
            updateShelf={this.changeBookShelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search
            myBooks={this.state.books}
            updateShelf={this.changeBookShelf}
          />
        )}/>
        </switch>
        
      </div>
      </HashRouter>
    )

  }


}