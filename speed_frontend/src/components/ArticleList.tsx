import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }: { articles: any[] }) {
  return (
    <div className="article-list">
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}