type Source = {
  id?: string;
  name: string;
};

export type New = {
  source: Source;
  author: string;
  title?: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};
