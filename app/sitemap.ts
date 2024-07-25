import { MetadataRoute } from "next";

import {
  getAlternatives,
  getHelpArticles,
  getPages,
  getPosts,
} from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const solutions = await getPages();
  const alternatives = await getAlternatives();
  const helpArticles = await getHelpArticles();
  const blogLinks = posts.map((post) => ({
    url: `https://www.simpleteam.co/blog/${post?.data.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
  const solutionLinks = solutions.map((solution) => ({
    url: `https://www.simpleteam.co/solutions/${solution?.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
  const alternativeLinks = alternatives.map((alternative) => ({
    url: `https://www.simpleteam.co/alternatives/${alternative?.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
  const helpArticleLinks = helpArticles.map((article) => ({
    url: `https://www.simpleteam.co/help/article/${article?.data.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    {
      url: "https://www.simpleteam.co",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/pricing",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/privacy",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/terms",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/docsend-alternatives",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/oss-friends",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://vc.simpleteam.co",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/investors",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/skills-map",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/share-notion-page",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/ai",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/ai-pitch-deck-generator",
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: "https://www.simpleteam.co/blog",
      lastModified: new Date().toISOString().split("T")[0],
    },
    ...blogLinks,
    ...solutionLinks,
    ...alternativeLinks,
    ...helpArticleLinks,
  ];
}
