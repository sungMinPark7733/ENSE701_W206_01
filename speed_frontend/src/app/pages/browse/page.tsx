"use client";


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Ensure Link is correctly imported

interface Article {
  _id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  sePractice?: string;
  rating: number[];
}

const Page: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        return null;
      }
    };
    fetchData();
  }, []);

  const calculateAverageRating = (ratings: number[]) => {
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Article List</h1>
      <div>
        {error && <div>Failed to load data. Showing dummy data.</div>}
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left font-bold">Title</th>
              <th className="border px-4 py-2 text-left font-bold">Authors</th>
              <th className="border px-4 py-2 text-left font-bold">Year</th>
              <th className="border px-4 py-2 text-left font-bold">SE Practice</th>
              <th className="border px-4 py-2 text-left font-bold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article._id}>
                  <td className="border px-4 py-2">
                    <Link href={`/pages/browse/${article._id}`}>
                      {article.title}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">
                    {article.authors.join(', ')}
                  </td>
                  <td className="border px-4 py-2">{article.publicationYear}</td>
                  <td className="border px-4 py-2">
                    {article.sePractice || 'N/A'}
                  </td>
                  <td className="border px-4 py-2">
                    {calculateAverageRating(article.rating)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;