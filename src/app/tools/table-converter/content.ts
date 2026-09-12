// table-converter 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const tableConverterContent = {
  meta: {
    title: "표 변환기 (엑셀 → 마크다운/HTML)",
    description: "엑셀・스프레드시트에서 복사한 표를 마크다운 또는 HTML 테이블 코드로 즉시 변환하세요.",
  },
  heroTitle: "표 변환기",
  heroSubtitle: "엑셀에서 복사한 표를 붙여넣기만 하면 마크다운/HTML 테이블 코드를 만들어드려요.",
  tip: "엑셀이나 구글시트에서 표 영역을 드래그해 복사(Ctrl+C)한 뒤, 왼쪽 입력창에 그대로 붙여넣기(Ctrl+V)만 하면 자동으로 표 형태를 인식해요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "깃허브 README, 노션, 개발 문서 등에서는 마크다운 표 문법을 자주 사용합니다. 엑셀에서 만든 표를 마크다운으로 직접 옮기려면 파이프(|) 기호를 일일이 넣어야 해서 번거로운데, 이 도구가 자동으로 처리해줍니다.",
      "블로그나 이메일처럼 HTML을 직접 다뤄야 하는 곳에서는 HTML 탭을 선택하면 `<table>` 태그 코드를 바로 받을 수 있습니다.",
    ],
  },
  rules: {
    title: "변환 방식",
    rows: [
      { label: "구분자 인식", value: "탭(Tab) 우선 인식, 없으면 쉼표(,)로 구분" },
      { label: "첫 줄", value: "표의 헤더(제목 행)로 처리" },
      { label: "마크다운 출력", value: "| 헤더 | ... | 형식, 구분선 자동 생성" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "붙여넣었는데 표 형태로 인식이 안 돼요.",
        answer: "엑셀에서 셀 범위를 드래그해 복사(Ctrl+C)했는지 확인해주세요. 텍스트만 복사한 경우 탭 구분이 없어 쉼표 기준으로 인식되므로 의도와 다를 수 있습니다.",
      },
      {
        question: "셀 안에 쉼표가 있으면 어떻게 되나요?",
        answer: "탭으로 구분된 데이터가 있으면 항상 탭을 우선 사용하므로 문제없습니다. 쉼표만으로 구분된 데이터라면 셀 내용에 쉼표가 있을 때 열이 어긋날 수 있어 주의가 필요합니다.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "insta-formatter", name: "인스타 캡션 포맷터", description: "줄바꿈 유지 & 특수 폰트 변환기" },
      { slug: "password-generator", name: "비밀번호 생성기", description: "원하는 조건의 안전한 랜덤 비밀번호 생성" },
      { slug: "split-bill", name: "1/N 정산 계산기", description: "회식・모임 더치페이 & 차등 정산 계산" },
    ],
  },
};
