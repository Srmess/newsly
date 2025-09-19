import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card/component";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CardContent className="h-20">
        <h1>Name</h1>
        <h1>Email</h1>
        <h1>Password</h1>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Register</Button>

        <Button variant={"link"} asChild>
          <Link to={"/login"}>{"Login account"}</Link>
        </Button>
      </CardFooter>
    </>
  );
}
