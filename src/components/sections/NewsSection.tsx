
import { getAllNews } from "@/lib/news";
import { NewsSectionClient } from "./NewsSectionClient";

export function NewsSection() {
  const articles = getAllNews();

  if (articles.length === 0) return null;

  return <NewsSectionClient articles={articles} />;
}

export default NewsSection;
