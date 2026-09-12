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
      className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l === "ko" ? "한국어" : "English"}
        </option>
      ))}
    </select>
  );
}
