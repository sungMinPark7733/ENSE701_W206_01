import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  // Fetch the articles data from your backend API
  const res = await fetch('http://localhost:8082/api/books'); // Adjust the URL to your backend server
  const articles = await res.json();

  // Map the data to ensure all articles have consistent property names
  const formattedArticles = articles.map((article: any) => ({
    id: article._id,
    title: article.title,
    authors: article.author,
    source: article.source || "Unknown Source",
    pubyear: article.published_date,
    doi: article.doi || "N/A",
    claim: article.claim || "N/A",
    evidence: article.evidence || "N/A",
  }));

  return {
    props: {
      articles: formattedArticles,
    },
  };
};

export default Articles;