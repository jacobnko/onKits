// unit-converter 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const unitConverterContent = {
  meta: {
    title: "단위 변환기 (평/㎡, kg/lb, cm/inch)",
    description: "평↔제곱미터, 킬로그램↔파운드, 센티미터↔인치를 즉시 변환하세요.",
  },
  heroTitle: "단위 변환기",
  heroSubtitle: "부동산 평수, 몸무게, 키 등 일상에서 자주 쓰는 단위를 바로 변환합니다.",
  tip: "아파트 매물 정보의 전용면적(㎡)을 평으로 감 잡고 싶을 때 '넓이' 탭을 가장 많이 써요. 84㎡는 흔히 말하는 국민평형 34평대입니다.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "부동산 매물은 법적으로 제곱미터(㎡) 표기가 원칙이지만, 실생활에서는 여전히 '평'이 익숙합니다. 넓이 탭에서 평↔㎡를 바로 확인할 수 있어요.",
      "해외 직구나 여행, 운동 기록을 볼 때 kg↔lb, cm↔inch 변환이 자주 필요합니다. 무게・길이 탭에서 바로 확인하세요.",
    ],
  },
  rules: {
    title: "변환 기준",
    rows: [
      { label: "평 → ㎡", value: "1평 = 3.305785㎡" },
      { label: "kg → lb", value: "1kg = 2.204623lb" },
      { label: "cm → inch", value: "1cm = 0.393701inch" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "국민평형이 왜 84㎡인가요?",
        answer: "전용면적 84㎡가 옛 평수 기준으로 약 25.4평이고, 공용면적을 더한 공급면적 기준으로 34평형대에 해당해 흔히 '국민평형'이라 부릅니다.",
      },
      {
        question: "변환 결과가 소수점까지 정확한가요?",
        answer: "소수점 둘째 자리까지 반올림해 보여줍니다. 계약이나 공식 서류에는 반드시 원 단위 정확한 환산표를 함께 확인하세요.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "qr-code", name: "QR코드 생성기", description: "URL・텍스트・와이파이 정보를 QR코드로 즉시 생성" },
      { slug: "password-generator", name: "비밀번호 생성기", description: "원하는 조건의 안전한 랜덤 비밀번호 생성" },
      { slug: "real-estate-fee", name: "부동산 중개수수료 계산기", description: "복비 상한 요율 & 취득세 간편 계산" },
    ],
  },
};
