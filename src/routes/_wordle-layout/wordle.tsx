import { Keyboard } from "@/components/wordle/keyboard";
import { WordRow } from "@/components/wordle/word-row";
import { useWordleContext } from "@/context/wordle-context";
import { words, wordsWithAccents } from "@/lib/words";
import { WordleSchema, type WordleInfer } from "@/schemas/wordle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const MOCKED_DATA = {
  curRow: 3,
  curTry: [],
  curday: 1360,
  gameOver: 0,
  invalids: [],
  normSolution: "adiar",
  solution: "adiar",
  tries: [
    ["l", "e", "t", "r", "a"],
    ["a", "t", "r", "a", "s"],
    ["h", "o", "m", "e", "m"],
  ],
  won: null,
};

export const Route = createFileRoute("/_wordle-layout/wordle")({
  component: RouteComponent,
  context: () => ({ MOCKED_DATA }),
});

function RouteComponent() {
  const { MOCKED_DATA } = Route.useRouteContext();
  const { setToastError, toastError } = useWordleContext();

  const emptiesRow = 6 - MOCKED_DATA.tries.length;

  const form = useForm<WordleInfer>({
    resolver: zodResolver(WordleSchema),
    defaultValues: {
      letter: [],
    },
  });

  const onSubmit = (data: WordleInfer) => {
    const { letter } = data;

    let word = letter.join().replaceAll(",", "").toLowerCase();

    const wordExist = words.has(word);

    if (!wordExist) {
      setToastError("Essa palavra não é aceita");
      return;
    }

    const wordHasAccentuation =
      wordsWithAccents[word as keyof typeof wordsWithAccents];

    if (wordHasAccentuation) {
      word = wordHasAccentuation;
    }

    console.log(word);
  };

  useEffect(() => {
    if (toastError) {
      setTimeout(() => {
        setToastError(null);
      }, 50000);
    }
  }, [toastError]);

  if (form.formState.errors) {
    console.log(form.formState.errors);
  }

  return (
    <div className="space-y-2">
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
          className="flex flex-col items-center size-full"
        >
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <WordRow key={i} empty={emptiesRow < i} rowIndex={i} />
            ))}
          </div>

          <Keyboard />
        </form>
      </FormProvider>
    </div>
  );
}
