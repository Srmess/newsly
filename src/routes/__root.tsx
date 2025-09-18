import { SwitchThemeButton } from "@/components/global/switch-theme-button";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <SwitchThemeButton />
    </>
  );
}
