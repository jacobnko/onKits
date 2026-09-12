// 저작권 표기, 크리에이터 크레딧, 정책 링크를 담은 공통 푸터
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {tCommon("brand")}. {t("rights")} — {t("credit")}
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="transition-colors hover:text-primary">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary">
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
