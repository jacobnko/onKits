// 브랜드 로고, 카테고리 내비게이션, 언어 선택기를 포함하는 공통 헤더
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            On
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {tCommon("brand")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            {t("home")}
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            {t("about")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            {t("contact")}
          </Link>
        </nav>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
