export function getStringFromQuery(value: any): string | undefined {
  return typeof value === 'string' ? (value.trim() || undefined) : undefined;
}