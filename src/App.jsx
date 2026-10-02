import { useState } from "react";

export default function BitCalculator() {
  const [bits, setBits] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const calculate = (e) => {
    e.preventDefault();
    const value = Number(bits);
    if (!value || value < 0) return;
    const minutes = (value / 100) * 5;
    setResult(minutes);
    setCopied(false);
  };

  const command = result !== null ? `/timer add ${result}m` : "";

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950/40 flex items-center justify-center p-4 text-white font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-purple-900/20">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-white"
              >
                <path d="M11.5 2C6.81 2 3 5.81 3 10.5c0 1.82.58 3.53 1.56 4.9L3 22l6.7-1.56c1.37.98 3.08 1.56 4.8 1.56 4.69 0 8.5-3.81 8.5-8.5S16.19 2 11.5 2zm0 15.5c-1.42 0-2.75-.4-3.88-1.1l-.28-.16-2.9.68.68-2.9-.16-.28A6.47 6.47 0 0 1 5 10.5C5 6.91 7.91 4 11.5 4S18 6.91 18 10.5 15.09 17.5 11.5 17.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 bg-clip-text text-transparent">
              Bits → Minutes
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Convert Twitch bits into timer minutes
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 border border-purple-500/30 p-4 text-center">
            <div className="text-lg font-semibold text-purple-200">
              100 Bits → 5 Minutes
            </div>
          </div>

          <form onSubmit={calculate} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Enter Bits
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={bits}
                onChange={(e) => setBits(e.target.value)}
                className="w-full rounded-2xl border-2 border-purple-400/40 bg-white/10 px-5 py-4 text-center text-white text-3xl placeholder-purple-300/50 outline-none focus:border-green-400 focus:bg-white/15 transition
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-purple-500/40 active:scale-[0.98]"
            >
              Calculate
            </button>
          </form>

          {result !== null && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-black/30 border border-white/10 p-4">
                <code className="text-xl font-mono text-emerald-300">
                  {command}
                </code>
                <button
                  onClick={copyCommand}
                  className={`shrink-0 rounded-xl px-2 py-2 text-xs font-semibold transition cursor-pointer border border-green-200 ${
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/25"
                  }`}
                >
                  {copied ? "✅ Copied!" : "📋Copy"}
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-700/60 bg-zinc-950/60 p-5 text-center">
                <div className="text-zinc-300">
                  100 Bits <span className="mx-2 text-zinc-500">→</span> 5 Min
                </div>
                <div className="my-3 text-2xl font-light text-purple-400">
                  ×
                </div>
                <div className="text-lg font-medium text-white">
                  {Number(bits).toLocaleString()} Bits{" "}
                  <span className="mx-2 text-zinc-500">→</span>{" "}
                  <span className="text-purple-300">{result} Min</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          100 bits = 5 minutes
        </p>
      </div>
    </div>
  );
}
