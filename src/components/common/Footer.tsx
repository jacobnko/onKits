// 저작권 표기, 크리에이터 크레딧, 정책 링크를 담은 공통 푸터
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} OnKits. All rights reserved. — Engineered by JacobKo</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="transition-colors hover:text-primary">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary">
            이용약관
          </Link>
        </div>
      </div>
    </footer>
  );
}
