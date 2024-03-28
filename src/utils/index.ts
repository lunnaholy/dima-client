export function getNormalizedDate(date: string): string {
  return new Date(date).toLocaleString().replace(/\//g, ".").slice(0, -3)
}