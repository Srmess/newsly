import { getFilledData } from "@/lib/helper/wordle-helpers";
import { useRouteContext } from "@tanstack/react-router";
import { EmptyLetterBox, FilledLetterBox, LetterBox } from "./letter-box";

interface WordRowProps {
  currentRow: number;
  tryWord?: Array<string>;
  empty?: boolean;
  rowIndex: number;
}

export const WordRow = ({ currentRow, empty, rowIndex }: WordRowProps) => {
  const {
    MOCKED_DATA: { tries, solution },
  } = useRouteContext({ from: "/_wordle-layout/wordle" });

  const isFilled = tries.length > rowIndex;
  const solutionArr = solution.split("");

  return (
    <div className="flex justify-center gap-2 mb-4 mt-2 text-2xl font-extrabold">
      {Array.from({ length: 5 }).map((_, i) => {
        if (empty) {
          return <EmptyLetterBox key={i} />;
        }
        if (isFilled) {
          const letter = tries[rowIndex][i];
          const filledData = getFilledData(solutionArr, i, letter);
          return (
            <FilledLetterBox
              value={filledData.letter}
              status={filledData.status}
            />
          );
        } else {
          return <LetterBox letterId={i} />;
        }
      })}
    </div>
  );
};
