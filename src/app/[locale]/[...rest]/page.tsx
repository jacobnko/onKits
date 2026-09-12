// [locale] 하위의 매칭되지 않는 모든 경로를 브랜드 일관된 404로 연결하는 catch-all 라우트
import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();
}
