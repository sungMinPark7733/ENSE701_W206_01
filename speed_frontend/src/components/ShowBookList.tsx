import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from './Book';

function ShowBookList() {
  const [articles, setarticles] = useState<[Book?]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/articles')
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        setarticles(articles);
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
            <h2 className='display-4 text-center'>SPEED</h2>
          </div>

          <div className='col-md-11'>
            <Link href='/create-article' className='btn btn-outline-warning float-right'>
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='table-responsive'>
          {articles.length === 0 ? (
            'There is no article record!'
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
                {articles.map((article, index) => (
                  <tr key={index} onClick={() => window.location.href = `/show-article/${article?._id}`}>
                    <td>{article?.title}</td>
                    <td>{article?.author}</td>
                    <td>{article?.isbn}</td>
                    <td>{article?.description}</td>
                    <td>{new Date(article?.published_date || '').toLocaleDateString()}</td>
                    <td>{article?.publisher}</td>
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