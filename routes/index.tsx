import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";

export default function Home() {
  const url = useSignal("https://rinu.cf/abcde");

  return (
    <>
      <Head>
        <title>TOKUTEI V2 URL 逆探知</title>
      </Head>
      <div>
      </div>
    </>
  );
}
