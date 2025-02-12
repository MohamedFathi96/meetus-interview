import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    };

    return axios.get("https://api-yeshtery.dev.meetusvr.com/v1/user/info", { headers }).catch((error: unknown) => {
      throw redirect({
        to: "/login",
      });
    });
  },
});
