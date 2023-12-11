import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { TOKUTEI } from "../islands/Tokutei.tsx";

export default function Home() {
  return (
    <>
      <div class="w-full h-screen bg-gray-900 text-white grid place-items-center">
        <h1 class="text-3xl font-bold">TOKUTEI V2 URL 逆探知</h1>
        <div>
          <TOKUTEI />
        </div>
        <p>
          Powered by{" "}
          <a
            target={"_blank"}
            formTarget={"_blank"}
            href="https://twitter.com/amex2189"
            class={"mr-1"}
          >
            @amex2189
          </a>
          | 
          <a class={"ml-1"} href="/use">使用方法</a>
        </p>
      </div>
    </>
  );
}
