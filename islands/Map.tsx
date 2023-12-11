export function Map({ geo }: {
  geo: {
    latitude: string;
    longitude: string;
  };
}) {
  return (
    <iframe
      id="iframeMap"
      src={"https://maps.google.co.jp/maps?output=embed&q=" +
        geo.latitude + "," + geo.longitude}
      frameBorder="0"
      scrolling="no"
      class={"mt-3"}
    >
    </iframe>
  );
}
