import { cn } from "@/lib/utils";

export interface FilledLetterBoxProps {
  value: string;
  status: "wrong" | "right-place" | "right-letter" | "neutral";
}

// interface LetterBoxProps {
//   letterId: number;
//   focused?: boolean;
// }

export const LetterBox = () => {
  return (
    <label
      htmlFor="1"
      className="border-5 rounded-xl size-15 flex items-center justify-center"
    >
      <input
        type="text"
        id="1"
        pattern={"[a-zA-Z]+"}
        maxLength={1}
        className="w-10 focus:outline-none  block text-center caret-transparent peer uppercase"
      />
    </label>
  );
};

export const EmptyLetterBox = () => {
  return (
    <div className="bg-border rounded-xl size-15 flex items-center justify-center " />
  );
};

export const FilledLetterBox = ({ value, status }: FilledLetterBoxProps) => {
  return (
    <div
      className={cn(
        "rounded-xl size-15 flex items-center justify-center uppercase",
        status === "wrong" && "bg-primary-foreground",
        status === "right-letter" && "bg-system-yellow",
        status === "right-place" && "bg-system-green"
      )}
    >
      {value}
    </div>
  );
};
