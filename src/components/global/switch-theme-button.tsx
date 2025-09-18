import { Sun } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

function switchTheme(theme: "dark" | "light") {
  switch (theme) {
    case "light":
      window.localStorage.theme = "dark";
      break;
    case "dark":
      window.localStorage.theme = "light";
      break;
  }

  document.body.className = window.localStorage.theme;
}

export const SwitchThemeButton = () => {
  useEffect(() => {
    window.localStorage.theme = window.localStorage.theme ?? "light";
    document.body.className = window.localStorage.theme ?? "light";
  }, []);

  return (
    <Button
      className="absolute bottom-2 left-2"
      onClick={() => {
        switchTheme(window.localStorage.theme);
      }}
    >
      <Sun />
    </Button>
  );
};
