import { useNavigate, useSearch } from "@tanstack/react-router";
import { debounce } from "lodash";
import { Newspaper } from "lucide-react";
import { Input } from "../ui/input";

export const NewsHeader = () => {
  const navigate = useNavigate();
  const { search } = useSearch({ from: "/_news-layout/news" });

  const debouncedSetSearch = debounce((value: string) => {
    navigate({
      to: "/news",
      search: (old) => ({ ...old, search: value }),
    });
  }, 400);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  return (
    <header className="bg-sidebar px-20 py-5 sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-2 w-fit">
        <Newspaper size={30} />
        <p className="text-2xl">Newsly</p>
      </div>
      <div className="max-w-[300px] w-full justify-self-end">
        <Input onChange={handleSearch} defaultValue={search} />
      </div>
    </header>
  );
};
