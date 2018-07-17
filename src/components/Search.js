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
    this.searchBooks();
  }


  addBookToShelf = (book, shelf) => {
    this.props.updateShelf(book, shelf);
  };

  searchBooks = () => {
    const { showingBooks } = this.state;
    const { searchedBooks } = this.props;
    // console.log(searchedBooks)
    const { query } = this.state;
    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i');
      BooksAPI.search(query).then((books) => {
        if (books.length >0) {
          const displayBooks = books.filter((book) => (book.imageLinks));
          const filterBooks = searchedBooks.map((oldBook) => {

            const newBooks = displayBooks.filter((newBook) => {oldBook.id !== newBook.id;
              newBook.shelf = 'currentlyReading';
              })
            
            this.setState(() => {
              books.sort(sortBy('title'));
              return {showingBooks : books}
            })
            console.log(this.state.showingBooks);
            // console.log("filterBooks" + newBooks);

          })

        }
      })
      // showingBooks = contacts.filter((contact) => match.test(contact.name))
      // } else {
      //   // this.setState({showingBooks : []});
    }
    // 

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
                      this.addBookShelf(book, shelf)
                    }} />
                </li>
              ))}
          </ol>
        </div>
      </div>

    );
  }
}




















// updateQuery = (query) => {
//         const { libraryBooks } = this.props;

//         this.setState({ query: query });
//         const trimmedQuery = query.trim();
//         if (trimmedQuery === '') {
//         this.setState({ books: [] });
//                         return ;
//         }
//         BooksAPI.search(trimmedQuery, 5).then((response) => {
//             if (response && response.length) {
//                 const books = response.map((book) => {
//                     const libBook = libraryBooks.filter((libBook) => libBook.id === book.id);
//                     const shelf = libBook ? libBook.shelf : 'none';

//                     return {
//                         id: book.id,
//                         shelf: shelf,
//                         authors: book.authors,
//                         title: book.title,
//                         imageLinks: {
//                             thumbnail: book.imageLinks.thumbnail
//                         }
//                     };
//                 });
//                 this.setState({ books });
//             }
//         });
//     };


//   updateQuery =(query)=> {
//     this.setState ({ query: query.trim()})

//       this.searchBooks();
//   }
// searchBooks =() => {
//   const {searchedBooks} =this.props;
//   if (this.state.query) {
//     BooksAPI.search(this.state.query).then(books => {
//       if(books){
//         const displayBooks = books.map((book) => {
//           book = this.props.searchedBooks.filter((oldbook) => book.id != oldbook.id)
//           book.shelf = 'none';
//           // // const alreadyexist =searchedBooks.filter((exist) => 
//           // //   exist.id === book.id);
//           // // book.shelf = book.shelf ? book.shelf : 'none';
//           // if(!book.shelf) {book.shelf = 'none'}

//         return {
//                         id: book.id,
//                         shelf: book.shelf,
//                         authors: book.authors,
//                         title: book.title,
//                         imageLinks: book.imageLinks

//                     };
//         });

//         this.setState({displayBooks});
//         console.log(displayBooks);
//       }
//     });

//   }

//   };

//     this.setState({showingBooks : books.filter((book)=> (book.imageLinks))});
//     // console.log(this.state.showingBooks);
//   });
//     const newBooks =this.state.showingBooks;
//     let nBooks = newBooks.map((showBook) => {
//       this.props.searchedbooks.filter((book)=> book.id != showBook.id );
//     const shelf = libBook ? libBook.shelf : 'none';

//                     return {
//                         id: book.id,
//                         shelf: shelf,
//                         authors: book.authors,
//                         title: book.title,
//                         imageLinks: {
//                         thumbnail: book.imageLinks.thumbnail
//                         }
//                     };
//   })
//     console.log(nBooks);    
// }


//   render () {

//     return (
//       <div className="search-books">
//         <div className="search-books-bar">
//           <Link to='/' className="close-search">Close</Link>
//           <div className="search-books-input-wrapper">
//             <input type="text" 
//                    placeholder="Search by title or author" 
//                    value={this.state.query} 
//                    onChange={((event) => this.updateQuery(event.target.value))} />
//           </div>
//         </div>
//         <div className="search-books-results">
//           <ol className="books-grid">
//             {
//              this.state.showingBooks.map((book) => (
//                <li key = {book.id}>
//                  <Book 
//               book={book} 
//               id={book.id} 
//               updateShelf={(shelf) => {
//               this.addBookShelf(book, shelf)
//             }}/>
//                </li>
//              ))}
//           </ol>
//         </div>
//       </div>

//       );
//   }
// }






//   updateQuery = (query) => {
//     this.setState({
//       query: query.trim(),
//       showingBooks: this.searchBooks()
//     });
//   };

// search_books = (val) => {
//     if (val.length !== 0) {
//       BooksAPI.search(val, 10).then((books) => {
//         if (books.length > 0) {
//           books = books.filter((book) => (book.imageLinks))
//           books = this.changeBookShelf(books)
//           this.setState(() => {
//             return {Books: books}
//           })
//         }
//       })
//     } else {
//       this.setState({Books: [], query: ''})
//     }
//   }


//   searchBooks = () => {

//     const match = new RegExp(escapeRegExp(this.state.query), 'i');
//     BooksAPI.search(match).then((books) => {
//       if (books.length) {
//         books = books.filter((book) => (book.imagLinks))
//         this.setState(() => {
//         return {showingBooks :books}
//       })
//     }else

//     this.setState({showingBooks :[] , query: ''})

//       })
//       }
//     }


//   //   this.state.showingBooks = this.props.books.filter((book) => match.test(book.title)));
//   //   console.log(this.state.showingBooks);
//   //   this.state.showingBooks.sort(sortBy(this.title));
//   //   this.setState(() => {
//   //           return {Books: books}
//   //         })


//   // };

//  

//   render() {
//     return (
//       <div className="search-books">
//         <div className="search-books-bar">
//           <Link to='/' className="close-search">Close</Link>
//           <div className="search-books-input-wrapper">
//             <input type="text" 
//                    placeholder="Search by title or author" 
//                    value={this.state.query} 
//                    onChange={((event) => this.updateQuery(event.target.value))} />
//               />
//           </div>
//         </div>
//         <div className="search-books-results">
//           <ol className="books-grid">
//             {this.state.query.length > 0 && this.state.Books.map((book, index) => (
//               <Book 
//               book={book} 
//               key={book.id} 
//               updateShelf={(shelf) => {
//               this.addBookShelf(book, shelf)
//             }}/>))}
//           </ol>
//         </div>
//       </div>
//     )
//   }
// }
