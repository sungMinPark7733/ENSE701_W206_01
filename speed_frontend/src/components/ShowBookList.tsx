import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from './Book';

function ShowBookList() {
  const [books, setBooks] = useState<[Book?]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/books')
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>

          <div className='col-md-11'>
            <Link href='/create-book' className='btn btn-outline-warning float-right'>
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='table-responsive'>
          {books.length === 0 ? (
            'There is no book record!'
          ) : (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Description</th>
                  <th>Published Date</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index} onClick={() => window.location.href = `/show-book/${book?._id}`}>
                    <td>{book?.title}</td>
                    <td>{book?.author}</td>
                    <td>{book?.isbn}</td>
                    <td>{book?.description}</td>
                    <td>{new Date(book?.published_date || '').toLocaleDateString()}</td>
                    <td>{book?.publisher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowBookList;