"use client";

import { useEffect, useMemo, useState } from "react";

type ResultMap = Record<string, number | null>; // keys like "id:145019" or "slug:haneki-x-bigtalents"
const cache = new Map<string, number | null>();

// Turn a Matcherino URL into a cache key the function understands
export function keyFromMatcherino(url: string): string | null {
  if (!url) return null;
  const mSlug = url.match(/\/t\/([^/]+)/);          // e.g. /t/haneki-x-bigtalents
  if (mSlug?.[1]) return `slug:${mSlug[1]}`;
  const mId = url.match(/tournaments\/(\d+)/);      // e.g. /tournaments/145019
  if (mId?.[1]) return `id:${mId[1]}`;
  return null;
}

export function useParticipants(urls: string[]) {
  // dedupe & normalize keys
  const keys = useMemo(() => {
    const ks = urls.map(keyFromMatcherino).filter(Boolean) as string[];
    return Array.from(new Set(ks)); // unique
  }, [urls]);

  const [map, setMap] = useState<ResultMap>({});

  useEffect(() => {
    if (keys.length === 0) {
      setMap({});
      return;
    }

    // what do we still need to fetch?
    const need = keys.filter((k) => !cache.has(k));
    // if all cached, flush immediately
    if (need.length === 0) {
      const out: ResultMap = {};
      keys.forEach((k) => (out[k] = cache.get(k) ?? null));
      setMap(out);
      return;
    }

    const ids = need.filter((k) => k.startsWith("id:")).map((k) => k.slice(3));
    const slugs = need.filter((k) => k.startsWith("slug:")).map((k) => k.slice(5));

    const params = new URLSearchParams();
    if (ids.length) params.set("ids", ids.join(","));
    if (slugs.length) params.set("slugs", slugs.join(","));

    const ctrl = new AbortController();

    fetch(`/api/participants?${params.toString()}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: { results?: ResultMap }) => {
        const res = data?.results ?? {};
        Object.entries(res).forEach(([k, v]) => cache.set(k, v));
        const out: ResultMap = {};
        keys.forEach((k) => (out[k] = cache.get(k) ?? null));
        setMap(out);
      })
      .catch(() => {
        // best-effort: show whatever we have cached
        const out: ResultMap = {};
        keys.forEach((k) => (out[k] = cache.get(k) ?? null));
        setMap(out);
      });

    return () => ctrl.abort();
  }, [keys]);

  return map; // e.g. { "id:145019": 128, "slug:haneki-x-bigtalents": 64 }
}
