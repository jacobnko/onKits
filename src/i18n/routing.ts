// 지원 로케일과 기본 라우팅 설정을 정의하는 next-intl 라우팅 구성
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
});

export type Locale = (typeof routing.locales)[number];
