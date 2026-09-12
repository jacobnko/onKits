"use client";

// 계산 결과 저장(브라우저 로컬 기록)・링크 복사・카카오톡 공유를 담당하는 공용 액션 바
import { useState } from "react";
import { useResultHistory } from "@/lib/hooks/useResultHistory";
import { shareToKakao } from "@/lib/kakao";

export function ResultActions({ storageKey, summary }: { storageKey: string; summary: string }) {
  const { items, addItem, removeItem, clear } = useResultHistory(storageKey);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [kakaoState, setKakaoState] = useState<"idle" | "notReady">("idle");

  function handleSave() {
    addItem(summary);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 1500);
  }

  async function handleCopy() {
    await navigator.clipboard?.writeText(`${summary}\n${window.location.href}`);
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 2000);
  }

  function handleKakaoShare() {
    const sent = shareToKakao(summary, window.location.href);
    if (!sent) {
      setKakaoState("notReady");
      setTimeout(() => setKakaoState("idle"), 2000);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {saveState === "saved" ? "저장됨 ✓" : "결과 저장"}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {copyState === "copied" ? "복사됨 ✓" : "복사하기"}
        </button>
        <button
          type="button"
          onClick={handleKakaoShare}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#FEE500] bg-[#FEE500] py-2.5 text-sm font-medium text-[#191919] transition-colors hover:brightness-95"
        >
          {kakaoState !== "notReady" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.87 5.37 4.68 6.78-.15.54-.96 3.34-.99 3.56 0 0-.02.16.09.22.1.06.23.02.23.02.31-.04 3.6-2.36 4.17-2.76.58.08 1.19.13 1.82.13 5.52 0 10-3.58 10-8s-4.48-8-10-8Z" />
            </svg>
          )}
          {kakaoState === "notReady" ? "설정 준비 중" : "카카오톡 공유"}
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
