export function isNonNullObject(obj: unknown): boolean {
  return typeof obj === "object" && obj !== null;
}
