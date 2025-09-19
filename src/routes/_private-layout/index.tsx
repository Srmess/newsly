import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card/component";
import { listNewsQueryOptions } from "@/services/news";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { format } from "date-fns";
import z from "zod";

const newsSearch = z.object({
  search: z.string().optional(),
  language: z.string().optional(),
  pageSize: z.number().optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/_private-layout/")({
  component: RouteComponent,
  validateSearch: (search) => newsSearch.parse(search),
  beforeLoad: ({ search }) => search,
  errorComponent: () => {
    //componentizar error
    return (
      <>
        <h2>Error</h2>
      </>
    );
  },
  loader: async ({ context }) => {
    const { queryClient, language, page, pageSize, search } = context;

    try {
      const news = await queryClient.ensureQueryData(
        listNewsQueryOptions({ language, page, pageSize, search })
      );
      return news;
    } catch (error) {
      //componentizar catch
      if (axios.isAxiosError(error)) {
        throw new Error(error?.response?.data?.message);
      }
      console.log(error);
    }
  },
});

function RouteComponent() {
  const news = Route.useLoaderData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
      {news?.data?.articles?.map((article, index) => {
        return (
          <Card key={index} variant={"newsCard"}>
            <div className="relative">
              <div className="h-full aspect-[3/2] rounded-2xl overflow-hidden">
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
                <p>Publicado por: {article.author}</p>•
                <p className="text-sm">
                  Publicado em: {format(article.publishedAt, "dd/MM/yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
