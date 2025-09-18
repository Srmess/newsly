import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CardContent className="h-20">
        <div className="w-[300px] max-w-full">
          <h1>Email</h1>
          <h1>Password</h1>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>

        <Button variant={"link"} asChild>
          <Link to={"/register"}>{"Create account"}</Link>
        </Button>
      </CardFooter>
    </>
  );
}
