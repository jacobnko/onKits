// 소개 페이지 - OnKits 브랜드 스토리, 기술 철학, 크리에이터 프로필
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | OnKits",
  description: "OnKits의 브랜드 스토리와 기술 철학, 만든 사람을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">OnKits (온킷츠) 이야기</h1>
        <p className="leading-relaxed text-muted-foreground">
          &apos;온킷츠&apos;는 &apos;전부, 모두, 온전함&apos;을 뜻하는 순우리말 &apos;온(On)&apos;에서
          출발했습니다. 회원가입도, 설치도 없이 브라우저 하나만 열면 바로 쓸 수 있는 완성도 높은 실무 도구
          모음을 만들고 싶었어요. 세금 계산부터 사진 규격 변환, 텍스트 도구까지 — 매일 반복해서 찾아보는
          &apos;그 계산기, 그 변환기&apos;를 한곳에 모아두는 것이 OnKits의 목표입니다.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">기술 철학</h2>
        <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            OnKits의 모든 도구는 서버가 아닌 <strong className="font-semibold text-foreground">이용자의 브라우저</strong>
            에서 직접 계산됩니다. 입력하신 금액이나 개인 정보가 서버로 전송되지 않기 때문에, 별도 회원가입이나
            로그인 없이도 안심하고 사용할 수 있습니다.
          </p>
          <p>
            &quot;결과 저장&quot;이나 &quot;공유하기&quot; 같은 편의 기능도 브라우저 로컬 저장소나 운영체제의
            공유 시트를 활용할 뿐, 별도 서버 데이터베이스나 로그인 시스템을 두지 않습니다. 복잡함을 더하기보다,
            꼭 필요한 만큼만 가볍게 만드는 것이 OnKits가 지향하는 방식입니다.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">만든 사람</h2>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-semibold text-foreground">JacobKo</p>
          <p className="mt-1 text-sm text-muted-foreground">iOS & Full-Stack Developer</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            iOS 앱 개발과 풀스택 웹 개발을 함께 다루며, 실무에서 반복적으로 부딪히는 불편함을 작은 도구로 풀어내는
            것을 좋아합니다.
          </p>
          <a
            href="https://jacobko.app"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-2"
          >
            jacobko.app 방문하기
          </a>
        </div>
      </section>
    </div>
  );
}
