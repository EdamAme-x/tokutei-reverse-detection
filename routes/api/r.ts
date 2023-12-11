// deno-lint-ignore-file
export type TokuteiResponse = {
  status: string;
  LinkURL: string;
  CreatorInfo: { IPAddress: string; Location: string; TimeZone: string };
  CreatedDateTimeAsUnixTime: string;
  UsedCount: number;
};
export type TokuteiParseContext = {
  target: string;
  code: string;
  creator: { ip: string; location: string; country: string };
  created_at: number;
  uses_count: number;
  geo: {
    latitude: string;
    longitude: string;
  };
};
export type TokuteiResult =
  | (({ result: "OK" } & TokuteiParseContext) | { result: "BAD" })
  | { result: "PENDING" };

export async function handler(req: Request): Promise<Response> {
  const code = atob(new URL(req.url).searchParams.get("c") ?? "Error");

  const response = await fetch(
    `https://api.activetk.jp/urlmin/get?code=${code}`,
  );
  const data: TokuteiResponse = await response.json();

  if (data.status === "Error") {
    return new Response(
      JSON.stringify({
        result: "BAD",
      }),
      { status: 400 },
    );
  }

  const parseContext = (
    data: TokuteiResponse,
  ) => {
    return {
      target: data.LinkURL,
      code: code,
      creator: {
        ip: data.CreatorInfo.IPAddress,
        location: data.CreatorInfo.Location,
        country: data.CreatorInfo.TimeZone,
      },
      created_at: parseInt(data.CreatedDateTimeAsUnixTime),
      uses_count: data.UsedCount,
    };
  };

  const geo = await fetch("https://www.ipaddress.com/ip-lookup", {
    "headers": {
      "accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    "referrer": "https://www.ipaddress.com/ip-lookup",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "host=" + data.CreatorInfo.IPAddress,
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
  });

  const html = await geo.text();
  const latitude = html.split("Latitude</th><td>")[1].split(" /")[0];
  const longitude = html.split("Longitude</th><td>")[1].split(" /")[0];

  return new Response(JSON.stringify({
    result: "OK",
    ...parseContext(data),
    geo: {
      latitude: latitude,
      longitude: longitude,
    },
  }));
}

// ACTIVETK Self-Destructive Edition
