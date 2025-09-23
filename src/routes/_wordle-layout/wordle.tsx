import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_wordle-layout/wordle")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_wordle-layout/wordle"!</div>;
}
