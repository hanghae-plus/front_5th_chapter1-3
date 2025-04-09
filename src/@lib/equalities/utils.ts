export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);
