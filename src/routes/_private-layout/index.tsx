import { newsAPI } from "@/lib/axios";
import { createFileRoute } from "@tanstack/react-router";
import { startOfYesterday } from "date-fns";

export const Route = createFileRoute("/_private-layout/")({
  component: RouteComponent,
  loader: async () => {
    try {
      const today = new Date().toISOString();
      const yesterday = startOfYesterday();

      const news = await newsAPI.get(
        `/v2/everything?q=flamengo&language=pt&pageSize=10&sortBy=publishedAt&from=${yesterday}&to=${today}`
      );

      return news;
    } catch (error) {
      console.log(error);
    }
  },
});

function RouteComponent() {
  const news = Route.useLoaderData();

  console.log(news);

  return <pre>{JSON.stringify(news?.data.articles, undefined, 2)} </pre>;
}
