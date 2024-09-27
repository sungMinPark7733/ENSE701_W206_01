import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from './Book';
import { useRouter } from 'next/navigation';

function ShowBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8082/api/books')
      .then((res) => res.json())
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);

  const handleRowClick = (bookId: string) => {
    router.push(`/show-book/${bookId}`);
  };

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
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan={3} className='text-center'>There is no book record!</td>
                </tr>
              ) : (
                books.map((book, index) => (
                  <tr key={index} onClick={() => handleRowClick(book._id || '')}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowBookList;