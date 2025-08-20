export const getInitials = (name: string): string => {
  if (!name) return "";

  const nameParts = name.split(" ");
  const initials = nameParts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join("");

  return initials;
};
