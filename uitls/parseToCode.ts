export function parseToCode(url: string): string {
  if (url.includes("http") && url.includes("://")) {
    let path = new URL(url).pathname;
    while (path.endsWith('/') || path.endsWith('?')) {
      path = path.slice(0, -1);
    }
    const parts = path.split("/");
    return parts[parts.length - 1].substring(parts[parts.length - 1].length - 5);
  }
  let path = url;
  while (path.endsWith('/') || path.endsWith('?')) {
    path = path.slice(0, -1);
  }
  const parts = path.split("/");
  return parts[parts.length - 1].substring(parts[parts.length - 1].length - 5);
}
