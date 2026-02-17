export const getInitials = ({ displayName }: { displayName: string }) =>
  displayName
    .split(" ")
    .map((n) => n[0])
    .splice(0, 2)
    .join("")
    .replace(/[^a-zA-Z\u00C0-\u024F ]/g, "");
