
import "server-only";

import { getAllNews } from "@/lib/news";
import { NewsSectionClient } from "./NewsSectionClient";

export function NewsSection() {
  const articles = getAllNews();

  console.log(
    "[Futurex Homepage] News articles:",
    articles.length
  );

  return <NewsSectionClient articles={articles} />;
}

export default NewsSection;
