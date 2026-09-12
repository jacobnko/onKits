// 전체 툴 카탈로그 - 홈페이지 그리드/카테고리 필터/검색에서 공통으로 사용하는 메타데이터
import {
  Receipt,
  ShoppingCart,
  CalendarCheck,
  PiggyBank,
  Home,
  LifeBuoy,
  Sprout,
  Cake,
  QrCode,
  Ruler,
  KeyRound,
  Split,
  Sparkles,
  Table,
  FileStack,
  FileArchive,
  IdCard,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory = "finance" | "docs" | "productivity";

export const CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: "finance", label: "금융・세금・노동" },
  { key: "docs", label: "문서・이미지・행정" },
  { key: "productivity", label: "생산성・콘텐츠・텍스트" },
];

export type ToolMeta = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  iconClassName: string;
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "tax-calc",
    name: "원천징수/주휴수당 계산기",
    description: "프리랜서 3.3% 원천징수 & 알바 주휴수당 실수령액",
    category: "finance",
    icon: Receipt,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    slug: "margin-vat",
    name: "마진/부가세 계산기",
    description: "스마트스토어 수수료 차감 순마진 & 부가세 역산",
    category: "finance",
    icon: ShoppingCart,
    iconClassName: "bg-violet-50 text-violet-600",
  },
  {
    slug: "annual-leave",
    name: "연차 계산기",
    description: "회계연도・입사일 기준 연차 및 연차수당",
    category: "finance",
    icon: CalendarCheck,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    slug: "severance-irp",
    name: "퇴직금 계산기",
    description: "법정 퇴직금 계산 & IRP 절세 시뮬레이터",
    category: "finance",
    icon: PiggyBank,
    iconClassName: "bg-amber-50 text-amber-600",
  },
  {
    slug: "real-estate-fee",
    name: "부동산 중개수수료 계산기",
    description: "복비 상한 요율 & 취득세 간편 계산",
    category: "finance",
    icon: Home,
    iconClassName: "bg-cyan-50 text-cyan-600",
  },
  {
    slug: "unemployment-benefit",
    name: "실업급여 계산기",
    description: "수급 자격 자가진단 & 구직급여 모의 계산",
    category: "finance",
    icon: LifeBuoy,
    iconClassName: "bg-rose-50 text-rose-600",
  },
  {
    slug: "youth-savings",
    name: "청년도약계좌 시뮬레이터",
    description: "정부 기여금 + 비과세 만기 수령액 계산",
    category: "finance",
    icon: Sprout,
    iconClassName: "bg-teal-50 text-teal-600",
  },
  {
    slug: "split-bill",
    name: "1/N 정산 계산기",
    description: "회식・모임 더치페이 & 차등 정산 계산",
    category: "productivity",
    icon: Split,
    iconClassName: "bg-orange-50 text-orange-600",
  },
  {
    slug: "age-calculator",
    name: "만나이 계산기",
    description: "생년월일로 만 나이 & 연 나이 자동 계산",
    category: "productivity",
    icon: Cake,
    iconClassName: "bg-pink-50 text-pink-600",
  },
  {
    slug: "qr-code",
    name: "QR코드 생성기",
    description: "URL・텍스트・와이파이 정보를 QR코드로 즉시 생성",
    category: "productivity",
    icon: QrCode,
    iconClassName: "bg-slate-100 text-slate-700",
  },
  {
    slug: "unit-converter",
    name: "단위 변환기",
    description: "평수↔㎡, 무게, 길이 단위 서로 변환",
    category: "productivity",
    icon: Ruler,
    iconClassName: "bg-lime-50 text-lime-600",
  },
  {
    slug: "password-generator",
    name: "비밀번호 생성기",
    description: "원하는 조건의 안전한 랜덤 비밀번호 생성",
    category: "productivity",
    icon: KeyRound,
    iconClassName: "bg-indigo-50 text-indigo-600",
  },
  {
    slug: "insta-formatter",
    name: "인스타 캡션 포맷터",
    description: "줄바꿈 유지 & 특수 폰트 변환기",
    category: "productivity",
    icon: Sparkles,
    iconClassName: "bg-fuchsia-50 text-fuchsia-600",
  },
  {
    slug: "table-converter",
    name: "표 변환기",
    description: "엑셀・스프레드시트 표를 마크다운/HTML로 변환",
    category: "productivity",
    icon: Table,
    iconClassName: "bg-yellow-50 text-yellow-700",
  },
  {
    slug: "receipt-pdf",
    name: "영수증 PDF 취합기",
    description: "영수증 이미지 여러 장을 A4 PDF 한 장으로 자동 취합",
    category: "docs",
    icon: FileStack,
    iconClassName: "bg-sky-50 text-sky-600",
  },
  {
    slug: "doc-compress",
    name: "서류 이미지 압축기",
    description: "정부24 등 제출용 이미지를 목표 용량・해상도로 압축",
    category: "docs",
    icon: FileArchive,
    iconClassName: "bg-stone-100 text-stone-600",
  },
  {
    slug: "resume-photo",
    name: "이력서 사진 크롭",
    description: "3×4, 3.5×4.5 규격 크롭 & 단색 배경 변환",
    category: "docs",
    icon: IdCard,
    iconClassName: "bg-purple-50 text-purple-600",
  },
];
