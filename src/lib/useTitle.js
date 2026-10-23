import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — VINCE/` : "VINCE/ — Field Archive";
  }, [title]);
}
