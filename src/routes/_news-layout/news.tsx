import { NewsCard } from "@/components/news/news-card";
import { NewsPagination } from "@/components/news/news-pagination";
import { listNewsQueryOptions } from "@/services/news";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import z from "zod";

const newsSearch = z.object({
  search: z.string().optional(),
  language: z.string().optional(),
  pageSize: z.number().optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/_news-layout/news")({
  component: RouteComponent,
  validateSearch: (search) => newsSearch.parse(search),
  beforeLoad: ({ search }) => search,
  errorComponent: () => {
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
    <div className="flex flex-col gap-3 px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {news?.data?.articles?.map((article) => {
          return <NewsCard article={article} key={article.url} />;
        })}
      </div>
      <NewsPagination totalResults={news?.data?.totalResults || 0} />
    </div>
  );
}
