"use client";

// 계산 결과를 서버 전송 없이 브라우저 localStorage에만 저장하는 기록 훅
// useSyncExternalStore로 읽어야 SSR(빈 목록)과 클라이언트(저장된 값) 간 하이드레이션 불일치가 생기지 않는다.
import { useCallback, useSyncExternalStore } from "react";

export type ResultHistoryEntry = {
  id: string;
  savedAt: number;
  summary: string;
};

const MAX_ITEMS = 5;
const EMPTY: ResultHistoryEntry[] = [];
const cache = new Map<string, ResultHistoryEntry[]>();
const listeners = new Set<() => void>();

function readFromStorage(key: string): ResultHistoryEntry[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // 프라이빗 모드 등 localStorage 접근이 막힌 환경은 빈 목록으로 처리
    return [];
  }
}

function getSnapshot(key: string): ResultHistoryEntry[] {
  if (!cache.has(key)) {
    cache.set(key, readFromStorage(key));
  }
  return cache.get(key)!;
}

function setSnapshot(key: string, items: ResultHistoryEntry[]) {
  cache.set(key, items);
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // 저장 용량 초과 등은 무시 (기록 기능은 부가 기능일 뿐)
  }
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useResultHistory(storageKey: string) {
  const key = `onkits:history:${storageKey}`;

  const items = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => EMPTY
  );

  const addItem = useCallback(
    (summary: string) => {
      const entry: ResultHistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        savedAt: Date.now(),
        summary,
      };
      setSnapshot(key, [entry, ...getSnapshot(key)].slice(0, MAX_ITEMS));
    },
    [key]
  );

  const removeItem = useCallback(
    (id: string) => setSnapshot(key, getSnapshot(key).filter((item) => item.id !== id)),
    [key]
  );

  const clear = useCallback(() => setSnapshot(key, []), [key]);

  return { items, addItem, removeItem, clear };
}
