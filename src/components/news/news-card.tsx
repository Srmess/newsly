import type { Article } from "@/types/new";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card/component";

interface newsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: newsCardProps) => {
  return (
    <Link to={article.url}>
      <Card variant={"newsCard"}>
        <div className="relative">
          <div className="h-full lg:aspect-[3/2] rounded-2xl overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="size-full object-cover drag-none"
            />
          </div>

          <div className="absolute inset-0" />
        </div>
        <CardContent variant={"newsCard"}>
          <CardTitle variant={"newsCard"}>{article.title}</CardTitle>
          <CardDescription>
            <p className="line-clamp-4">{article.description}</p>
          </CardDescription>
          <div className="flex items-center gap-3 text-sm">
            {article.author && (
              <>
                <p className="max-w-48 line-clamp-1">
                  Publicado por: <strong>{article.author}</strong>
                </p>
                •
              </>
            )}

            <p className="text-sm">
              Publicado em:{" "}
              <strong>{format(article.publishedAt, "dd/MM/yyyy")}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
