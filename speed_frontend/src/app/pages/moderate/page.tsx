"use client";

import React, { useState, useEffect } from "react";

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

const ModeratorPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ense-701-w206-01-wqfo.vercel.app/articles/status/unmoderated"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error("Unexpected API response:", data);
          setError("Unexpected response from the server.");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const calculateAverageRating = (ratings: number[]) => {
    if (ratings.length === 0) return "No ratings";
    const average =
      ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    return average.toFixed(1);
  };

  const updateArticleStatus = async (
    articleId: string,
    action: "verify" | "deny"
  ) => {
    try {
      if (action === "verify") {
        const response = await fetch(
          'https://ense-701-w206-01-wqfo.vercel.app/articles/${articleId}/verify',
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Verification failed: ${response.statusText}`);
        }
      } else if (action === "deny") {
        const response = await fetch(
          `https://ense-701-w206-01-wqfo.vercel.app/articles/${articleId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error(`Deletion failed: ${response.statusText}`);
        }
      }
      // Refresh articles after updating status
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch (error) {
      console.error("Error updating article status:", error);
      setError("Failed to update article status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Articles</h1>
      <div className="bg-white shadow-md rounded p-4">
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Authors</th>
                <th className="border px-4 py-2">Source</th>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">DOI</th>
                <th className="border px-4 py-2">Claim</th>
                <th className="border px-4 py-2">Evidence</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article._id}>
                    <td className="border px-4 py-2">{article.title}</td>
                    <td className="border px-4 py-2">
                      {article.authors.join(", ")}
                    </td>
                    <td className="border px-4 py-2">{article.source}</td>
                    <td className="border px-4 py-2">
                      {article.publicationYear}
                    </td>
                    <td className="border px-4 py-2">{article.doi}</td>
                    <td className="border px-4 py-2">
                      {article.claim.length > 0 ? article.claim : "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {article.evidence.length > 0
                        ? article.evidence
                        : "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {calculateAverageRating(article.rating)}/5
                    </td>
                    <td className="border px-4 py-2">
                      {article.status || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                        onClick={() =>
                          updateArticleStatus(article._id, "verify")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          updateArticleStatus(article._id, "deny")
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
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
        )}
      </div>
    </div>
  );
};

export default ModeratorPage;