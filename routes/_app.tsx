import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <head
        lang="ja"
        dir="ltr"
        prefix="og: http://ogp.me/ns# twitter: http://twitter.com/ web: http://ogp.me/ns/web#"
      >
        <title>TOKUTEI V2 URL 逆探知</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="TOKUTEI V2 URL 逆探知" />
        <meta name="og:title" content="TOKUTEI V2 URL 逆探知" />
        <meta name="og:description" content="TOKUTEI V2 URL 逆探知" />
        <meta name="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TOKUTEI V2 URL 逆探知" />
        <meta name="twitter:description" content="TOKUTEI V2 URL 逆探知" />
        <meta name="twitter:image" content="/logo.svg" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <Component />
    </>
  );
}
