import { WordleHeader } from "@/components/layout/wordle-header";
import { WordleContextProvider } from "@/context/wordle-context";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_wordle-layout")({
  component: LayoutComponent,
  notFoundComponent: RouteNotFoundPage,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen h-full">
      <WordleHeader />
      <WordleContextProvider>
        <div className="h-full pb-10 py-5">
          <Outlet />
        </div>
      </WordleContextProvider>
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
