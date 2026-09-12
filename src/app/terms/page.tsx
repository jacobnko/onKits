// 이용약관 페이지 - 서비스 이용 조건과 계산 결과 면책조항을 안내
import type { Metadata } from "next";
import { LegalSection } from "@/components/common/LegalSection";

export const metadata: Metadata = {
  title: "이용약관 | OnKits",
  description: "OnKits 서비스 이용 조건과 계산 결과 면책조항 안내입니다.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">이용약관</h1>
        <p className="text-sm text-muted-foreground">시행일: 2026. 9. 12.</p>
      </div>

      <LegalSection title="제1조 (목적)">
        <p>
          이 약관은 OnKits(이하 &quot;서비스&quot;)가 제공하는 브라우저 기반 계산기·변환기 도구의 이용과
          관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 정함을 목적으로 합니다.
        </p>
      </LegalSection>

      <LegalSection title="제2조 (서비스의 내용)">
        <p>
          서비스는 회원가입 없이 누구나 무료로 이용할 수 있는 실무 계산기·변환기 도구를 제공합니다. 모든 계산은
          이용자의 브라우저에서 처리되며, 서비스는 별도의 서버 저장 없이 도구만을 제공합니다.
        </p>
      </LegalSection>

      <LegalSection title="제3조 (계산 결과 면책조항)">
        <p>
          서비스가 제공하는 모든 계산 결과(세금, 급여, 마진, 부가세 등)는 일반적인 공식과 법령을 참고하여 제공하는{" "}
          <strong className="font-semibold text-foreground">참고용 정보</strong>이며, 법적·세무적 효력을 갖지
          않습니다. 실제 세액, 급여, 정산 금액은 관련 법령 개정, 개별 상황(4대보험, 공제 항목, 사업장 규정 등)에
          따라 달라질 수 있습니다. 중요한 의사결정에는 반드시 세무사, 노무사 등 전문가와 상담하시기 바라며,
          서비스는 계산 결과를 신뢰하여 발생한 손해에 대해 책임을 지지 않습니다.
        </p>
      </LegalSection>

      <LegalSection title="제4조 (지적재산권)">
        <p>
          서비스에서 제공하는 디자인, 코드, 콘텐츠에 대한 저작권은 OnKits(JacobKo)에 귀속됩니다. 이용자는
          서비스를 개인적인 용도로 자유롭게 이용할 수 있으나, 사전 동의 없이 서비스의 소스나 콘텐츠를 복제·배포할
          수 없습니다.
        </p>
      </LegalSection>

      <LegalSection title="제5조 (이용자의 의무)">
        <ul className="list-disc pl-5">
          <li>서비스를 이용해 취득한 정보를 서비스 운영자 동의 없이 상업적으로 이용하는 행위</li>
          <li>서비스의 안정적 운영을 방해하는 자동화된 과도한 요청, 크롤링 등의 행위</li>
          <li>관계 법령 및 이 약관에서 금지하는 행위</li>
        </ul>
      </LegalSection>

      <LegalSection title="제6조 (책임의 제한)">
        <p>
          서비스는 무료로 제공되며, 천재지변, 불가항력, 또는 이용자의 귀책사유로 인해 발생한 손해에 대해 책임을
          지지 않습니다.
        </p>
      </LegalSection>

      <LegalSection title="제7조 (준거법 및 관할)">
        <p>이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 대한민국 법원을 관할 법원으로 합니다.</p>
      </LegalSection>
    </div>
  );
}
