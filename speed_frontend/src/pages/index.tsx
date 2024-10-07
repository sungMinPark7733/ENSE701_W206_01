import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <main>
      <h1>Articles</h1>
      <ArticleList articles={articles} />
    </main>
  );
}