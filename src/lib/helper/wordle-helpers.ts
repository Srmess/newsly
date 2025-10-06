import type { FilledLetterBoxProps } from "@/components/wordle/letter-box";
import type { LocalStorageWordleData } from "@/types/wordle";

import { random } from "lodash";
import { WORDLE_KEYS } from "../wordle/keyboard-layout";
import { words } from "../words";

type LetterStatus = FilledLetterBoxProps["status"];

export function getFilledData(
  solution: Array<string>,
  letterIndex: number,
  letter: string
): { letter: string; status: LetterStatus } {
  if (solution[letterIndex] === letter) {
    return { letter, status: "right-place" };
  }

  if (solution.includes(letter)) {
    return { letter, status: "right-letter" };
  } else {
    return { letter, status: "wrong" };
  }
}

export function getKeyboardLetters(tries: string[][], solution: string) {
  const solutionArr = solution.split("");

  const usedLetters = new Map<string, LetterStatus>();

  for (const word of tries) {
    word.forEach((letter, index) => {
      const { status } = getFilledData(solutionArr, index, letter);

      if (
        status === "right-place" ||
        (status === "right-letter" &&
          usedLetters.get(letter) !== "right-place") ||
        (!usedLetters.has(letter) && status === "wrong")
      ) {
        usedLetters.set(letter, status);
      }
    });
  }

  return WORDLE_KEYS.map((row) =>
    row.map((key) => ({
      letter: key,
      status: usedLetters.get(key) ?? "neutral",
    }))
  );
}

export function getGameData() {
  let gameData = localStorage.getItem("letraco");

  if (!gameData) {
    resetGame();
  }

  gameData = localStorage.getItem("letraco")!;

  return JSON.parse(gameData) as LocalStorageWordleData;
}

export function resetGame() {
  const solution = Array.from(words)[random(0, words.size)];

  localStorage.setItem(
    "letraco",
    JSON.stringify({
      curRow: 0,
      gameOver: 0,
      invalids: [],
      solution: solution,
      tries: [],
      won: null,
    })
  );
}
