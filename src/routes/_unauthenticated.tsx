import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});
