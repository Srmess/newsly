type Source = {
  id?: string;
  name: string;
};

export type Article = {
  source: Source;
  author: string;
  title?: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

export type listNewsResponse = {
  totalResults: number;
  articles: Article[];
};
