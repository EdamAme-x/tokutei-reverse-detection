export async function handler(req: Request) {
  const code = atob(new URL(req.url).searchParams.get("c") ?? "Error");

  const response = await fetch(
    `https://api.activetk.jp/urlmin/get?code=${code}`,
  );
  const data: Record<string, string | number | Record<string, string>> =
    await response.json();

  if (data.status === "Error") {
    return new Response(
      JSON.stringify({
        result: "BAD",
      }),
      { status: 400 },
    );
  }

  const parseContext = (
    data: Record<string, string | number | Record<string, string>>,
  ) => {
    return {
      target: data.LinkURL,
      code: code,
      creator: {
        ip: (data.CreatorInfo as Record<string, string>).IPAddress,
        location: (data.CreatorInfo as Record<string, string>).Location,
        country: (data.CreatorInfo as Record<string, string>).TimeZone,
      },
      created_at: data.CreatedDateTimeAsUnixTime,
      uses_count: data.UsedCount,
    };
  };

  const geo = await fetch("https://www.activetk.jp/tools/whois", {
    "headers": {
      "accept": "*/*",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary5j3yGfB7uoDK4qPt",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="' + Math.floor(Math.random() * 130) + '", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    "referrer": "https://www.activetk.jp/tools/whois",
    "referrerPolicy": "same-origin",
    "body":
      '------WebKitFormBoundary5j3yGfB7uoDK4qPt\r\nContent-Disposition: form-data; name="iana"\r\n\r\n' + (data.CreatorInfo as Record<string, string>).HostName + '\r\n------WebKitFormBoundary5j3yGfB7uoDK4qPt--\r\n',
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
  });

  return new Response(JSON.stringify({
    result: "OK",
    ...parseContext(data),
    whois: await geo.text(),
  }));
}
