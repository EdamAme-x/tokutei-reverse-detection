import { useSignal } from "https://esm.sh/*@preact/signals@1.1.3"
import { TokuteiResult } from "../routes/api/r.ts";
import { Map } from "./Map.tsx"
import { parseToCode } from '../uitls/parseToCode.ts';

export function TOKUTEI() {
    const url = useSignal("https://rinu.cf/abcde");
    const result = useSignal<TokuteiResult>({
        result: "PENDING",
    });

    const getResult = async () => {
        const response = await fetch(
            `/api/r?c=${btoa(parseToCode(url.value))}`,
        );
        const data = await response.json();

        result.value = data;
    }

    return <>
        <div class="w-full h-full grid place-items-center">
            <input
                type="text"
                value={url.value}
                onInput={(e) => url.value = e.currentTarget.value}
                class="w-full px-2 py-1 text-black font-bold border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
            />
            <button
                onClick={() => {
                    getResult()
                }}
                class="mt-4 w-full text-center text-black font-bold px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
            >Go</button>
            {
                result.value.result === "BAD" && <>
                    <h2>Result: {result.value.result}</h2>
                    <h3>URLの形式が正しくないか存在していません。</h3>
                </>
            }
            {
                result.value.result === "GOOD" && <>
                    <h2>Result: {result.value.result}</h2>
                    <h4>URL: {url.value}</h4>
                    <abbr title={result.value.creator.ip}>IP: {result.value.creator.ip}</abbr>
                    <h4>作成日時: {result.value.created_at}</h4>
                    <h4>使用回数: {result.value.uses_count}</h4>
                    <h4>国名: {result.value.creator.country}</h4>
                    <h4>地域: {result.value.creator.location}</h4>
                    <Map geo={result.value.geo} />
                </>
            }
        </div>
    </>
}