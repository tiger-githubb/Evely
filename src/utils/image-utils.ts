export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  return `${storageUrl}/${path}`;
};
