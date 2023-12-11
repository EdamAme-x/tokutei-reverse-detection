const description = `
これは特定ツール v2 (tokutei.cf) の逆探知ツールです。
URLを入力場所に入れてGoを押してください。
また https://rinu.cf/abcde の rinu.cf の部分を rinu.deno.dev に変えるだけでもOKです。
urlを開くことで作成者の情報を確認できます。
機能要望やバグ報告は Twitter(@amex2189) まで
是非フォローお願いします！
`;

export default function Use() {
    return <div class="w-full h-screen grid place-items-center bg-gray-900 text-white">
        <h1 class="text-3xl font-bold">使用方法</h1>
        {
            description.split("\n").map((line) => (
                <p>{line}</p>
            ))
        }
    </div>
}