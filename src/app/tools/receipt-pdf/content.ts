// receipt-pdf 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const receiptPdfContent = {
  meta: {
    title: "영수증 PDF 취합기",
    description: "여러 장의 영수증 사진을 A4 용지 PDF 한 장으로 자동 취합하세요.",
  },
  heroTitle: "영수증 PDF 취합기",
  heroSubtitle: "영수증 사진을 여러 장 올리면 A4 용지에 자동으로 배치해 PDF 한 장으로 만들어드려요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "경비 정산이나 세무 신고를 할 때 영수증 사진을 한 장씩 따로 제출하기보다, A4 용지에 모아 PDF 한 장으로 만들면 출력하거나 첨부하기 훨씬 편합니다.",
      "이미지는 A4 한 페이지에 최대 6장씩(2열 × 3행) 자동으로 배치되고, 6장이 넘으면 다음 페이지로 자연스럽게 이어집니다.",
    ],
  },
  rules: {
    title: "생성 방식",
    rows: [
      { label: "용지 규격", value: "A4 (210mm × 297mm)" },
      { label: "페이지당 배치", value: "2열 × 3행, 최대 6장" },
      { label: "이미지 처리", value: "브라우저 내에서만 처리, 서버 업로드 없음" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "업로드한 영수증 사진이 서버에 남나요?",
        answer: "아니요. 이미지는 브라우저 메모리에서만 처리되어 PDF로 합쳐지고, 어떤 서버에도 전송되거나 저장되지 않습니다.",
      },
      {
        question: "사진 순서를 바꿀 수 있나요?",
        answer: "현재는 업로드한 순서대로 배치됩니다. 순서를 바꾸고 싶다면 원하는 순서대로 하나씩 다시 업로드해주세요.",
      },
      {
        question: "세로/가로 사진이 섞여 있어도 괜찮나요?",
        answer: "네, 각 칸 안에서 원본 비율을 유지한 채 최대한 크게 배치되므로 세로/가로 사진이 섞여 있어도 자동으로 정렬됩니다.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "tax-calc", name: "원천징수/주휴수당 계산기", description: "프리랜서 3.3% 원천징수 & 알바 주휴수당" },
      { slug: "margin-vat", name: "마진/부가세 계산기", description: "스마트스토어 수수료 차감 순마진 & 부가세 역산" },
      { slug: "split-bill", name: "1/N 정산 계산기", description: "회식・모임 더치페이 & 차등 정산 계산" },
    ],
  },
};
