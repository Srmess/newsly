import { WordleHeader } from "@/components/layout/wordle-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_wordle-layout")({
  component: LayoutComponent,
  notFoundComponent: RouteNotFoundPage,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen h-full">
      <WordleHeader />
      <div className="h-full py-10">
        <Outlet />
      </div>
    </div>
  );
}

function RouteNotFoundPage() {
  return (
    <div>
      <p>This is the notFoundComponent configured on root route</p>
    </div>
  );
}
