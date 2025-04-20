export const isObj = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === "object" && obj !== null;
