// doc-compress 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const docCompressContent = {
  meta: {
    title: "서류 이미지 압축기 (정부24 제출용)",
    description: "정부기관 제출용 이미지를 목표 용량・해상도에 맞춰 브라우저에서 바로 압축하세요.",
  },
  heroTitle: "서류 이미지 압축기",
  heroSubtitle: "정부24, 회사 제출용 서류 이미지를 원하는 용량과 해상도에 맞게 압축해요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "정부24나 각종 민원 사이트는 첨부파일 용량 제한(예: 1MB, 200KB)이 있는 경우가 많습니다. 스마트폰으로 찍은 사진은 보통 수 MB에 달해 바로 업로드하면 거절되기 쉬워요.",
      "목표 용량을 정하면 화질을 자동으로 낮춰가며 그 용량 이하로 맞춰줍니다. 최대 가로/세로 픽셀을 함께 지정하면 해상도도 같이 줄일 수 있어요.",
    ],
  },
  rules: {
    title: "처리 방식",
    rows: [
      { label: "처리 위치", value: "브라우저 내 Canvas API, 서버 업로드 없음" },
      { label: "압축 방식", value: "JPEG 품질을 0.92부터 0.4까지 단계적으로 낮추며 목표 용량 이하가 될 때까지 반복" },
      { label: "해상도 조정", value: "지정한 최대 가로/세로 비율에 맞춰 원본 비율 유지한 채 축소" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "목표 용량을 아주 작게 잡으면 어떻게 되나요?",
        answer: "화질을 최대한 낮춰 목표 용량에 가깝게 맞추지만, 너무 작은 용량(예: 20KB)을 지정하면 화질이 많이 흐려질 수 있습니다. 100~500KB 정도를 권장합니다.",
      },
      {
        question: "PNG 파일도 압축할 수 있나요?",
        answer: "원본이 PNG여도 압축 결과는 JPEG로 저장됩니다. 투명 배경이 필요 없는 서류・사진이라면 문제없이 사용할 수 있습니다.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "receipt-pdf", name: "영수증 PDF 취합기", description: "영수증 이미지 여러 장을 A4 PDF 한 장으로 자동 취합" },
      { slug: "qr-code", name: "QR코드 생성기", description: "URL・텍스트・와이파이 정보를 QR코드로 즉시 생성" },
      { slug: "unit-converter", name: "단위 변환기", description: "평수↔㎡, 무게, 길이 단위 서로 변환" },
    ],
  },
};
