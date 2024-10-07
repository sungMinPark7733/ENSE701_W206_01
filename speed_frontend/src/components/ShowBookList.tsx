import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from './Book';
import axios from 'axios';

function ShowBookList() {
  const [books, setBooks] = useState<(Book | undefined)[]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/books')
      .then((res) => res.json())
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);

  const handleApprove = (bookId: string | undefined) => {
    if (bookId) {
      console.log(`Book with id ${bookId} approved`);
    }
  };

  const handleReject = async (bookId: string | undefined) => {
    if (!bookId) return;

    try {
      await axios.delete(`http://localhost:8082/api/books/${bookId}`);
      setBooks(books.filter((book) => book?._id !== bookId));
    } catch (error) {
      console.error('Error rejecting book:', error);
    }
  };

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>SPEED</h2>
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
                  <th>Description</th>
                  <th>Published Date</th>
                  <th>Publisher</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>{book?.title}</td>
                    <td>{book?.author}</td>
                    <td>{book?.description}</td>
                    <td>{new Date(book?.published_date || '').toLocaleDateString()}</td>
                    <td>{book?.publisher}</td>
                    <td>{book?.url}</td>
                    <td>
                      <button onClick={() => handleApprove(book?._id)}>Approve</button>
                      <br></br>
                      <button onClick={() => handleReject(book?._id)}>Reject</button>
                    </td>
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