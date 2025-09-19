import { newsAPI } from "@/lib/axios";
import type { listNewsResponse } from "@/types/new";
import { queryOptions } from "@tanstack/react-query";

interface getProps {
  search?: string;
  language?: string;
  pageSize?: number;
  page?: number;
}

export const listNewsQueryOptions = ({
  search = "a",
  pageSize = 10,
  page = 1,
  language = "pt",
}: getProps) =>
  queryOptions({
    queryKey: ["get-v1-list-news", search, pageSize, page, language],
    queryFn: async () => {
      const q = search ? search : "a";

      console.log(q);

      const news = await newsAPI.get<listNewsResponse>(
        `/v2/everything?q=${q}&searchIn=title&language=${language}&pageSize=${pageSize}&page=${page}&sortBy=publishedAt`
      );

      return news;
    },
  });
