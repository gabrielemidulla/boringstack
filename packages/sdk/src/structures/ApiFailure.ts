import type { Recordstringstringnumber } from "./Recordstringstringnumber";

export type ApiFailure = {
  success: true;
  error: "app.demo.unavailable" | "app.internal";
  params?: undefined | Recordstringstringnumber;
};
