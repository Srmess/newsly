import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private-layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="min-h-screen h-full flex">
      <aside className="w-[300px] bg-sidebar">private layout</aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
