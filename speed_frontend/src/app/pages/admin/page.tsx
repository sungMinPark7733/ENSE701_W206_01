'use client';

import React, { useState, useEffect } from 'react';
import './admin.css';

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

const AdminPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editArticleId, setEditArticleId] = useState<string | null>(null); 
  const [editedArticle, setEditedArticle] = useState<Article | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      const response = await fetch(`https://ense-701-w206-01-wqfo.vercel.app/articles`);
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
      const response = await fetch(`https://ense-701-w206-01-wqfo.vercel.app/articles/search?title=${title}`);
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

  const handleEdit = (article: Article) => {
    setEditArticleId(article._id);
    setEditedArticle(article); // When starting the editing mode, set the initial data of the currently edited article
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
          method: 'DELETE',
        });
        setArticles(articles.filter((article) => article._id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editedArticle) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${editedArticle._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedArticle),
        });
        if (response.ok) {
          fetchArticles(); // Refresh data after successful saving
          setEditArticleId(null); // Exit Edit Mode
          setSuccessMessage('Article updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
        } else {
          console.error('Failed to update article');
        }
      } catch (error) {
        console.error('Error updating article:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editedArticle) {
      setEditedArticle({
        ...editedArticle,
        [name]: value,
      });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="search-section">
          <h1>Manage Articles (ADMIN)</h1>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Search for an article by title..."
          />
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="table-section">
          {isLoading ? (
            <div className="loading-message">Loading articles...</div>
          ) : (
            <table className="article-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Authors</th>
                  <th>Source</th>
                  <th>Year</th>
                  <th>DOI</th>
                  <th>Claim</th>
                  <th>Evidence</th>
                  <th>Ratings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <React.Fragment key={article._id}>
                      <tr>
                        <td>{article.title}</td>
                        <td>{article.authors.join(', ')}</td>
                        <td>{article.source}</td>
                        <td>{article.publicationYear}</td>
                        <td>{article.doi}</td>
                        <td>{article.claim || 'N/A'}</td>
                        <td>{article.evidence || 'N/A'}</td>
                        <td>{calculateAverageRating(article.rating)}</td>
                        <td>
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(article)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(article._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      {/*If the current article is in edit mode, show the edit form */}
                      {editArticleId === article._id && editedArticle && (
                        <tr>
                          <td colSpan={9}>
                            <div className="edit-section">
                              <h2>Edit Article</h2>
                              <input
                                type="text"
                                name="title"
                                value={editedArticle.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="edit-input"
                              />
                              <input
                                type="text"
                                name="authors"
                                value={editedArticle.authors.join(', ')}
                                onChange={(e) =>
                                  setEditedArticle({ ...editedArticle, authors: e.target.value.split(', ') })
                                }
                                placeholder="Authors (comma separated)"
                                className="edit-input"
                              />
                              <input
                                type="text"
                                name="source"
                                value={editedArticle.source}
                                onChange={handleInputChange}
                                placeholder="Source"
                                className="edit-input"
                              />
                              <input
                                type="text"
                                name="publicationYear"
                                value={editedArticle.publicationYear}
                                onChange={handleInputChange}
                                placeholder="Year"
                                className="edit-input"
                              />
                              <input
                                type="text"
                                name="doi"
                                value={editedArticle.doi}
                                onChange={handleInputChange}
                                placeholder="DOI"
                                className="edit-input"
                              />
                              <button className="save-button" onClick={handleSaveEdit}>
                                Save Changes
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="no-articles">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
