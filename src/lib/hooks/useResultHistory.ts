"use client";

// 계산 결과를 서버 전송 없이 브라우저 localStorage에만 저장하는 기록 훅
import { useCallback, useState } from "react";

export type ResultHistoryEntry = {
  id: string;
  savedAt: number;
  summary: string;
};

const MAX_ITEMS = 5;

function readHistory(key: string): ResultHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // 프라이빗 모드 등 localStorage 접근이 막힌 환경은 빈 목록으로 처리
    return [];
  }
}

export function useResultHistory(storageKey: string) {
  const key = `onkits:history:${storageKey}`;
  const [items, setItems] = useState<ResultHistoryEntry[]>(() => readHistory(key));

  const persist = useCallback(
    (next: ResultHistoryEntry[]) => {
      setItems(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // 저장 용량 초과 등은 무시 (기록 기능은 부가 기능일 뿐)
      }
    },
    [key]
  );

  const addItem = useCallback(
    (summary: string) => {
      const entry: ResultHistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        savedAt: Date.now(),
        summary,
      };
      persist([entry, ...items].slice(0, MAX_ITEMS));
    },
    [items, persist]
  );

  const removeItem = useCallback((id: string) => persist(items.filter((item) => item.id !== id)), [items, persist]);
  const clear = useCallback(() => persist([]), [persist]);

  return { items, addItem, removeItem, clear };
}
