import { getGameData, getKeyboardLetters } from "@/lib/helper/wordle-helpers";
import { cn } from "@/lib/utils";
import type React from "react";
import { Button } from "../ui/button";

export const Keyboard = () => {
  const { tries, solution } = getGameData();

  const keyboardLetters = getKeyboardLetters(tries, solution);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e);
  };

  return (
    <div className="max-h-[25vh] max-w-[720px] size-full ">
      <div className="flex flex-col gap-2">
        {keyboardLetters.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.map(({ letter, status }, i) => {
              return (
                <Button
                  key={i}
                  variant={"keyWordle"}
                  size={"keyWordle"}
                  state={status}
                  disabled={status === "wrong"}
                  className={cn(
                    letter === "ENTER" && "ml-2 px-4",
                    letter === "⌫" && "ml-2 px-4"
                  )}
                  type="button"
                  onClick={onClick}
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
