// Minimal types to make the URL import happy in TS
declare module "https://edge.netlify.com/blobs@0.4.1" {
  export function getStore(opts: { name: string }): {
    append(key: string, data: Uint8Array): Promise<void>;
    // add more methods as you start using them
  };
}
