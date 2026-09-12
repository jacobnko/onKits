"use client";

// 인스타그램 캡션 줄바꿈 유지 변환과 유니코드 특수 폰트 변환을 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import { preserveLineBreaks, convertFontStyle, FONT_STYLES, type FontStyle } from "@/lib/calculations/insta-formatter";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "lineBreak" | "font";

const STYLE_LABEL: Record<FontStyle, string> = {
  bold: "굵게",
  italic: "기울임",
  monospace: "타자기체",
  fullwidth: "전각",
};

export function InstaFormatterWidget() {
  const [tab, setTab] = useState<Tab>("lineBreak");

  const [inputText, setInputText] = useState("첫 줄이에요\n\n한 줄 띄고 이어서 씁니다\n\n#인스타그램 #캡션");
  const lineBreakResult = useMemo(() => preserveLineBreaks(inputText), [inputText]);

  const [fontInput, setFontInput] = useState("Onkits");
  const [style, setStyle] = useState<FontStyle>("bold");
  const fontResult = useMemo(() => convertFontStyle(fontInput, style), [fontInput, style]);

  async function copyText(text: string) {
    await navigator.clipboard?.writeText(text);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("lineBreak")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "lineBreak" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          줄바꿈 유지
        </button>
        <button
          type="button"
          onClick={() => setTab("font")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "font" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          특수 폰트 변환
        </button>
      </div>

      {tab === "lineBreak" ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">원본 캡션</span>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="rounded-xl bg-secondary/40 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">변환 결과 (빈 줄에 폭 없는 문자 삽입됨)</p>
            <pre className="whitespace-pre-wrap break-words font-sans text-sm text-foreground">{lineBreakResult}</pre>
          </div>

          <button
            type="button"
            onClick={() => copyText(lineBreakResult)}
            className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            결과 복사하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">변환할 텍스트 (영문/숫자만 적용)</span>
            <input
              type="text"
              value={fontInput}
              onChange={(e) => setFontInput(e.target.value)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="flex flex-wrap gap-2 text-sm">
            {FONT_STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`rounded-full border px-3 py-1 ${
                  style === s ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {STYLE_LABEL[s]}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-secondary/40 p-4 text-center text-xl text-foreground">
            {fontResult || <span className="text-sm text-muted-foreground">텍스트를 입력해보세요</span>}
          </div>

          <button
            type="button"
            onClick={() => copyText(fontResult)}
            className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            결과 복사하기
          </button>
        </div>
      )}

      <div className="mt-5">
        <ResultActions
          storageKey="insta-formatter"
          summary={tab === "lineBreak" ? "줄바꿈 유지 변환 사용" : `특수 폰트(${STYLE_LABEL[style]}) 변환: ${fontResult}`}
        />
      </div>
    </div>
  );
}
