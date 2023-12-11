import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { TOKUTEI } from "../islands/Tokutei.tsx";

export default function Home() {

  return (
    <>
      <div class="w-full h-screen bg-gray-700 text-white grid place-items-center">
        <h1 class="text-4xl font-bold">TOKUTEI V2 URL 逆探知</h1>
        <div>
          <TOKUTEI />
        </div>
      </div>
    </>
  );
}
