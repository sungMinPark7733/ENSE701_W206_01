import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';

function UpdateBookInfo() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const id = useParams<{ id: string }>().id;
  const navigate = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8082/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo: ' + err);
        setErrors('Could not load book details');
        setLoading(false);
      });
  }, [id]);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const textAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedBook = {
      title: book.title,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher,
    };

    fetch(`http://localhost:8082/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then(() => {
        navigate.push('/');
      })
      .catch((err) => {
        console.log('Error in UpdateBookInfo onSubmit: ' + err);
        setErrors('Error updating book details');
      });
  };

  return (
    <div className='UpdateBookInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Book</h1>
            {errors && <p className="text-danger">{errors}</p>}
            {loading ? (
              <p>Loading book details...</p>
            ) : (
              <form noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    placeholder='Title of the Book'
                    name='title'
                    className='form-control'
                    value={book.title}
                    onChange={inputOnChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <label htmlFor='author'>Author</label>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={book.author}
                    onChange={inputOnChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    placeholder='Description of the Book'
                    name='description'
                    className='form-control'
                    value={book.description}
                    onChange={textAreaOnChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <label htmlFor='published_date'>Published Date</label>
                  <input
                    type='text'
                    placeholder='Published Date'
                    name='published_date'
                    className='form-control'
                    value={book.published_date?.toString()}
                    onChange={inputOnChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <label htmlFor='publisher'>Publisher</label>
                  <input
                    type='text'
                    placeholder='Publisher of the Book'
                    name='publisher'
                    className='form-control'
                    value={book.publisher}
                    onChange={inputOnChange}
                  />
                </div>
                <br />

                <button
                  type='submit'
                  className='btn btn-outline-info btn-lg btn-block'
                >
                  Update Book
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;