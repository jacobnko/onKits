"use client";

// 원하는 조건으로 안전한 랜덤 비밀번호를 생성하는 위젯 (전부 브라우저에서 처리)
import { useEffect, useState } from "react";
import { generatePassword, evaluateStrength, type PasswordOptions } from "@/lib/calculations/password-generator";

const STRENGTH_LABEL = {
  weak: { text: "약함", className: "text-rose-600" },
  medium: { text: "보통", className: "text-amber-600" },
  strong: { text: "강함", className: "text-emerald-600" },
} as const;

export function PasswordGeneratorWidget() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function regenerate(current = options) {
    setPassword(generatePassword(current));
  }

  useEffect(() => {
    // crypto 기반 난수 생성은 클라이언트에서만 가능해 최초 마운트 시 1회 생성한다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleOption(key: keyof Omit<PasswordOptions, "length">) {
    const next = { ...options, [key]: !options[key] };
    const anySelected = next.uppercase || next.lowercase || next.numbers || next.symbols;
    if (!anySelected) return;
    setOptions(next);
    regenerate(next);
  }

  function updateLength(length: number) {
    const next = { ...options, length };
    setOptions(next);
    regenerate(next);
  }

  async function handleCopy() {
    await navigator.clipboard?.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strength = evaluateStrength(options);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
          <code className="break-all font-mono text-lg text-foreground">{password}</code>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            강도:{" "}
            <span className={`font-semibold ${STRENGTH_LABEL[strength].className}`}>
              {STRENGTH_LABEL[strength].text}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">길이: {options.length}자</span>
          <input
            type="range"
            min={8}
            max={32}
            value={options.length}
            onChange={(e) => updateLength(Number(e.target.value))}
            className="accent-primary"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {(
            [
              { key: "uppercase", label: "대문자 (A-Z)" },
              { key: "lowercase", label: "소문자 (a-z)" },
              { key: "numbers", label: "숫자 (0-9)" },
              { key: "symbols", label: "특수문자 (!@#…)" },
            ] as const
          ).map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={options[item.key]}
                onChange={() => toggleOption(item.key)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-foreground">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => regenerate()}
          className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          새로 생성
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {copied ? "복사됨 ✓" : "복사하기"}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        생성된 비밀번호는 브라우저를 벗어나지 않으며 저장되지 않습니다. 혼동하기 쉬운 문자(l, I, O, 0, 1)는
        제외했습니다.
      </p>
    </div>
  );
}
