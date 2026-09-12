// qr-code 페이지에서 사용하는 한국어 콘텐츠 (문서/FAQ/관련 도구)
export const qrCodeContent = {
  meta: {
    title: "QR코드 생성기",
    description: "URL, 텍스트, 와이파이 접속 정보를 브라우저에서 바로 QR코드로 만드세요.",
  },
  heroTitle: "QR코드 생성기",
  heroSubtitle: "URL이나 텍스트, 와이파이 접속 정보를 입력하면 바로 QR코드 이미지를 만들어드려요.",
  tip: "매장 와이파이 QR을 만들어 인쇄해두면 손님이 비밀번호를 직접 입력하지 않고 카메라로 스캔만 해도 자동 접속돼요.",
  overview: {
    title: "서비스 소개 & 활용 팁",
    body: [
      "명함, 포스터, 메뉴판 등에 URL을 QR코드로 넣으면 사람들이 주소를 직접 입력하지 않아도 바로 접속할 수 있어요. 생성된 QR코드는 PNG 이미지로 바로 저장할 수 있습니다.",
      "와이파이 QR코드는 네트워크 이름(SSID)과 비밀번호만 입력하면 표준 와이파이 QR 형식으로 만들어져, 대부분의 스마트폰 카메라 앱에서 스캔 즉시 자동으로 접속을 제안합니다.",
    ],
  },
  rules: {
    title: "생성 방식",
    rows: [
      { label: "생성 위치", value: "브라우저 내에서만 처리, 서버로 전송되지 않음" },
      { label: "와이파이 QR 형식", value: "WIFI:T:<보안유형>;S:<SSID>;P:<비밀번호>;;" },
      { label: "저장 형식", value: "PNG 이미지 (320×320px)" },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "생성한 QR코드가 서버에 저장되나요?",
        answer: "아니요. QR코드는 브라우저 안에서만 만들어지고 저장 버튼을 눌러야 내 기기에 이미지로 저장됩니다. OnKits 서버에는 어떤 내용도 전송되지 않습니다.",
      },
      {
        question: "와이파이 QR이 스캔이 안 돼요.",
        answer: "SSID나 비밀번호에 특수문자가 많으면 일부 카메라 앱에서 인식이 어려울 수 있습니다. 보안 유형(WPA/WEP/없음)이 실제 공유기 설정과 일치하는지도 확인해보세요.",
      },
    ],
  },
  related: {
    title: "관련 도구",
    tools: [
      { slug: "age-calculator", name: "만나이 계산기", description: "생년월일로 만 나이 & 연 나이 자동 계산" },
      { slug: "unit-converter", name: "단위 변환기", description: "평수↔㎡, 무게, 길이 단위 서로 변환" },
      { slug: "password-generator", name: "비밀번호 생성기", description: "원하는 조건의 안전한 랜덤 비밀번호 생성" },
    ],
  },
};
