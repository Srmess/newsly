import { useWordleContext } from "@/context/wordle-context";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

export interface FilledLetterBoxProps {
  value: string;
  status: "wrong" | "right-place" | "right-letter" | "neutral";
}

interface LetterBoxProps {
  letterIndex: number;
  focused?: boolean;
  setInputFocus: (index: number) => void;
}

export const LetterBox = React.forwardRef<
  HTMLInputElement | null,
  LetterBoxProps
>(({ letterIndex, focused, setInputFocus, ...props }, ref) => {
  const { setInputIndex } = useWordleContext();

  const { register, setValue } = useFormContext();

  const fieldName = `letter.${letterIndex}` as const;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = (e.target.value || "").slice(-1).toUpperCase();

    if (/^[´`^~]$/.test(val)) {
      val = "";
    }

    setValue(fieldName, val);
    if (val.length > 0) {
      setInputFocus(letterIndex + 1);
      setInputIndex(letterIndex + 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentVal = (e.currentTarget.value || "").toString();

    if (/^[^a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      e.currentTarget.value = currentVal;
      return;
    }

    if (e.key === "ArrowRight") {
      setInputFocus(letterIndex + 1);
      setInputIndex(letterIndex + 1);
      return;
    }

    if (e.key === "ArrowLeft") {
      setInputFocus(letterIndex - 1);
      setInputIndex(letterIndex - 1);
      return;
    }

    if (currentVal.length !== 0) {
      e.currentTarget.value = "";
    }

    if (e.key === "Backspace") {
      if (currentVal.length === 0) {
        setValue(fieldName, "");
        setInputFocus(letterIndex - 1);
        setInputIndex(Math.max(0, letterIndex - 1));
      } else {
        setValue(fieldName, "");
      }
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.currentTarget.value = currentVal;
    }
  };

  return (
    <label
      htmlFor={`letter.${letterIndex}`}
      className={cn(
        "border-5 rounded-lg size-15 flex items-center justify-center focus:border-b-[10px] focus:outline-none",
        focused && "border-b-[10px]"
      )}
      {...props}
    >
      <input
        {...(() => {
          type RegProps = {
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
            ref?:
              | ((instance: HTMLInputElement | null) => void)
              | { current?: HTMLInputElement | null }
              | null;
            name?: string;
            value?: string;
          };

          const reg = register(fieldName) as RegProps | undefined;
          const {
            onChange: regOnChange,
            onBlur: regOnBlur,
            ref: regRef,
            ...regRest
          } = reg || {};

          const combinedOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
            if (typeof regOnChange === "function") regOnChange(e);
          };

          const combinedRef = (el: HTMLInputElement | null) => {
            if (regRef) {
              if (typeof regRef === "function") regRef(el);
              else if (typeof regRef === "object") regRef.current = el;
            }

            if (typeof ref === "function") ref(el);
            else if (ref && typeof ref === "object")
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                el;
          };

          const combinedOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setTimeout(() => {
              const active = (e.target as HTMLElement).ownerDocument
                ?.activeElement as HTMLElement | null;
              const isOurInput = active?.id?.startsWith("letter.");
              if (!isOurInput) {
                (e.target as HTMLInputElement).focus();
              }
            }, 0);

            if (typeof regOnBlur === "function") regOnBlur(e);
          };

          return {
            ...regRest,
            autoComplete: "off",
            onChange: combinedOnChange,
            onBlur: combinedOnBlur,
            ref: combinedRef,
          } as const;
        })()}
        autoFocus={letterIndex === 0}
        onClick={(e) => {
          setInputIndex(letterIndex);
          e.currentTarget.focus();
        }}
        type="text"
        id={`letter.${letterIndex}`}
        inputMode="text"
        maxLength={1}
        pattern={"[a-zA-Z]"}
        onKeyDown={onKeyDown}
        className={cn(
          "w-10 focus:outline-none  block text-center caret-transparent peer uppercase"
        )}
      />
    </label>
  );
});

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
