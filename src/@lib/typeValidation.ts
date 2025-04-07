export function isNull(value: unknown): boolean {
  return value === null;
}

export function isPrimitive(value: unknown): boolean {
  return typeof value !== "object";
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return !isNull(value) && !isPrimitive(value) && typeof value === "object";
}
