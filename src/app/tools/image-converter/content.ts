// image-converter 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const imageConverterContent = {
  meta: {
    title: "이미지 포맷 변환기 (JPG・PNG・WebP)",
    description: "JPG, PNG, WebP 이미지를 서로 변환하고 크기도 함께 조절하세요.",
  },
  heroTitle: "이미지 포맷 변환기",
  heroSubtitle: "JPG・PNG・WebP를 서로 변환하고, 필요하면 가로・세로 크기도 함께 줄여요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "웹사이트에 올릴 이미지는 WebP로 변환하면 화질은 비슷하게 유지하면서 용량을 크게 줄일 수 있습니다. 반대로 일부 프로그램은 여전히 JPG나 PNG만 지원하기도 해요.",
      "투명 배경이 필요한 이미지는 PNG로, 필요 없는 사진은 JPG나 WebP로 변환하면 용량을 아낄 수 있습니다. PNG로 변환하면 투명도가 유지되고, JPG로 변환하면 투명 영역이 흰색으로 채워집니다.",
    ],
  },
  rules: {
    title: "처리 방식",
    rows: [
      { label: "지원 포맷", value: "JPG, PNG, WebP 간 상호 변환" },
      { label: "처리 위치", value: "브라우저 내 Canvas API, 서버 업로드 없음" },
      { label: "크기 조절", value: "최대 가로/세로 픽셀을 지정하면 비율을 유지한 채 축소 (선택 사항)" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "PNG를 JPG로 바꿨더니 배경이 흰색이 됐어요.",
        answer: "JPG는 투명도를 지원하지 않는 포맷이라, 투명했던 영역이 자동으로 흰색 배경으로 채워집니다. 투명도를 유지하려면 PNG나 WebP로 변환하세요.",
      },
      {
        question: "WebP는 모든 곳에서 열리나요?",
        answer: "대부분의 최신 브라우저와 프로그램에서 지원하지만, 오래된 프로그램이나 일부 인쇄・편집 도구는 아직 WebP를 지원하지 않을 수 있습니다. 호환성이 걱정되면 JPG나 PNG를 사용하세요.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "doc-compress", name: "서류 이미지 압축기", description: "정부24 등 제출용 이미지를 목표 용량・해상도로 압축" },
      { slug: "resume-photo", name: "이력서 사진 크롭", description: "3×4, 3.5×4.5 규격 크롭 & 단색 배경 변환" },
      { slug: "pdf-merge", name: "PDF 병합기", description: "여러 PDF 파일을 원하는 순서로 하나로 합치기" },
    ],
  },
};
