import { cva } from "class-variance-authority";

export const cardTitleVariants = cva(
  "first-letter:uppercase leading-none font-semibold ",
  {
    variants: {
      variant: {
        default: "",
        newsCard: "text-lg md:text-xl lg:text-2xl font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const cardVariants = cva(
  "bg-card text-card-foreground flex rounded-xl border p-10 shadow-sm",
  {
    variants: {
      variant: {
        default: "flex-col gap-6",
        newsCard: "max-h-72 flex-row gap-6 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const CardHeaderVariants = cva(
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
  {
    variants: {
      variant: {
        default: "",
        newsCard: " p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const CardContentVariants = cva(
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
  {
    variants: {
      variant: {
        default: "",
        newsCard: "space-y-2 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
