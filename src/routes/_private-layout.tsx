import { MainHeader } from "@/components/layout/main-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private-layout")({
  component: LayoutComponent,
  notFoundComponent: RouteNotFoundPage,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen h-full">
      <MainHeader />
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
