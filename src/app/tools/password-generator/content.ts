// password-generator 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const passwordGeneratorContent = {
  meta: {
    title: "비밀번호 생성기",
    description: "길이와 문자 종류를 선택해 안전한 랜덤 비밀번호를 브라우저에서 바로 생성하세요.",
  },
  heroTitle: "비밀번호 생성기",
  heroSubtitle: "원하는 길이와 문자 종류를 고르면 안전한 랜덤 비밀번호를 바로 만들어드려요.",
  tip: "가능하면 12자 이상, 대문자・소문자・숫자・특수문자를 모두 섞어 쓰세요. 사이트마다 다른 비밀번호를 쓰는 것도 중요합니다.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "비밀번호는 브라우저의 암호학적 난수 생성 기능(crypto.getRandomValues)으로 만들어지며, 어떤 서버로도 전송되지 않습니다. 생성 즉시 복사해서 비밀번호 관리자에 저장하는 것을 추천해요.",
      "혼동하기 쉬운 문자(대문자 I・O, 소문자 l, 숫자 0・1)는 기본적으로 제외해 손으로 옮겨 적을 때 실수를 줄였습니다.",
    ],
  },
  rules: {
    title: "생성 기준",
    rows: [
      { label: "길이", value: "8자~32자 (기본 16자)" },
      { label: "문자 구성", value: "대문자, 소문자, 숫자, 특수문자 중 선택" },
      { label: "제외 문자", value: "l, I, O, 0, 1 등 혼동하기 쉬운 문자" },
      { label: "생성 방식", value: "Web Crypto API (crypto.getRandomValues) 기반 난수" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "생성된 비밀번호가 어딘가에 저장되나요?",
        answer: "아니요. 비밀번호는 브라우저에서만 생성되며 OnKits 서버로 전송되거나 저장되지 않습니다. 페이지를 닫으면 사라집니다.",
      },
      {
        question: "어느 정도 강도의 비밀번호가 안전한가요?",
        answer: "일반적으로 12자 이상에 문자 종류를 3가지 이상 섞으면 무차별 대입 공격에 충분히 강한 편입니다. 중요한 계정은 16자 이상을 권장합니다.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "qr-code", name: "QR코드 생성기", description: "URL・텍스트・와이파이 정보를 QR코드로 즉시 생성" },
      { slug: "unit-converter", name: "단위 변환기", description: "평수↔㎡, 무게, 길이 단위 서로 변환" },
      { slug: "age-calculator", name: "만나이 계산기", description: "생년월일로 만 나이 & 연 나이 자동 계산" },
    ],
  },
};
