import { Keyboard } from "@/components/wordle/keyboard";
import { WordRow } from "@/components/wordle/word-row";
import { useWordleContext } from "@/context/wordle-context";
import { getGameData } from "@/lib/helper/wordle-helpers";
import { words, wordsWithAccents } from "@/lib/words";
import { WordleSchema, type WordleInfer } from "@/schemas/wordle-schema";
import type { LocalStorageWordleData } from "@/types/wordle";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const Route = createFileRoute("/_wordle-layout/wordle")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setToastError, toastError } = useWordleContext();
  const gameData = getGameData();

  const form = useForm<WordleInfer>({
    resolver: zodResolver(WordleSchema),
    defaultValues: {
      letter: [],
    },
  });

  const onSubmit = (data: WordleInfer) => {
    const letter = data.letter.map((letter) => letter.toLowerCase());

    let word = letter.join().replaceAll(",", "").toLowerCase();

    const wordExist = words.has(word);

    if (!wordExist) {
      setToastError("Essa palavra não é aceita");
      return;
    }

    setToastError(null);

    const wordHasAccentuation =
      wordsWithAccents[word as keyof typeof wordsWithAccents];

    if (wordHasAccentuation) {
      word = wordHasAccentuation;
    }

    gameData.tries.push(letter);

    localStorage.setItem(
      "letraco",
      JSON.stringify({
        ...gameData,
        tries: gameData.tries,
        curRow: gameData.curRow + 1,
      } as LocalStorageWordleData)
    );

    form.reset();
  };

  useEffect(() => {
    if (toastError && gameData.curRow < 5) {
      setTimeout(() => {
        setToastError(null);
      }, 50000);
    }
  }, [toastError]);

  useEffect(() => {
    const err = form.formState.errors.letter?.[4]?.message;
    if (err) {
      setToastError(err);
    }
    if (gameData.curRow > 5) {
      setToastError(`Palavra certa: ${gameData.solution}`);
    }
  }, [form.formState.errors, setToastError]);

  return (
    <div className="h-full flex flex-col gap-5">
      <div className="w-full h-8 flex items-center justify-center">
        {toastError && (
          <p className="w-fit bg-chart-5/40 rounded-lg px-4 py-1 text-lg font-extrabold leading tracking-widest">
            {toastError}
          </p>
        )}
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center size-full gap-4"
        >
          <div className="flex flex-col gap-2 ">
            {Array.from({ length: 6 }).map((_, i) => (
              <WordRow key={i} rowIndex={i} />
            ))}
          </div>
          <Keyboard />
        </form>
      </FormProvider>
    </div>
  );
}
