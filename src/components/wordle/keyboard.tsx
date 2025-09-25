import { getKeyboardLetters } from "@/lib/helper/wordle-helpers";
import { cn } from "@/lib/utils";
import { useRouteContext } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const Keyboard = () => {
  const {
    MOCKED_DATA: { tries, solution },
  } = useRouteContext({ from: "/_wordle-layout/wordle" });

  const keyboardLetters = getKeyboardLetters(tries, solution);

  return (
    <div className="max-h-[25vh] max-w-[720px] size-full ">
      <div className="flex flex-col gap-2">
        {keyboardLetters.map((row) => (
          <div className="flex justify-center gap-1">
            {row.map(({ letter, status }) => {
              return (
                <Button
                  variant={"keyWordle"}
                  size={"keyWordle"}
                  state={status}
                  disabled={status === "wrong"}
                  className={cn(
                    letter === "ENTER" && "ml-2 px-4",
                    letter === "⌫" && "ml-2 px-4"
                  )}
                >
                  {letter.toUpperCase()}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
