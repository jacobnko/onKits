// 개인정보처리방침 페이지 - PIPA/GDPR 취지를 반영한 정적 법적 고지
import type { Metadata } from "next";
import { LegalSection } from "@/components/common/LegalSection";

export const metadata: Metadata = {
  title: "개인정보처리방침 | OnKits",
  description: "OnKits의 개인정보 수집·이용 및 쿠키 사용에 대한 안내입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">개인정보처리방침</h1>
        <p className="text-sm text-muted-foreground">시행일: 2026. 9. 12.</p>
      </div>

      <LegalSection title="1. 개인정보의 처리 원칙">
        <p>
          OnKits(이하 &quot;서비스&quot;)가 제공하는 계산기·변환기 도구는 모두 이용자의 브라우저에서만
          동작하며, 입력하신 계산 값(금액, 시급, 근무시간 등)은 서비스 서버로 전송되거나 저장되지 않습니다.
          &quot;결과 저장&quot; 기능은 이용자의 브라우저 로컬 저장소(localStorage)에만 기록되며, 이는 다른
          이용자나 운영자가 열람할 수 없고 브라우저 데이터를 삭제하면 함께 삭제됩니다.
        </p>
      </LegalSection>

      <LegalSection title="2. 수집하는 개인정보 항목 및 이용 목적">
        <p>서비스는 원칙적으로 개인정보를 수집하지 않습니다. 다만 다음의 경우 예외적으로 정보가 발생할 수 있습니다.</p>
        <ul className="list-disc pl-5">
          <li>문의하기 페이지를 통해 이용자가 직접 이메일을 보내는 경우: 회신을 위한 이메일 주소, 문의 내용</li>
          <li>
            Google AdSense 등 광고 서비스 이용 시 발생하는 쿠키 및 기기 식별 정보: 광고 게재 및 성과 측정 목적
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 쿠키(Cookie)의 운영 및 거부">
        <p>
          서비스는 Google AdSense를 통해 맞춤형 광고를 제공할 수 있으며, 이 과정에서 Google 및 제휴 네트워크가
          쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정에서 쿠키 저장을 거부하거나{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2"
          >
            Google 광고 설정
          </a>
          에서 맞춤형 광고를 비활성화할 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection title="4. 개인정보의 보유 및 이용 기간">
        <p>
          문의 이메일로 수집된 정보는 문의 응대 목적이 달성된 후 지체 없이 파기합니다. 서버에 별도로 저장하는
          개인정보 데이터베이스는 운영하지 않습니다.
        </p>
      </LegalSection>

      <LegalSection title="5. 이용자의 권리">
        <p>
          이용자는 언제든지 자신의 개인정보 처리 현황에 대해 문의하거나 정정·삭제를 요청할 수 있습니다. 아래
          연락처로 요청해 주시면 지체 없이 조치합니다.
        </p>
      </LegalSection>

      <LegalSection title="6. 개인정보 보호책임자 및 문의처">
        <p>이메일: admin@jacobko.app</p>
      </LegalSection>

      <LegalSection title="7. 고지의 의무">
        <p>본 방침은 법령·정책 변경에 따라 개정될 수 있으며, 변경 시 이 페이지를 통해 고지합니다.</p>
      </LegalSection>
    </div>
  );
}
