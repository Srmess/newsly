import { Baseline } from "lucide-react";

export const WordleHeader = () => {
  return (
    <header className="bg-sidebar px-20 py-5 sticky top-0 z-10 flex justify-center">
      <div className="flex items-center gap-2 w-fit">
        <Baseline size={30} />
        <p className="text-2xl">Letraço</p>
      </div>
    </header>
  );
};
