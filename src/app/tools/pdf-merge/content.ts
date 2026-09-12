// pdf-merge 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const pdfMergeContent = {
  meta: {
    title: "PDF 병합기",
    description: "여러 개의 PDF 파일을 원하는 순서로 하나의 PDF로 합치세요.",
  },
  heroTitle: "PDF 병합기",
  heroSubtitle: "제출용 서류가 PDF로 여러 개 나뉘어 있을 때, 순서를 정해 하나로 합쳐드려요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "이력서와 포트폴리오, 계약서와 첨부 서류처럼 PDF 여러 개를 한 번에 제출해야 할 때 유용합니다. 파일을 추가한 뒤 화살표 버튼으로 순서를 조정하고 병합하면 됩니다.",
      "모든 처리는 브라우저 안에서 이루어지며, 업로드한 PDF 내용은 서버로 전송되지 않습니다. 개인정보가 담긴 문서도 안심하고 사용할 수 있어요.",
    ],
  },
  rules: {
    title: "처리 방식",
    rows: [
      { label: "처리 위치", value: "브라우저 내 pdf-lib 라이브러리로 처리, 서버 업로드 없음" },
      { label: "병합 순서", value: "목록에 추가한 순서대로, ↑↓ 버튼으로 자유롭게 변경 가능" },
      { label: "제한 사항", value: "암호로 보호된 PDF는 병합할 수 없음" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "파일 순서를 잘못 넣었어요.",
        answer: "각 파일 옆의 ↑↓ 버튼으로 순서를 자유롭게 바꿀 수 있습니다. 병합 전에 미리 페이지 수를 확인해보세요.",
      },
      {
        question: "암호가 걸린 PDF도 합칠 수 있나요?",
        answer: "아니요. 암호로 보호된 PDF는 읽을 수 없어 병합에 실패합니다. 먼저 암호를 해제한 뒤 다시 시도해주세요.",
      },
      {
        question: "용량이 큰 PDF도 처리할 수 있나요?",
        answer: "브라우저 메모리 안에서 처리되기 때문에 파일이 너무 크거나 개수가 많으면 기기 성능에 따라 느려지거나 실패할 수 있습니다.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "receipt-pdf", name: "영수증 PDF 취합기", description: "영수증 이미지 여러 장을 A4 PDF 한 장으로 자동 취합" },
      { slug: "doc-compress", name: "서류 이미지 압축기", description: "정부24 등 제출용 이미지를 목표 용량・해상도로 압축" },
      { slug: "resume-photo", name: "이력서 사진 크롭", description: "3×4, 3.5×4.5 규격 크롭 & 단색 배경 변환" },
    ],
  },
};
