export function parseToCode(url: string): string {
  if (url.includes("http") && url.includes("://")) {
    const path = new URL(url).pathname;
    if (path.split("").pop() === "/") {
      return path.split("/")[path.split("/").length - 2];
    } else {
      return path.split("/")[path.split("/").length - 1];
    }
  }
  return url.split("/")[url.split("/").length - 1];
}
