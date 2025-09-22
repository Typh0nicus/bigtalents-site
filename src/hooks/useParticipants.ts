// src/hooks/useParticipants.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Tournament } from "@/data/tournaments";

const mem = new Map<string, number | null>();

export function useParticipants(t: Tournament) {
  // Prefer ID key; otherwise slug key
  const key =
    typeof t.matcherinoId === "number"
      ? `id:${t.matcherinoId}`
      : t.matcherinoSlug
      ? `slug:${t.matcherinoSlug}`
      : null;

  const [count, setCount] = useState<number | null | undefined>(undefined);

  // If static number already provided in data, surface it immediately.
  const staticProvided = typeof t.participants === "number" ? t.participants : null;

  useEffect(() => {
    if (!key) {
      setCount(staticProvided);
      return;
    }
    // If we already have it this session, use it.
    if (mem.has(key)) {
      setCount(mem.get(key) ?? null);
      return;
    }

    // Don’t try in plain `next dev` (function isn’t there). It’s fine to skip.
    const isLocalNext = typeof window !== "undefined" && location.port === "3000";
    if (isLocalNext) {
      setCount(staticProvided);
      return;
    }

    const controller = new AbortController();
    const url = new URL("/.netlify/functions/participants", location.origin);
    if (key.startsWith("id:")) url.searchParams.set("id", key.slice(3));
    if (key.startsWith("slug:")) url.searchParams.set("slug", key.slice(5));

    fetch(url.toString(), { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        const val = json?.results?.[key];
        if (typeof val === "number") {
          mem.set(key, val);
          setCount(val);
        } else {
          mem.set(key, null);
          setCount(staticProvided);
        }
      })
      .catch(() => setCount(staticProvided ?? null));

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Prefer the fetched value; otherwise staticProvided; undefined while loading.
  return useMemo(() => {
    if (typeof count === "number") return count;
    if (typeof staticProvided === "number") return staticProvided;
    return count ?? null; // null = known missing, undefined = loading
  }, [count, staticProvided]);
}
