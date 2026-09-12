// 브랜드 로고, 카테고리 내비게이션, 언어 선택기를 포함하는 공통 헤더
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {tCommon("brand")}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          <Link href="/" className="hover:text-indigo-600">
            {t("home")}
          </Link>
          <Link href="/about" className="hover:text-indigo-600">
            {t("about")}
          </Link>
          <Link href="/contact" className="hover:text-indigo-600">
            {t("contact")}
          </Link>
        </nav>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
