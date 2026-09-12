"use client";

// 여러 PDF를 업로드해 순서를 조정한 뒤 하나의 PDF로 병합・다운로드하는 위젯
import { useState } from "react";
import { mergePdfs, getPageCount } from "@/lib/generators/pdf-merge";

type PdfItem = { id: string; file: File; pageCount: number | null };

export function PdfMergeWidget() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).filter((f) => f.type === "application/pdf");
    const newItems: PdfItem[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      pageCount: null,
    }));
    setItems((prev) => [...prev, ...newItems]);
    setError("");

    for (const item of newItems) {
      try {
        const pageCount = await getPageCount(item.file);
        setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, pageCount } : p)));
      } catch {
        setError(`${item.file.name} 파일을 읽을 수 없습니다. 손상되었거나 PDF가 아닐 수 있어요.`);
      }
    }
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleMerge() {
    if (items.length < 2) return;
    setIsMerging(true);
    setError("");
    try {
      const bytes = await mergePdfs(items.map((item) => item.file));
      const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "onkits-merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("PDF를 병합하지 못했습니다. 파일이 손상되었거나 암호로 보호되어 있을 수 있어요.");
    } finally {
      setIsMerging(false);
    }
  }

  const totalPages = items.reduce((sum, item) => sum + (item.pageCount ?? 0), 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary/40">
        <span className="font-medium text-foreground">PDF 파일을 선택하세요</span>
        <span className="text-sm text-muted-foreground">여러 개를 한 번에 선택할 수 있어요</span>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>

      {items.length > 0 && (
        <div className="mt-5 flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
              <span className="w-5 shrink-0 text-sm text-muted-foreground">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.pageCount === null ? "페이지 확인 중..." : `${item.pageCount}페이지`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="shrink-0 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground disabled:opacity-30"
                aria-label="위로 이동"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="shrink-0 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground disabled:opacity-30"
                aria-label="아래로 이동"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          총 {items.length}개 파일 · {totalPages}페이지로 병합됩니다
        </p>
      )}

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      {items.length >= 2 && (
        <button
          type="button"
          onClick={handleMerge}
          disabled={isMerging}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {isMerging ? "병합 중..." : "하나의 PDF로 병합 다운로드"}
        </button>
      )}
      {items.length === 1 && (
        <p className="mt-4 text-sm text-muted-foreground">병합하려면 PDF를 2개 이상 추가해주세요.</p>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        PDF는 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 암호로 보호된 PDF는 병합할 수 없어요.
      </p>
    </div>
  );
}
