import { useWordleContext } from "@/context/wordle-context";
import { getFilledData, getGameData } from "@/lib/helper/wordle-helpers";
import { useRef } from "react";
import { EmptyLetterBox, FilledLetterBox, LetterBox } from "./letter-box";

interface WordRowProps {
  tryWord?: Array<string>;
  rowIndex: number;
}

export const WordRow = ({ rowIndex }: WordRowProps) => {
  const { tries, solution, curRow } = getGameData();

  const labelRefs = useRef<Array<HTMLInputElement | null>>(Array(5).fill(null));

  const { inputIndex } = useWordleContext();

  const isFilled = tries.length > rowIndex;
  const solutionArr = solution.split("");

  const setInputFocus = (index: number) => {
    const input = labelRefs.current[index];
    input?.focus();
  };

  return (
    <div className="flex justify-center gap-2 mb-4 mt-2 text-2xl font-extrabold">
      {Array.from({ length: 5 }).map((_, i) => {
        if (curRow === rowIndex) {
          return (
            <LetterBox
              key={i}
              letterIndex={i}
              focused={i === inputIndex}
              setInputFocus={setInputFocus}
              ref={(el) => {
                labelRefs.current[i] = el;
                return undefined;
              }}
            />
          );
        }
        if (isFilled) {
          const letter = tries[rowIndex][i];
          const filledData = getFilledData(solutionArr, i, letter);

          return (
            <FilledLetterBox
              key={i}
              value={filledData.letter}
              status={filledData.status}
            />
          );
        } else {
          return <EmptyLetterBox key={i} />;
        }
      })}
    </div>
  );
};
