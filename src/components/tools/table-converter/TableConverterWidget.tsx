"use client";

// 엑셀/스프레드시트에서 복사한 표를 마크다운/HTML 테이블로 변환하는 위젯
import { useMemo, useState } from "react";
import { parseTable, toMarkdownTable, toHtmlTable } from "@/lib/calculations/table-converter";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type OutputFormat = "markdown" | "html";

const SAMPLE = "이름\t직무\t경력\n김온킷\t프론트엔드\t3년\n이온킷\t백엔드\t5년";

export function TableConverterWidget() {
  const [raw, setRaw] = useState(SAMPLE);
  const [format, setFormat] = useState<OutputFormat>("markdown");

  const rows = useMemo(() => parseTable(raw), [raw]);
  const output = useMemo(() => (format === "markdown" ? toMarkdownTable(rows) : toHtmlTable(rows)), [rows, format]);

  async function copyOutput() {
    await navigator.clipboard?.writeText(output);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">엑셀/스프레드시트에서 표를 복사해 붙여넣으세요</span>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={5}
          className="rounded-xl border border-border px-4 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </label>

      <div className="mt-4 flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => setFormat("markdown")}
          className={`rounded-full border px-3 py-1 ${
            format === "markdown" ? "border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >
          마크다운
        </button>
        <button
          type="button"
          onClick={() => setFormat("html")}
          className={`rounded-full border px-3 py-1 ${
            format === "html" ? "border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >
          HTML
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl bg-secondary/40 p-4">
        <pre className="whitespace-pre text-sm text-foreground">{output || "표 데이터를 입력해보세요"}</pre>
      </div>

      <button
        type="button"
        onClick={copyOutput}
        className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        결과 복사하기
      </button>

      <div className="mt-3">
        <ResultActions storageKey="table-converter" summary={`${format === "markdown" ? "마크다운" : "HTML"} 표 변환 사용`} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        탭으로 구분된 데이터를 우선 인식하고, 탭이 없으면 쉼표(,)로 구분합니다. 엑셀에서 표를 드래그해 복사한 뒤
        그대로 붙여넣으면 자동으로 인식됩니다.
      </p>
    </div>
  );
}
