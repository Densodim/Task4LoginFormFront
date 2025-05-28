import type { ReactNode } from "react";
import { useAuthCheck } from "../hooks/useAuthCheck";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useAuthCheck();
  return <>{children}</>;
};
