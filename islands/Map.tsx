export function Map({ geo }: {
  geo: {
    lotitude: string
    longitude: string
  };
}) {
  return (
    <iframe
      id="iframeMap"
      src={"https://maps.google.co.jp/maps?output=embed&amp;t=m&amp;z=10&amp;q=" + geo.lotitude + "," + geo.longitude}
      frameBorder="0"
      scrolling="no"
    >
    </iframe>
  );
}
