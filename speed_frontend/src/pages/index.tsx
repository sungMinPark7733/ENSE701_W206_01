import { useEffect, useState } from 'react';

// Define the type for a book object
interface Book {
  _id: string;
  title: string;
  author: string;
  published_date: string;
  [key: string]: any; // To allow any additional properties
}

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]); // Specify that books is an array of Book objects

  useEffect(() => {
    // Adjust the URL to point to your backend API
    fetch('http://localhost:8082/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data)); // Assuming your API returns an array of books
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Books</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>Author</th>
            <th style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>Published Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={{ border: '1px solid black', padding: '10px', fontSize: '14px' }}>{book.title}</td>
              <td style={{ border: '1px solid black', padding: '10px', fontSize: '14px' }}>{book.author}</td>
              <td style={{ border: '1px solid black', padding: '10px', fontSize: '14px' }}>{book.published_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;