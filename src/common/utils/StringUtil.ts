export function valueOrNullIfBlank(value: string | null | undefined): string | null {
  return !value ? null : value;
}
