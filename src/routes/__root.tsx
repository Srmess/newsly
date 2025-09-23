import { SwitchThemeButton } from "@/components/global/switch-theme-button";
import { MainHeader } from "@/components/layout/main-header";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: RouteNotFoundPage,
  head: () => ({
    meta: [
      {
        title: "Newsly",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <MainHeader />
      <HeadContent />
      <Outlet />
      <SwitchThemeButton />
    </>
  );
}

function RouteNotFoundPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>Pagina não encontrada</p>
    </div>
  );
}
