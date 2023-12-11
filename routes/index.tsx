import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { TOKUTEI } from "../islands/Tokutei.tsx";

export default function Home() {
  return (
    <>
      <div class="w-full h-screen bg-gray-900 text-white grid place-items-center">
        <h1 class="text-4xl font-bold">TOKUTEI V2 URL 逆探知</h1>
        <div>
          <TOKUTEI />
        </div>
        <p>
          Powerd by <a href="https://twitter.com/amex2189">@amex2189</a>
        </p>
      </div>
    </>
  );
}
