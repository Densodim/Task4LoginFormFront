import { useState } from "react";
import type { UsersApiType } from "../types/zodTypes";

type SortField = "created_at" | "username" | "email" | "blocked" | "last_login";
type SortDirection = "asc" | "desc";

export const useSorting = () => {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortUsers = (users: UsersApiType[]) => {
    return [...users].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "created_at":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "username":
          comparison = a.username.localeCompare(b.username);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "blocked":
          comparison = a.blocked - b.blocked;
          break;
        case "last_login":
          comparison =
            new Date(a.last_login).getTime() - new Date(b.last_login).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  return {
    sortField,
    sortDirection,
    toggleSort,
    sortUsers,
  };
};
