import { useSearch } from "@tanstack/react-router";
import { round } from "lodash";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface NewsPaginationProps {
  totalResults: number;
}

export const NewsPagination = ({ totalResults }: NewsPaginationProps) => {
  const { page } = useSearch({ from: "/_private-layout/news" });
  const totalPages = totalResults > 1000 ? 10 : round(totalResults / 10);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to="/news"
            search={(old) => {
              return { ...old, page: (page || 1) - 1 };
            }}
            disabled={(page || 1) <= 1}
            resetScroll
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                to="/news"
                search={(old) => {
                  return { ...old, page: index + 1 };
                }}
                isActive={index === (page || 1) - 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            to="/news"
            search={(old) => {
              return { ...old, page: (page || 1) + 1 };
            }}
            disabled={(page || 1) == totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
