import { parseToCode } from "../uitls/parseToCode.ts";
export async function handler(req: Request): Promise<Response> {
  return new Response(
    `<script is:server="${
      Math.random().toString(36).substring(3, 7)
    }">window.location.href = "/?code=" + "${
      parseToCode(new URL(req.url).pathname)
    }";</script>`,
    {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    },
  );
}
