'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import './search.css';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  claim: string;
  evidence: string;
  rating: number[];
}

const SearchPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 

  useEffect(() => {
    if (searchTerm === '') {
      fetchArticles();
    } else {
      const delayDebounceFn = setTimeout(() => {
        searchArticles(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8082/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchArticles = async (title: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/search?title=${title}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const calculateAverageRating = (ratings: number[]) => {
    if (ratings.length === 0) return 'No ratings';
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    const average = (sum / ratings.length).toFixed(1);
    return `${average}/5`;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = e.target.value as 'asc' | 'desc';
    setSortOrder(selectedSortOrder);
  };

  const sortArticlesByYear = (articles: Article[], order: 'asc' | 'desc') => {
    return articles.slice().sort((a, b) => {
      const yearA = parseInt(a.publicationYear, 10);
      const yearB = parseInt(b.publicationYear, 10);
      if (order === 'asc') {
        return yearA - yearB;
      } else {
        return yearB - yearA;
      }
    });
  };

  const sortedArticles = sortArticlesByYear(articles, sortOrder); 

  return (
    <div className="search-page"> {/* 添加唯一类名 */}
      <div className="container">
        <h1 className="title">Search Articles</h1>

        <div className="search-box">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Search for an article by title..."
          />
          <button className="search-button" onClick={fetchArticles}>
            Search
          </button>
        </div>

        <div className="sort-box">
          <label htmlFor="sortOrder">Sort by Year: </label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {isLoading ? (
          <div className="loading">Loading articles...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Authors</th>
                  <th>Source</th>
                  <th>Year</th>
                  <th>DOI</th>
                  <th>Claim</th>
                  <th>Evidence</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {sortedArticles.length > 0 ? (
                  sortedArticles.map((article) => (
                    <tr key={article._id}>
                      <td>
                        <Link href={`/pages/browse/${article._id}`}>
                          {article.title}
                        </Link>
                      </td>
                      <td>{article.authors.join(', ')}</td>
                      <td>{article.source}</td>
                      <td>{article.publicationYear}</td>
                      <td>{article.doi}</td>
                      <td>{article.claim || 'N/A'}</td>
                      <td>{article.evidence || 'N/A'}</td>
                      <td>{calculateAverageRating(article.rating)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="no-results">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
