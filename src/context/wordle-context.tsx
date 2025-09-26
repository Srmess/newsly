import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type WordleContextType = {
  inputIndex: number;
  setInputIndex: Dispatch<SetStateAction<number>>;
  toastError: string | null;
  setToastError: Dispatch<SetStateAction<string | null>>;
};

const wordleContext = createContext<WordleContextType | null>(null);

export const WordleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [inputIndex, setInputIndex] = useState(0);
  const [toastError, setToastError] = useState<string | null>("");

  return (
    <wordleContext.Provider
      value={{ inputIndex, setInputIndex, toastError, setToastError }}
    >
      {children}
    </wordleContext.Provider>
  );
};

export function useWordleContext() {
  const ctx = useContext(wordleContext);

  if (!ctx) throw new Error("useWordle precisa estar dentro de WordleProvider");

  return ctx;
}
