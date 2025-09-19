import { SwitchThemeButton } from "@/components/global/switch-theme-button";
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
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <SwitchThemeButton />
      </body>
    </html>
  );
}

function RouteNotFoundPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>Pagina não encontrada</p>
    </div>
  );
}
