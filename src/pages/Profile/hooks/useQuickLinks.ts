import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import type { QuickLink } from "../types";

export function useQuickLinks(): QuickLink[] {
  const navigate = useNavigate();

  return useMemo(
    () => [
      {
        title: "Browse Products",
        description: "Explore our full collection of authentic Sri Lankan products",
        onClick: () => navigate(createPageUrl("Products")),
      },
      {
        title: "View Cart",
        description: "Check your shopping cart and proceed to checkout",
        onClick: () => navigate(createPageUrl("Cart")),
      },
    ],
    [navigate]
  );
}
