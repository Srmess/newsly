import { WordleSchema, type WordleInfer } from "@/schemas/wordle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";

type WordleContextType = {
  inputIndex: number;
  setInputIndex: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<WordleInfer>;
};

const wordleContext = createContext<WordleContextType | null>(null);

export const WordleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [inputIndex, setInputIndex] = useState(0);

  const form = useForm<WordleInfer>({
    resolver: zodResolver(WordleSchema),
    defaultValues: {
      letter: [],
      word: "",
    },
  });

  return (
    <wordleContext.Provider value={{ form, inputIndex, setInputIndex }}>
      {children}
    </wordleContext.Provider>
  );
};

export function useWordleContext() {
  const ctx = useContext(wordleContext);

  if (!ctx) throw new Error("useWordle precisa estar dentro de WordleProvider");

  return ctx;
}
