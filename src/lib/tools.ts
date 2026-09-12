// 전체 툴 카탈로그 - 홈페이지 그리드/카테고리 필터/검색에서 공통으로 사용하는 메타데이터
import {
  Receipt,
  ShoppingCart,
  CalendarCheck,
  PiggyBank,
  Home,
  LifeBuoy,
  Sprout,
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
];
