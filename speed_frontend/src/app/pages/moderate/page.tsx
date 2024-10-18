"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

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

const BrowsePage = () => {
  useRequireAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8082/articles/status/unmoderated"
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
      let response;
  
      if (action === "verify") {
        response = await fetch(`http://localhost:8082/articles/${articleId}/verify`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (action === "deny") {
        response = await fetch(`http://localhost:8082/articles/${articleId}`, {
          method: "DELETE",
        });
      }
  
  
      // If successful, remove the article from the list
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error(`Error ${action} article:`, error);
  
      if (error instanceof Error) {
        setError(`Error ${action} article: ${error.message}`);
      } else {
        setError(`An unknown error occurred during ${action}.`);
      }
    }
  };

  return (
    <div className="min-h-screen mt-16">
      <div className="flex justify-center items-center space-x-4 xl:w-3/4 mx-auto">
        <span className="font-bold text-xl flex-shrink-0 whitespace-nowrap">
          Browse unmoderated articles
        </span>
      </div>

      <div className="mt-16">
        <div className="px-4 md:px-8">
          {loading ? (
            <p className="text-center">Loading articles...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="min-w-full table-auto border border-blue-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left font-bold">
                    Title
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Authors
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Source
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">Year</th>
                  <th className="border px-4 py-2 text-left font-bold">DOI</th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Claim
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Evidence
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Rating
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Status
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article._id}>
                      <td className="border px-4 py-2">
                        <Link
                          href={`/pages/moderate/${article._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </td>
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
                        {article.evidence.length > 0 ? article.evidence : "N/A"}
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
    </div>
  );
};

export default BrowsePage;
