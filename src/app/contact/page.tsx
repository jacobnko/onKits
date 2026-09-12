// 문의 페이지 - 이메일 문의 안내 (별도 서버 폼 없이 mailto로 연결)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의 | OnKits",
  description: "OnKits에 대한 문의, 버그 제보, 제휴 제안을 이메일로 보내주세요.",
};

const CONTACT_EMAIL = "admin@jacobko.app";

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
      <section className="flex flex-col gap-3 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">문의하기</h1>
        <p className="text-muted-foreground">
          버그 제보, 새로운 도구 제안, 제휴 문의 모두 환영합니다. 아래 이메일로 편하게 남겨주세요.
        </p>
      </section>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">이메일로 문의하기</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="max-w-md text-xs text-muted-foreground">
          어떤 도구를 이용하다 문의하시는지, 사용하신 브라우저와 기기 정보를 함께 남겨주시면 더 빠르게 도와드릴
          수 있습니다.
        </p>
      </div>
    </div>
  );
}
