import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const MainHeader = () => {
  return (
    <header className="bg-sidebar px-20 sticky top-0 z-10">
      <Button variant={"tab"} size={"tab"} asChild>
        <Link
          to="/"
          search={{
            search: "",
            page: 1,
            pageSize: 10,
          }}
        >
          Geralzão
        </Link>
      </Button>
      <Button variant={"tab"} size={"tab"}>
        <Link to="/">Esporte</Link>
      </Button>
      <Button variant={"tab"} size={"tab"}>
        <Link to="/">Politica</Link>
      </Button>
      <Button variant={"tab"} size={"tab"}>
        <Link to="/">Tecnologia</Link>
      </Button>
      <Button variant={"tab"} size={"tab"}>
        <Link to="/">Economia</Link>
      </Button>
    </header>
  );
};
