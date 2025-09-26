import { Keyboard } from "@/components/wordle/keyboard";
import { WordRow } from "@/components/wordle/word-row";
import { WordleSchema, type WordleInfer } from "@/schemas/wordle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
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

  const emptiesRow = 6 - MOCKED_DATA.tries.length;

  const form = useForm<WordleInfer>({
    resolver: zodResolver(WordleSchema),
    defaultValues: {
      letter: [],
      word: "",
    },
  });

  const onSubmit = (data: WordleInfer) => {
    console.log(data);
  };

  return (
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
  );
}
