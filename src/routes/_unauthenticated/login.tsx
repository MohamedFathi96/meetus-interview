import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/Auth/Login";

export const Route = createFileRoute("/_unauthenticated/login")({
  component: Login,
});
