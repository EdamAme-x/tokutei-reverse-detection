export function parseToCode(url: string): string {
  const recursiveParse = (path: string): string => {
    const splitPath = path.split("/");
    if (splitPath.pop() === "/") {
      return recursiveParse(splitPath.join("/"));
    } else {
      return splitPath[splitPath.length - 1];
    }
  }

  if (url.includes("http") && url.includes("://")) {
    const path = new URL(url).pathname;
    return recursiveParse(path);
  }
  return recursiveParse(url);
}

