import { Card, CardTitle } from "@/components/ui/card/component";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const pathname = useLocation().pathname.replace("/", "");

  return (
    <div className="min-h-screen h-full flex items-center justify-center antialiased">
      <Card className="max-w-[400px] w-full">
        <CardTitle>
          <CardTitle>{pathname}</CardTitle>
        </CardTitle>
        <Outlet />
      </Card>
    </div>
  );
}
