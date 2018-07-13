import React, { Component } from 'react'

export default class Book extends Component {
  
state = {
shelf: this.props.shelfName
}

changeBookShelf (book, value) {
  console.log(value);
  this.props.updateShelf(book, value);
    this.setState({ shelf: value });
    };

  render() {
    const books = this.props.books;
    console.log("Props", this.props);
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select 
              onChange={ (event) => this.changeBookShelf(this, event.target.value)}
              value= {this.state.shelf}

              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>

    );
  }
}
