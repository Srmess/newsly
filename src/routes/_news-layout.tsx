import { NewsHeader } from "@/components/layout/news-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_news-layout")({
  component: LayoutComponent,
  notFoundComponent: RouteNotFoundPage,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen h-full">
      <NewsHeader />
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
