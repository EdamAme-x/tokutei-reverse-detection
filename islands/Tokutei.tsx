import { useSignal } from "https://esm.sh/*@preact/signals@1.1.3";
import { TokuteiResult } from "../routes/api/r.ts";
import { Map } from "./Map.tsx";
import { parseToCode } from "../uitls/parseToCode.ts";

const Toast = {
  success: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    console.log(message);
  }
}

const getDefault = () => {
  try {
    new URL(window.location.href);
    return !(new URL(window.location.href).searchParams.get("code"))
      ? "https://rinu.jp/abcde"
      : `https://rinu.jp/${
        new URL(window.location.href).searchParams.get(
          "code",
        )
      }`;
  } catch (e) {
    return `https://rinu.cf/abcde`;
  }
};

export function TOKUTEI() {
  const url = useSignal(getDefault());
  const result = useSignal<TokuteiResult>({
    result: "PENDING",
  });
  const lastGet = useSignal<number>(Date.now());

  const getResult = async () => {
    if (Date.now() - lastGet.value < 1000) {
      Toast.error("短時間に実行しすぎです。餅ついてください。");
    }

    Toast.success("逆探知中...");

    const response = await fetch(
      `/api/r?c=${btoa(parseToCode(url.value))}`,
    );
    const data = await response.json();

    result.value = data;
    lastGet.value = Date.now();

    if (data.result === "OK") {
      Toast.success("逆探知成功");
    }
  };

  function getDate(date: number) {
    return new Date(date * 1000).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      timeZone: result.value.creator.country,
    });
  }

  console.log(result.value);

  return (
    <>
      <div class="w-full h-full grid place-items-center bg-gray-900 text-white">
        <input
          type="text"
          value={url.value}
          onInput={(e) => url.value = e.currentTarget.value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getResult();
            }
          }}
          class="w-full px-2 py-1 text-white font-bold border-gray-500 border-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        />
        <button
          onClick={() => {
            getResult();
          }}
          class="mt-4 w-full text-center text-white font-bold px-2 py-1 border-gray-500 border-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Go
        </button>
        {result.value.result === "BAD" && (
          <>
            <h2>Result: {result.value.result}</h2>
            <h3>URLの形式が正しくないか存在していません。</h3>
          </>
        )}
        {result.value.result === "OK" && (
          <>
            <h2>Result: {result.value.result}</h2>
            <h4>TargetURL: {" "}
              <input class="text-white bg-gray-700 border-gray-500 border-2 rounded" type="text" value={(result.value.target.includes("tokutei.cf") ? new URL(result.value.target).searchParams.get("url") : result.value.target) ?? result.value.target} />
            </h4>
            <abbr title={result.value.creator.ip}>
              IP: {result.value.creator.ip}
            </abbr>
            <h4>作成日時: {getDate(result.value.created_at)}</h4>
            <h4>使用回数: {result.value.uses_count}</h4>
            <h4>国名: {result.value.creator.country}</h4>
            <h4>地域: {result.value.creator.location}</h4>
            <Map geo={result.value.geo} />
          </>
        )}
      </div>
    </>
  );
}
