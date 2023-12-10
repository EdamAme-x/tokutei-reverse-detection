export function Map({ ip }: {
  ip: string;
}) {
  return (
    <iframe
      id="iframeMap"
      src="https://maps.google.co.jp/maps?output=embed&amp;t=m&amp;z=10&amp;q=35.5381,139.4479"
      frameBorder="0"
      scrolling="no"
    >
    </iframe>
  );
}
