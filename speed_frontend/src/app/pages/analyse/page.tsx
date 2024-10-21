"use client";

import React, { useState, useEffect } from "react";
import "./analyse.css";

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
  status: string;
}

const BrowseAnalyze = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [editedArticle, setEditedArticle] = useState<Article | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/status/moderated`
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleEdit = (article: Article) => {
    setEditArticleId(article._id);
    setEditedArticle(article); // Set the current article for editing
  };

  const handleSaveEdit = async () => {
    if (editedArticle) {
      try {
        const response = await fetch(
          `https://ense-701-w206-01-wqfo.vercel.app/articles/${editedArticle._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedArticle),
          }
        );
        if (response.ok) {
          setEditArticleId(null); // Exit Edit Mode
          setSuccessMessage("Article updated successfully!");
          setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
          // Fetch updated articles
          const fetchUpdatedArticles = await fetch(
            `https://ense-701-w206-01-wqfo.vercel.app/articles/status/moderated`
          );
          const updatedData = await fetchUpdatedArticles.json();
          setArticles(updatedData);
        } else {
          console.error("Failed to update article");
        }
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editedArticle) {
      setEditedArticle({
        ...editedArticle,
        [name]: value,
      });
    }
  };

  return (
    <div className="analyse-page">
      <div className="analyse-container">
        <div className="search-section">
          <h1>Browse Moderated Articles</h1>
        </div>

        <div className="table-section">
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
                <th>Average Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <React.Fragment key={article._id}>
                    <tr>
                      <td>{article.title}</td>
                      <td>{article.authors.join(", ")}</td>
                      <td>{article.source}</td>
                      <td>{article.publicationYear}</td>
                      <td>{article.doi}</td>
                      <td>{article.claim || "N/A"}</td>
                      <td>{article.evidence || "N/A"}</td>
                      <td>
                        {article.rating.length > 0
                          ? (
                              article.rating.reduce(
                                (acc, curr) => acc + curr,
                                0
                              ) / article.rating.length
                            ).toFixed(1)
                          : "No ratings"}
                      </td>
                      <td>{article.status}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(article)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>

                    {editArticleId === article._id && editedArticle && (
                      <tr>
                        <td colSpan={10}>
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
                              value={editedArticle.authors.join(", ")}
                              onChange={(e) =>
                                setEditedArticle({
                                  ...editedArticle,
                                  authors: e.target.value.split(", "),
                                })
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
                            <button
                              className="save-button"
                              onClick={handleSaveEdit}
                            >
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
                  <td colSpan={10} className="text-center">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseAnalyze;
