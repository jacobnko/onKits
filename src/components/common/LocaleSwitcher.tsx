"use client";

// 현재 경로를 유지한 채 ko/en 로케일을 전환하는 언어 선택기
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-600"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l === "ko" ? "한국어" : "English"}
        </option>
      ))}
    </select>
  );
}
