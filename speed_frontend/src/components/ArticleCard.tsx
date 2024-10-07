export default function ArticleCard({ article }: { article: any }) {
    return (
      <div className="article-card">
        <h3>{article.title}</h3>
        <p>Authors: {article.authors}</p>
        <p>Published: {article.published_date}</p>
        <p>Journal/Conference: {article.journal_conference}</p>
        <p>Claim: {article.claim}</p>
        <p>Evidence: {article.evidence_result}</p>
      </div>
    );
  }