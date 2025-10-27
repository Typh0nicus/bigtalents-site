import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEWS } from "@/data/news";
import NewsArticle from "@/components/news/NewsArticle";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return NEWS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Big Talents",
    };
  }

  return {
    title: `${article.title} | Big Talents News`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = NEWS.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return <NewsArticle article={article} />;
}
