export const isNullOrEmpty = (value: string | undefined): boolean => {
  return value == null || false || value.trim() == '';
}
