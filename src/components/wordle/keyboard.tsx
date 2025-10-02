import { useWordleContext } from "@/context/wordle-context";
import { getGameData, getKeyboardLetters } from "@/lib/helper/wordle-helpers";
import { cn } from "@/lib/utils";
import type { WordleInfer } from "@/schemas/wordle-schema";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

export const Keyboard = () => {
  const { tries, solution } = getGameData();
  const { inputIndex, setInputIndex } = useWordleContext();

  const form = useFormContext<WordleInfer>();

  const keyboardLetters = getKeyboardLetters(tries, solution);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.title;
    const currentVal = form.getValues(`letter.${inputIndex}`) || "";

    if (key === "ENTER") {
      return;
    }

    if (key === "⌫") {
      if (currentVal.length === 0) {
        form.setValue(`letter.${inputIndex}`, "");
        form.setFocus(`letter.${inputIndex - 1}`);
        setInputIndex(Math.max(0, inputIndex - 1));
      } else {
        form.setValue(`letter.${inputIndex}`, "");
      }
      return;
    }

    form.setValue(`letter.${inputIndex}`, key);

    if (inputIndex < 4) {
      form.setFocus(`letter.${inputIndex + 1}`);
      setInputIndex(Math.max(0, inputIndex + 1));
    }
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
                  // disabled={status === "wrong"}
                  className={cn(
                    letter === "ENTER" && "ml-2 px-4",
                    letter === "⌫" && "ml-2 px-4"
                  )}
                  title={letter}
                  type={letter === "ENTER" ? "submit" : "button"}
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
