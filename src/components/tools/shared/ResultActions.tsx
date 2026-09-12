"use client";

// 계산 결과 저장(브라우저 로컬 기록)과 공유(모바일 공유 시트/카카오톡 · 데스크톱 링크 복사)를 담당하는 공용 액션 바
import { useState } from "react";
import { useResultHistory } from "@/lib/hooks/useResultHistory";

export function ResultActions({ storageKey, summary }: { storageKey: string; summary: string }) {
  const { items, addItem, removeItem, clear } = useResultHistory(storageKey);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");

  function handleSave() {
    addItem(summary);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 1500);
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: document.title, text: summary, url: window.location.href });
        setShareState("shared");
      } catch {
        // 사용자가 공유 시트를 취소한 경우는 무시
      }
    } else {
      await navigator.clipboard?.writeText(`${summary}\n${window.location.href}`);
      setShareState("copied");
    }
    setTimeout(() => setShareState("idle"), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {saveState === "saved" ? "저장됨 ✓" : "결과 저장"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {shareState === "shared" ? "공유 완료" : shareState === "copied" ? "링크가 복사되었습니다" : "공유하기"}
        </button>
      </div>

      {items.length > 0 && (
        <div className="rounded-xl border border-border">
          <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
            <span>최근 계산 기록 (이 브라우저에만 저장돼요)</span>
            <button type="button" onClick={clear} className="hover:text-primary">
              전체 삭제
            </button>
          </div>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 px-4 py-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.savedAt).toLocaleString("ko-KR")}
                  </p>
                  <p className="whitespace-pre-line text-foreground">{item.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="shrink-0 text-xs text-muted-foreground hover:text-primary"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
