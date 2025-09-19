import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import {
  CardContentVariants,
  CardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from "./variants";

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof CardHeaderVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(CardHeaderVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof CardContentVariants>) {
  return (
    <div
      data-slot="card-content"
      className={cn(CardContentVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
