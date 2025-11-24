export async function track(path: string) {
  try {
    const payload = { path, ref: document.referrer || null };
    // beacon when possible
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const url = "/api/track";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, blob);
    } else {
      await fetch(url, { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });
    }
  } catch {
  }
}
