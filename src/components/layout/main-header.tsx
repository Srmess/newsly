import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const MainHeader = () => {
  return (
    <div className="h-8 bg-primary flex justify-center w-full">
      <Link to="/news" activeOptions={{ exact: true, includeSearch: false }}>
        {({ isActive }) => (
          <Button variant={"tab"} size={"tab"} data-active={isActive}>
            Newsly
          </Button>
        )}
      </Link>
      <Link to="/wordle" activeOptions={{ exact: true }}>
        {({ isActive }) => (
          <Button variant={"tab"} size={"tab"} data-active={isActive}>
            Letraço
          </Button>
        )}
      </Link>
    </div>
  );
};
